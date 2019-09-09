import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../../material.module";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MaterialModule, HeaderComponent, SidebarComponent]
})
export class LayoutModule {}
