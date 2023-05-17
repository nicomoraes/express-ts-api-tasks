import { sign } from "jsonwebtoken";

export const jwtGenerator = (subject: string) => {
  const token = sign({}, process.env.JWT_PRIVATE_KEY!, {
    subject: subject,
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}s`,
  });

  return token;
};
