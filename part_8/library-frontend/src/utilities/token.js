import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const tokenToUser = (token) => {
  const decoded_token = jwt.verify(token, JWT_SECRET);
  return decoded_token;
};

export { tokenToUser };
