import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../../environments/environment";

import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { ComponentsModule } from "../components/components.module";

import { AuthComponent } from "./auth/auth.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [AuthComponent, NotfoundComponent, DashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    SweetAlert2Module.forRoot(),
    ComponentsModule
  ],
  exports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    SweetAlert2Module,
    AuthComponent,
    NotfoundComponent,
    DashboardComponent
  ]
})
export class PagesModule {}
