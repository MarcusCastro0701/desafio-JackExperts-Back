import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { prisma } from "../config";

export async function authenticateAdminToken(req: AuthenticatedAdminRequest, res: Response, next: NextFunction) {
  
  const authHeader = req.header("Authorization");

  if (!authHeader){
    return res.sendStatus(httpStatus.UNAUTHORIZED)
  }

  const token = authHeader.split(" ")[1];

  if (!token){
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  try {

    const session = await prisma.session.findUnique({
      where: {
        token: token,
      },
    });
  
    if (!session){
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const userData = await prisma.user.findUnique({
      where: {
        id: session.userId
      }
    })
   
    req.adminId = session.userId

    return next();

  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export type AuthenticatedAdminRequest = Request & RequestWithAdminId;

type RequestWithAdminId = {
  adminId: number;
};
