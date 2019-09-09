import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "FirebaseAuthApp";
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerProviderIcons();
  }
  private registerProviderIcons() {
    this.iconRegistry
      .addSvgIcon(
        "google",
        this.sanitizer.bypassSecurityTrustResourceUrl(
          "../assets/images/svg/google-icon.svg"
        )
      )
      .addSvgIcon(
        "facebook",
        this.sanitizer.bypassSecurityTrustResourceUrl(
          "../assets/images/svg/facebook.svg"
        )
      )
      .addSvgIcon(
        "twitter",
        this.sanitizer.bypassSecurityTrustResourceUrl(
          "../assets/images/svg/twitter.svg"
        )
      );
  }
}
