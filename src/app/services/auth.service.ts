import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { User, UserInfo } from "firebase/app";
import UserCredential = firebase.auth.UserCredential;
import { ICredentials, AuthProviders } from "../interfaces/auth.interface";

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  singIn(email, password): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  onGoogleLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(googleAuthProvider);
  }

  onFacebookLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(facebookAuthProvider);
  }

  onTwitterLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(twitterAuthProvider);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }
}
