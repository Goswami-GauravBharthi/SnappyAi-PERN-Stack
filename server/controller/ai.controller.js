import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

//! controller for ALL AI API Routes

export const generateArticle = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    // console.log(userId);
    const { prompt, length } = req.body;
    // console.log(prompt);
    //   // const plan = req.plan;
    //   // const free_usage = req.free_usage;
    //   // if (plan !== "premium" && free_usage >= 10) {
    //   //   return res.json({
    //   //     success: false,
    //   //     message: "Limit reached. Upgrade to continue.",
    //   //   });
    //   // }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`insert into creations (user_id,prompt,content,type) values(${userId},${prompt},${content},'article')`;

    // if (plan !== "premium") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const { prompt } = req.body;
    // console.log(prompt);
    //   // const plan = req.plan;
    //   // const free_usage = req.free_usage;
    //   // if (plan !== "premium" && free_usage >= 10) {
    //   //   return res.json({
    //   //     success: false,
    //   //     message: "Limit reached. Upgrade to continue.",
    //   //   });
    //   // }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`insert into creations (user_id,prompt,content,type) values(${userId},${prompt},${content},'blog-title')`;

    // if (plan !== "premium") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const { prompt, publish } = req.body;
    // console.log(prompt);
    //   // const plan = req.plan;
    //   // const free_usage = req.free_usage;
    //   // if (plan !== "premium" && free_usage >= 10) {
    //   //   return res.json({
    //   //     success: false,
    //   //     message: "Limit reached. Upgrade to continue.",
    //   //   });
    //   // }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const data = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer", // Important!
      }
    );

    // console.log(data);
    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(data.data);
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

    // const base64Image = `data:image/png;base64,${Buffer.from(
    //   data,
    //   "binary"
    // ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`insert into creations (user_id,prompt,content,type,publish) values(${userId},${prompt},${secure_url},'image',${
      publish ?? false
    })`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    const { path } = req.file;

    const { secure_url } = await cloudinary.uploader.upload(path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    try {
      fs.unlinkSync(path);
      console.log("File successfully deleted");
    } catch (error) {
      console.log(error);
    }

    await sql`insert into creations (user_id,prompt,content,type) values(${userId},'Remove background from image',${secure_url},'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const { object } = req.body;
    const { path } = req.file;

    const { public_id } = await cloudinary.uploader.upload(path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });

    await sql`insert into creations (user_id,prompt,content,type) values(${userId},${`Removed ${object} from image`},${imageUrl},'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    const resume = req.file;

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume max file size (5MB) allow.",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strength , weakness, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`insert into creations (user_id,prompt,content,type) values(${userId},'Review the uploaded resume',${content},'resume-review')`;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
