import { User } from "./User.model";

export type BlogPost = {
  id: string;
  title: string;
  text: string;
  user: User;
  category: string;
};
