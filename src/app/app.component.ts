import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'atelie-landing-page';
  @ViewChild('forms', { static: true }) forms: ElementRef;

  ngOnInit(): void { }

  scroll() {
    this.forms.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}