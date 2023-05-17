import { Response } from "express";
import { RefreshToken } from "./refresh-token.model";
import { TypedRequestBody } from "../../types/request";
import * as service from "./refresh-token.services";

export async function refresh(
  req: TypedRequestBody<RefreshToken>,
  res: Response
) {
  const refresh_token = req.body;

  const token = service.createTokenByRefreshToken(refresh_token.id);

  return res.status(200).json({ token });
}
