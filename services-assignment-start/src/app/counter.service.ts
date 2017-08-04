import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {
  counter = 0;

  constructor() { }

  increaseCounter() {
    console.log(++this.counter);
  }
}
