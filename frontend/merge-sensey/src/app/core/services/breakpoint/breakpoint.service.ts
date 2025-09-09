import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { map, shareReplay } from "rxjs";
import { MediaBreakpoints } from "../../constants/media";

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isMobile$ = this.breakpointObserver
    .observe(MediaBreakpoints.Mobile)
    .pipe(map(result => result.matches), shareReplay(1));

  isTablet$ = this.breakpointObserver
    .observe(MediaBreakpoints.Tablet)
    .pipe(map(result => result.matches), shareReplay(1));

  isDesktop$ = this.breakpointObserver
    .observe(MediaBreakpoints.Desktop)
    .pipe(map(result => result.matches), shareReplay(1));
}
