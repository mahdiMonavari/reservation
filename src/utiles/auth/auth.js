import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

const hashePassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.ACCESS_TOKEN_PRIVET_KEY, {
    expiresIn: "15m",
  });
  return token;
};
const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "15d",
  });
  return token;
};

export { hashePassword, generateAccessToken, generateRefreshToken };
