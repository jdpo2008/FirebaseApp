import { User } from "firebase";
import { ICredentials } from "../../../interfaces/auth.interface";

export interface IAuthState {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  credentials?: ICredentials;
  success?: string;
  error?: string;
}

export const initialAuthState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isAdmin: false,
  credentials: null,
  success: null,
  error: null
};
