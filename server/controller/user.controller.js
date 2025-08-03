import sql from "../config/db.js";
import jwt from "jsonwebtoken";

const option = {
  httpOnly: true,
  secure: true,
};

export const userLogin = async (req, res) => {
  const { email, name, avatar } = req.body;
  try {
    const [user] = await sql`SELECT * FROM "user" WHERE  email= ${email}`;

    // console.log("database data : ",user)
    if (!user) {
      try {
        await sql`insert into "user" (email,name,avatar) values(${email},${name},${avatar})`;

        const user = await sql`SELECT * FROM "user" WHERE  email= ${email}`;

        const token = jwt.sign(
          {
            id: user[0].user_id,
          },
          process.env.JSON_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.cookie("token", token, option);
        return res.json({ success: true, message: "User login Succefully" });
      } catch (error) {
        return res.json({ success: false, message: error.message });
      }
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        name: user.name,
        plan: user.plan,
      },
      process.env.JSON_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // console.log(token)

    res.cookie("token", token, option);
    return res.json({ success: true, message: "User login Succefully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("token", option);
  res.json({ success: true, message: "user Logout..." });
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getUserData = (req, res) => {
  return res.json({ success: true, data: req.user });
};

export const getUserCreation = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    const creations =
      await sql`select * from creations where user_id=${userId} order by created_at desc`;

    res.json({ success: true, creations });
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message });
  }
};

export const getPublicCreation = async (req, res) => {
  try {
    const creations =
      await sql`select * from creations where publish=true order by created_at desc`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const { id } = req.body;

    const [creation] = await sql`select * from creations where id=${id}`;

    if (!creation) {
      return res.json({ success: false, message: "Creations not found" });
    }
    const currentLikes = creation.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = `Creation Unliked`;
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }
    const formattedArray = `{${updatedLikes.join(",")}}`;

    await sql`update creations set likes=${formattedArray}::text[] where id=${id}`;

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
