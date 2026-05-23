import jwt from "jsonwebtoken";

export const requiredAuth = (req, res, next) => {
  console.log("inside required auth middleware");

  try {
    const authcookie = req.cookies?.token;
    // if cookie is not present, user is logged out
    if (!authcookie) {
      return res
        .status(401)
        .json({ message: "Unauthorized : No token provided" });
    }
    const decoded = jwt.verify(authcookie, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized : Invalid token or expired token" });
  }
};
