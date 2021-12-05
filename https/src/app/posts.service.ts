import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map } from 'rxjs/operators';
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
    this.http.post<{ name: string }>(this.apiURL, postData).subscribe(
      (responseData) => console.log(responseData),
      (error) => {
        this.error.next(error.message);
      }
    );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(this.apiURL, {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
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
    return this.http.delete(this.apiURL);
  }
}
