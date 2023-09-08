import { Component, Inject } from '@angular/core';
import { UserService } from '../user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService,private toastr: ToastrService) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
  this.userService.deleteUser(this.data.id).subscribe({
    next: (response) => {
     // dummy api taking time for respone
      // this.toastr.success('User has been successfully deleted!', 'Success');
    },
    error: (error) => {
      // this.toastr.error('Failed to delete the user. Please try again later.', 'Error');
    },
  });
  
}
}
