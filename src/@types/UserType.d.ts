import { LanguagesType, ThemeType } from "./index";

export type UserType = {
  email: string;
  uid: string;
  name: string;
  createdAt: Date;
  language: LanguagesType;
  photoURL?: string;
  phone?: string;
  birthdate?: string;
};
