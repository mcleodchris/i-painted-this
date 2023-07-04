import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfo } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  private userService: UserService = inject(UserService);
  providers = ['aad'];
  redirect = window.location.pathname;
  userInfo!: UserInfo;
  userInfo$: Observable<UserInfo> = new Observable<UserInfo>();

  async ngOnInit() {
    this.userInfo$ = this.userService.userInfo;
  }
}
