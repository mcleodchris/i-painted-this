import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfo } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatListModule, MatIconModule],
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
