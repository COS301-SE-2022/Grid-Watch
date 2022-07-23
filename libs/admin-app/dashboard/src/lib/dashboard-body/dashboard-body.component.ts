import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'grid-watch-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.scss']
})

export class DashboardBodyComponent
{
  /** Based on the screen size, switch from standard to one column per row */
  

  constructor(private breakpointObserver: BreakpointObserver) { }
}
