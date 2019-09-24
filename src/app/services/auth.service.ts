import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { User, UserInfo } from "firebase/app";
import { AlertService } from "./alert.service";
import { Router } from "@angular/router";
import { Observable, from } from "rxjs";
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export class Usuario implements UserInfo {
  constructor(
    public displayName: string,
    public displayLastName: string,
    public email: string,
    public isOnline: boolean,
    public phoneNumber: string,
    public photoURL: string,
    public providerId: string,
    public uid: string,
    public password: string
  ) {}
}

const collections = {
  users: "users",
  doc: "users"
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  usuario: User;
  constructor(
    private afAuth: AngularFireAuth,
    private afa: AngularFirestore,
    private alertService: AlertService,
    private router: Router
  ) {}

  singIn({ email, password }) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  socialLogin(authProvider: string) {
    let provider: any;
    if (authProvider === "google") {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    if (authProvider === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    if (authProvider === "twitter") {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    return from(this.afAuth.auth.signInWithPopup(provider));
  }

  logout(uid: string) {
    this.updateOnlineStatus(uid, false);
    return from(this.afAuth.auth.signOut());
  }

  register(usuario: Usuario, password: string) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, password)
    );
  }

  saveUser(user: Usuario) {
    return this.afa
      .doc(`${collections.users}/${user.uid}`)
      .set({
        uid: user.uid,
        displayName: user.displayName,
        displayLastName: user.displayLastName,
        email: user.email,
        isOnline: false,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        providerId: user.providerId
      })
      .then(res => {
        this.alertService.setAlertMessage(
          "success",
          "Excelente!",
          "Se registro usuario " + user.email + " correctamente",
          3000
        );
        this.router.navigate(["/login"]);
        console.log(res);
      });
  }

  updateProfile(displayName: string, photoUrl: string) {
    const userProfile = this.afAuth.auth.currentUser;
    if (userProfile) {
      return from(
        userProfile.updateProfile({
          displayName: displayName,
          photoURL: photoUrl
        })
      );
    }
  }

  updateOnlineStatus(uid: string, status: boolean) {
    if (!status) {
      this.afa.doc(`${collections.users}/${uid}`).update({ isOnline: false });
    }
    return from(
      this.afa.doc(`${collections.users}/${uid}`).update({ isOnline: status })
    );
  }

  get authenticated(): boolean {
    let respuesta = false;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user !== null) {
        respuesta = true;
      }
    });
    return respuesta;
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }
}
