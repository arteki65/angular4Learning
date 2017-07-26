import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() gameStarted = new EventEmitter<number>();
  intervalRef;

  constructor() {
  }

  ngOnInit() {
  }

  onStartGameClicked() {
    let increment = 0;
    this.intervalRef = setInterval(() => {
      this.gameStarted.emit(increment++);
    }, 1000);
  }

  onGameStopped() {
    clearInterval(this.intervalRef);
  }
}
