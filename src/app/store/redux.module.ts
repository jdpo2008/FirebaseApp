import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { environment } from "../../environments/environment.prod";
import { appReducers } from "./app.reducer";
import { AuthEffects } from "./auth/effects/auth.effects";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  exports: [StoreModule, EffectsModule, StoreRouterConnectingModule],
  providers: []
})
export class ReduxModule {}
