import { Component } from '@angular/core';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveService } from '../responsive/responsive.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  modalSocialLogin = false;


  constructor(private responsive: BreakpointObserver,
              public responsiveService:ResponsiveService) {

    console.info("responsive: ", responsive);
  }

  ngOnInit() {

    console.info("On Init");

    this.responsive.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape ,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ])
      .subscribe(result => {

        const breakpoints = result.breakpoints;

        console.info("breakpoints: ", breakpoints);

        if (breakpoints[Breakpoints.TabletPortrait]) {
          console.warn("screens matches TabletPortrait");
        }
        else if (breakpoints[Breakpoints.TabletLandscape]) {
          console.warn("screens matches TabletLandscape");
        }
        else if (breakpoints[Breakpoints.HandsetPortrait]) {
          console.warn("screens matches HandsetPortrait");
        }
        else if (breakpoints[Breakpoints.HandsetLandscape ]) {
          console.warn("screens matches HandsetLandscape ");
        }
        else if (breakpoints[Breakpoints.WebPortrait ]) {
          console.warn("screens matches WebPortrait ");
        }
        else if (breakpoints[Breakpoints.WebLandscape ]) {
          console.warn("screens matches WebLandscape ");
        }

        if (result.matches) {
            console.info("result: ", result)
        }

      });

    // this.responsiveService.screenSize


    console.warn("this.responsiveService.screenSize: ", this.responsiveService.screenSize);

  }

}


