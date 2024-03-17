import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

/*Services import */
import { UsersService } from '../users.service';

/*Interface import */
import { UserData } from '../userData';

/*Angular imports */
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  constructor(private userService: UsersService) {}

  dataSource!: MatTableDataSource<UserData>;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'view'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<UserData>([]);
    this.getAllUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.map((user: any) => ({
          ...user,
          firstname: user.name.firstname,
          lastname: user.name.lastname,
        }));
      },
    });
  }
  applyFilter(event: any) {}
}