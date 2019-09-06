import { User } from "firebase";
import { ICredentials } from "../../../interfaces/auth.interface";

export interface IAuthState {
  loading: boolean;
  credentials: ICredentials;
  isAuthenticated: boolean;
  user: User;
  success?: string;
  error?: string;
}

export const initialAuthState: IAuthState = {
  loading: false,
  credentials: null,
  user: null,
  isAuthenticated: false,
  success: null,
  error: null
};
