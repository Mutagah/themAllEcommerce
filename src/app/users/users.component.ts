import { Component, OnInit } from '@angular/core';

/*Services import */
import { UsersService } from '../users.service';

/*Interface import */
import { UserData } from '../userData';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {}

  users!: UserData[];

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res
      },
    });
  }
}
