import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // lowercase "authorization"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Secret_key);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = { name: user.username, id: user._id };
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ success: false, message: "Please login" });
  }
};

export default middleware;
