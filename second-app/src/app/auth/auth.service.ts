import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

// https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCjhER7mezLjUz4UzBu75q0CvYz2BxMCCk',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
