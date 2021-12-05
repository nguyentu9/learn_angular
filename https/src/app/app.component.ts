import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  private apiURL =
    'https://nglifecircle-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(this.apiURL, postData)
      .subscribe((responseData) => console.log(responseData));
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>(this.apiURL)
      .pipe(
        map((responseData) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({
                ...responseData[key as keyof Object],
                id: key,
              });
            }
          }
          //   let key = <keyof Object>Object.keys(responseData)[0];
          //   postsArray.push({ ...responseData[key], id: key });
          return postsArray;
        })
      )
      .subscribe((posts: Post[]) => (this.loadedPosts = posts));
  }
}
