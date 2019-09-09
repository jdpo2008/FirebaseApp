import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: "index",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "404",
    component: NotfoundComponent
  },
  {
    path: "**",
    redirectTo: "/404",
    pathMatch: "full"
  }
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
