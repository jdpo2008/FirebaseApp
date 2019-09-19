import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  @Input() opened: boolean;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {}
}
