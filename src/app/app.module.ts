import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_ROUTES } from "./app.routes";

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

import { ReduxModule } from "./store/redux.module";

import { PagesModule } from "./pages/pages.module";

import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BrowserModule,
    ReduxModule,
    PagesModule,
    APP_ROUTES,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
