import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  error = new Subject<string>();

  private apiURL =
    'https://nglifecircle-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(this.apiURL, postData, {
        observe: 'body',
      })
      .subscribe(
        (responseData) => console.log(responseData),
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('key1', 'value1');
    searchParams = searchParams.append('key2', 'value2');

    return this.http
      .get<{ [key: string]: Post }>(this.apiURL, {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),

        // Only one query param
        // params: new HttpParams().set('print', 'pretty'),

        // Multiple query param
        params: searchParams,
      })
      .pipe(
        map(
          (responseData) => {
            const postsArray = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({
                  ...responseData[key as keyof Object],
                  id: key,
                });
              }
            }
            return postsArray;
          },
          catchError((errorRes) => {
            return throwError(errorRes);
          })
        )
      );
  }

  deletePosts() {
    return this.http
      .delete(this.apiURL, {
        observe: 'events',
        responseType: 'json', // text
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
