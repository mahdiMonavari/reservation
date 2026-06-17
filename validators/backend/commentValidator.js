// validators/backend/commentValidator.js
import Validator from "fastest-validator";

const v = new Validator();

const createCommentSchema = {
  doctorId: { type: "string", min: 24, max: 24 },
  userId: { type: "string", min: 24, max: 24 },
  text: { type: "string", min: 3, max: 500 },
  parentId: { type: "string", min: 24, max: 24, optional: true },
  $$strict: true,
};

const verifyCommentSchema = {
  isVerified: { type: "boolean" },
  $$strict: true,
};

export const createCommentValidator = v.compile(createCommentSchema);
export const verifyCommentValidator = v.compile(verifyCommentSchema);
