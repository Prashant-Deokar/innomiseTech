import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatColumnDef } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedData } from '../pagination';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'maidenName', 'age', 'gender', 'email', 'phone', 'username', 'birthDate', 'image', 'bloodGroup', 'actions'];
  paginatedData: PaginatedData = {
    limit: 30,
    skip: 0,
    total: 0,
  };
  users: any;
  isLoading: Boolean = false;
  constructor(private userService: UserService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    debugger
    this.userService.getUsers().subscribe({
      next: (response) => {
        debugger
        this.users = response.users
        this.paginatedData.total = response.total;
        this.isLoading = true
      },
      error: (error) => {
        this.isLoading = true
        console.log(error);
      }
    });

  }
  addNew() {
    const dialogRef = this.dialog.open(AddUserComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        debugger
        this.paginatedData.total += 1;
        var newUser = {

          id: this.paginatedData.total,
          username: this.userService.addUserData.username,
          email: this.userService.addUserData.email,
          firstName: this.userService.addUserData.firstName,
          lastName: this.userService.addUserData.lastName,
          gender: this.userService.addUserData.gender,
          phone: this.userService.addUserData.phone,
        }
        this.toastr.success('User has been successfully Addeed!', 'Success');
        this.users = [newUser, ...this.users];

      } else {
        this.toastr.error('Failed to Add the user. Please try again later.', 'Error');

      }
    });
  }

  delete(i: number, id: number, username: string, email: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        i: i,
        id: id,
        username: username,
        email: email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        debugger
        this.users = this.users.filter((user: any) => user.id !== id);
        this.toastr.success('User has been successfully deleted!', 'Success');

      } else {
        this.toastr.error('User not Deleted.', 'Cancel ');
      }
    });
  }

  edit(userIndex: number, id: number, username: string, email: string, firstName: string, lastName: string, gender: string, phone: string) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        i: userIndex,
        id: id,
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        phone: phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        debugger
        const updatedUsers = [...this.users];

        for (let i = 0; i < updatedUsers.length; i++) {
          if (updatedUsers[i].id === id) {
            // update the properties of matching user
            updatedUsers[i].firstName = this.userService.updatedData.firstName;
            updatedUsers[i].lastName = this.userService.updatedData.lastName;
            updatedUsers[i].username = this.userService.updatedData.username;
            updatedUsers[i].email = this.userService.updatedData.email;
            updatedUsers[i].phone = this.userService.updatedData.phone;
            updatedUsers[i].gender = this.userService.updatedData.gender;
            break;
          }
        }
        this.users = updatedUsers;
        this.toastr.success('User has been successfully updated!', 'Success');
      } else {
        this.toastr.error('Failed to edit the user. Please try again later.', 'Error');
      }
    });
  }

  loadData() {
    this.userService.getPaginationData(this.paginatedData.skip, this.paginatedData.limit).subscribe({
      next: (data: any) => {
        debugger
        //response data
        this.users = data.users;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  onPageChange(event: PageEvent) {
    debugger
    console.log(event, "eventeventeventevent");
    this.paginatedData.skip = event.pageIndex * this.paginatedData.limit;
    this.paginatedData.limit = event.pageSize;
    this.loadData();
  }

}