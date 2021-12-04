import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObsSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    // const customIntervalObservable = new Observable((observer: any) => {
    //   let count: number = 0;
    //   setTimeout(() => {
    //     observer.next(count);
    //     if (count == 4) {
    //       observer.complete();
    //     }
    //     if (count > 3) {
    //       observer.error(new Error('Count is greater 3!'));
    //     }
    //     count = count + 1;
    //   }, 1000);
    // });

    // this.firstObsSubscription = customIntervalObservable.subscribe({
    //   next(count) {
    //     console.log(count);
    //   },
    //   error(msg) {
    //     console.log('Error:', msg);
    //   },(
    //   complete() {
    //     console.log('Completed!');
    //   },
    // });

    this.firstObsSubscription = interval(1000)
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data) => {
          return 'Round ' + data;
        })
      )
      .subscribe((count) => console.log(count));
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
