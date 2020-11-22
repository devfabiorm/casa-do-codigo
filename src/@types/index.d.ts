import { PassportStatic } from "passport";

declare module "*.marko";

declare global {
  namespace Express {
    export interface Request {
      passport: PassportStatic
    }
  }
}