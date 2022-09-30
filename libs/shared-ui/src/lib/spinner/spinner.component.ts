import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'grid-watch-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;

  constructor(
    private spinnerService : SpinnerService,
    private cdref : ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.initalise()
  }


  initalise() {
    this.spinnerService.getSpinnerObservable().subscribe(
      (status) =>{
        console.log(status);
        
        this.showSpinner = status === "start";
        this.cdref.detectChanges();
      }
    )
  }
}
