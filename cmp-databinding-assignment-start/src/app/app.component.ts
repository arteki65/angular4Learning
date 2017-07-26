import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  emmitedNumbers = [];

  onGameStarted(interval) {
    this.emmitedNumbers.push(interval);
  }
}
