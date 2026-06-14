import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const hashePassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
const verifyPassword = async (password, hashedPassword) => {
  const isVerify = await compare(password, hashedPassword);
  return isVerify;
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
const verifyAccessToken = (token) => {
  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_PRIVET_KEY);
    return payload;
  } catch {
    return false;
  }
};
const verifyRefreshToken = (token) => {
  try {
    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    return payload;
  } catch {
    return false;
  }
};

const refreshTokenHandler = (refreshToken) => {
  try {
    const { phone, role } = verifyRefreshToken(refreshToken);
    if (!phone) return false;
    return generateAccessToken({ phone, role });
  } catch (err) {
    return false;
  }
};

const getCookie = async (key) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};

export {
  hashePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyPassword,
  refreshTokenHandler,
  getCookie,
};
