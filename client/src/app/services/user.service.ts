import { Injectable, inject } from '@angular/core';
import { UserInfo } from '../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private _userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(Object() as UserInfo);
  private dataStore: { userInfo: UserInfo } = { userInfo: {} as UserInfo };
  private endpoint = '/.auth/me';
  readonly userInfo = this._userInfo.asObservable();

  load() {
    this.http.get<{ clientPrincipal: UserInfo }>(this.endpoint).subscribe((data) => {
      this.dataStore.userInfo = data.clientPrincipal as UserInfo;
      this._userInfo.next(Object.assign({}, this.dataStore).userInfo);
    });
  }
}
