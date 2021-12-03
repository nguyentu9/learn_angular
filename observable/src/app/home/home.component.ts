import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObsSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    // this.firstObsSubscription = interval(1000).subscribe((count) =>
    //   console.log(count)
    // );

    const customIntervalObservable = Observable.create((observer: any) => {
      let count = 0;
      setTimeout(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(
      (count: number) => console.log(count)
    );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
