import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { EntryTableComponent } from '../entry-table/entry-table.component';
import { YearNavigationComponent } from '../year-navigation/year-navigation.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { NavComponent } from '../nav/nav.component';
import { UserService } from 'src/app/services/user.service';
import { Observable, map, shareReplay } from 'rxjs';
import { UserInfo } from 'src/app/models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    EntryTableComponent,
    RouterModule,
    CommonModule,
    YearNavigationComponent,
    EntryFormComponent,
    NavComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'I Painted This';
  currentYear: number = new Date().getFullYear();
  userInfo$: Observable<UserInfo> = new Observable<UserInfo>();
  userService: UserService = inject(UserService);
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
  ngOnInit() {
    this.userInfo$ = this.userService.userInfo;
    this.userService.load();
  }
}
