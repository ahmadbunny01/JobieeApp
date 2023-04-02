import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (!payload) {
      throw new Error("Expired Or Invalid Token");
    }
    req.user = payload.userId;
  } catch (error) {
    throw new Error("Authentication Invalid");
  }
  next();
};

export default auth;
