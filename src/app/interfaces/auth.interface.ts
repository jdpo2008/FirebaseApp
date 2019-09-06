export interface ICredentials {
  email: string;
  password: string;
}

export enum AuthProviders {
  ALL = "all",
  ANONYMOUS = "anonymous",
  EmailAndPassword = "firebase",
  Google = "google",
  Facebook = "facebook",
  Twitter = "twitter",
  Github = "github",
  Microsoft = "microsoft",
  Yahoo = "yahoo",
  PhoneNumber = "phoneNumber"
}

export interface IUser {
  uid: string;
  displayName: string;
  loading?: boolean;
  error?: string;
}

export class User implements IUser {
  constructor(public uid: string, public displayName: string) {}
}
