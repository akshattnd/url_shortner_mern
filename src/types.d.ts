import { User } from "./models/user.model.ts";
declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>; // Add the user property here
    }
  }
}