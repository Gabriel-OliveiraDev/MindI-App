export type { SignInProps } from './SignIn/SignIn';
export type { SignUpProps } from './SignUp/SignUp';
import { signIn } from "./SignIn/SignIn";
import { signOut } from './SignOut/SignOut';
import { signUp } from "./SignUp/SignUp";

export const authService = {
  signUp: signUp,
  signIn: signIn,
  signOut: signOut,
};