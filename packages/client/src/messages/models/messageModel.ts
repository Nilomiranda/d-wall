import { BaseModel } from "../../shared/models/baseModel";
import { User } from "../../user/models/userModel";

export interface Message extends BaseModel {
  content: string
  user: User
}
