import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

/*Services import */
import { UsersService } from '../users.service';

/*Interface import */
import { UserData } from '../user-interface';

/*Component imports */
import { SingleUserDialogComponent } from '../single-user-dialog/single-user-dialog.component';

/*Angular imports */
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  constructor(private userService: UsersService, private dialog: MatDialog) {}

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

  applyFilter(event: Event) {
    /*
    as HTMLInputElement is a type assertion or type casting > A way to inform Typescript about the specific type of an object when typescript cannot infer it on its own 
    Trim method is used to remove whitespaces
    */

    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }

  viewUserDetails(userId: number) {
    this.dialog.open(SingleUserDialogComponent, {
      data: this.dataSource.data.find((user) => user.id === userId),
      width: '500px',
      position: {
        top: '50px',
        left: '50px',
      },
      panelClass: "custom-dialog-container"
    });
  }
}
