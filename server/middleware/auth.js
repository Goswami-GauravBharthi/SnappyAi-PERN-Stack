import jwt from "jsonwebtoken";
import sql from "../config/db.js";

export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");;
    // console.log("auth token : ",req.cookies.token );

    if (!token) {
      return res.json({ success: false, message: "unauthorized request" });
    }

    const decodeToken = jwt.verify(token, process.env.JSON_TOKEN_SECRET);

    const user = await sql`select * from "user" where user_id=${decodeToken.id}`;

    if (user.length===0) {
      return res.json({ success: false, message: "Invalid access token" });
    }

    req.user=user[0];
    next()
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//middleware to check userID and hasPremium plan

// import { clerkClient } from "@clerk/express";

// export const auth = async (req,res,next) => {
//   console.log("auth ok");
//   try {

//     const { userId, has } = await req.auth(); //added by middleware clerk
//     const hasPremiumPlan = await has({ plan: "premium" });

//     const user = await clerkClient.users.getUser(userId);
//     if (!hasPremiumPlan && user.privateMetadata.free_usage) {
//       req.free_usage = user.privateMetadata.free_usage;
//     } else {
//       await clerkClient.users.updateUserMetadata(userId, {
//         privateMetadata: {
//           free_usage: 0,
//         },
//       });
//       req.free_usage = 0;
//     }

//     req.plan = hasPremiumPlan ? "premium" : "free";
//     next();
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
