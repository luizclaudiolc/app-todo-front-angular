import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

export interface ItemsMenu {
  label: string;
  icon?: string;
  link?: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class AppHeaderComponent implements OnInit {
  itemsMenuBars: ItemsMenu[] = [];
  isLogged = false;
  userName = "";

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.userName = this.sanetizedName(this.authService.getUserName);

      if (isLogged) this.router.navigate(["/dashboard"]);
    });

    this.itemsMenuBars = [
      {
        label: "Tarefas",
        icon: "task",
        link: "/table-tasks",
      },
      {
        label: "Dashboard",
        icon: "dashboard",
        link: "/dashboard",
      },
    ];
  }
  sanetizedName(getUserName: string): string {
    return getUserName
      .split(" ")
      .map((str) => `${str.charAt(0)}${str.slice(1)}`)
      .join(" ");
  }

  public logout(): void {
    this.authService.logout();
  }
}
