import express from "express";
import { auth } from "../middleware/auth.js";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from "../controller/ai.controller.js";
import { upload } from "../config/multer.js";

const aiROuter = express.Router();

aiROuter.post("/generate-article", generateArticle);
aiROuter.post("/generate-blog-title", generateBlogTitle);
aiROuter.post("/generate-image", generateImage);
aiROuter.post(
  "/remove-image-background",
  upload.single("image"),
  removeImageBackground
);
aiROuter.post(
  "/remove-image-object",
  upload.single("image"),
  removeImageObject
);
aiROuter.post("/resume-review", upload.single("resume"), resumeReview);

export default aiROuter;


