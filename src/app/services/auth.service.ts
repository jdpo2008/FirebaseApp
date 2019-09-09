import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { User, UserInfo } from "firebase/app";
import { AlertService } from "./alert.service";
import { getErrorAuthMessage } from "../helpers/auth.errors";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export class Usuario implements UserInfo {
  constructor(
    public displayName: string,
    public displayLastName: string,
    public email: string,
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
  private userCollection: AngularFirestoreCollection<Usuario>;
  usuario: User;
  constructor(
    private afAuth: AngularFireAuth,
    private afa: AngularFirestore,
    private alertService: AlertService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  /*
   - Metodos para la autenticacion de los usuarios.
   - singIn, onGoogle, onFacebook, onTwitter, logOut
   */

  singIn(email, password): Promise<any> {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.usuario = res.user;
        this.router.navigate(["/index"]);
        this.alertService.setAlertMessage(
          "success",
          "Bienvenido",
          res.user.displayName,
          5000
        );
      })
      .catch(err => {
        console.log(err.code);
        this.alertService.setAlertMessage(
          "error",
          "Ops!",
          getErrorAuthMessage(err),
          5000
        );
      });
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
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }

  /*
   - Metodos para la Guardar y Actualizar usuarios en la base de datos.
   */

  public async singUp(usuario: Usuario, password: string) {
    return await this.afAuth.auth
      .createUserWithEmailAndPassword(usuario.email, password)
      .then(async data => {
        const user = data.user;
        await this.updateProfile(usuario.displayName, user.photoURL);

        await this.afa.doc(`${collections.users}/${user.uid}`).set({
          uid: user.uid,
          displayName: usuario.displayName,
          displayLastName: usuario.displayLastName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: usuario.phoneNumber,
          providerId: usuario.providerId
        } as Usuario);

        await user.sendEmailVerification();
        this.router.navigate(["/index"]);
        this.alertService.setAlertMessage(
          "success",
          "Bienvenido",
          user.displayName,
          5000
        );
      })
      .catch(err => {
        console.log(err);
        this.spinner.hide();
        this.alertService.setAlertMessage(
          "error",
          "Ops!",
          getErrorAuthMessage(err),
          5000
        );
      });
  }
  public async updateProfile(name: string, photoURL: string): Promise<any> {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL
    });
  }

  get currentUserObservable(): Observable<User> {
    return this.afAuth.authState;
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
}
