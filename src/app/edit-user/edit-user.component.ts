import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      i: ['', Validators.required],
      id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  
  getErrorMessage() {
    return "error"
  }

  onSubmit() {
    var id = this.data.id
    this.userService.updateUser(id, this.data).subscribe(
      (response) => {
        console.log('User updated successfully:', response);

      },
      (error) => {
        console.error('Error updating user:', error);

      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
