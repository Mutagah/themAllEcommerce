import { NgForm } from '@angular/forms';
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
  @ViewChild('templateForm', { static: true }) myForm: any;
  constructor(private userService: UsersService, private dialog: MatDialog) {}

  dataSource!: MatTableDataSource<UserData>;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'view'];

  ascending: boolean = true;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<UserData>([]);
    this.getAllUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  submitFetchValue(templateForm: NgForm) {
    this.userService.getLimitedUsers(templateForm.value?.limit).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.map((user: any) => ({
          ...user,
          firstname: user.name.firstname,
          lastname: user.name.lastname,
        }));
      },
    });
  }

  deletedUser(userId: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (user) => user.id !== userId
    );
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
    as HTMLInputElement is a type assertion or type casting > A way to inform Typescript about the specific type of an object when typescript cannot infer it on its own.
    */
    if ((event.target as HTMLInputElement).value.length === 0) {
      this.getAllUsers();
    } else {
    }
    const name = (event.target as HTMLInputElement).value.split(' ');
    this.userService
      .getUserwithNames(
        name[0].charAt(0).toUpperCase() + name[0].slice(1),
        name[1].charAt(0).toUpperCase() + name[1].slice(1)
      )
      .subscribe({
        next: (res) =>
          (this.dataSource.data = res.map((user: any) => ({
            ...user,
            firstname: user.name.firstname,
            lastname: user.name.lastname,
          }))),
      });
  }

  viewUserDetails(userId: number) {
    const dialogRef = this.dialog.open(SingleUserDialogComponent, {
      data: this.dataSource.data.find((user) => user.id === userId),
      width: '500px',
      position: {
        top: '50px',
        left: '50px',
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.componentInstance.deletedUser.subscribe(
      (deletedUserId: number) => {
        this.dataSource.data = this.dataSource.data.filter(
          (user) => user.id !== deletedUserId
        );
      }
    );
  }

  changeFetchOrder() {
    this.ascending = !this.ascending;
    if (this.ascending) {
      this.userService.getSortedUsers('asc').subscribe({
        next: (res) => {
          this.dataSource.data = res.map((user: any) => ({
            ...user,
            firstname: user.name.firstname,
            lastname: user.name.lastname,
          }));
        },
      });
    } else {
      this.userService.getSortedUsers('desc').subscribe({
        next: (res) => {
          this.dataSource.data = res.map((user: any) => ({
            ...user,
            firstname: user.name.firstname,
            lastname: user.name.lastname,
          }));
        },
      });
    }
  }
}
