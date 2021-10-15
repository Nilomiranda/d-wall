import { BaseModel } from "../../shared/models/baseModel";

export interface Message extends BaseModel {
  content: string
  name: string
}
