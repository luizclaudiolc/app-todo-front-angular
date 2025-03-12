import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

export interface ItemsMenu {
  label: string;
  icon?: string;
  link?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  itemsMenuBars: ItemsMenu[] = [];
  isLogged = false;
  userName = '';
  isCellPhone = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
      this.userName = this.authService.getUserName;

      if (isLogged) this.router.navigate(['dashboard']);

      this.responsive.observe(Breakpoints.Handset).subscribe((result) => {
        this.isCellPhone = result.matches;
      });
    });

    this.itemsMenuBars = [
      {
        label: 'Home',
        icon: 'home',
        link: 'table-tasks',
      },
      {
        label: 'Dashboard',
        icon: 'dashboard',
        link: 'dashboard',
      },
    ];
  }

  public logout(): void {
    this.authService.logout();
  }
}
