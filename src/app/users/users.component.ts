import { NgForm } from '@angular/forms';
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
  @ViewChild('templateForm', { static: true }) myForm: any;
  constructor(private userService: UsersService) {}

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
    // console.log(templateForm.value)
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
    console.log(userId);
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
