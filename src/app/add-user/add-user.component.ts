import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  error: boolean = false;
  errorMsg = ' Form Fields invalid'
  constructor(public userService: UserService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onNoClick() {
    this.dialogRef.close(1)
  }

  onSubmit() {
    debugger
    if (this.userForm.invalid) {
      debugger
      this.error = true
      return
    }
    this.userService.addUser(this.userForm.value).subscribe({
      next: (response) => {
        debugger

        this.dialogRef.close(1)
        console.log('User added successfully:', response);
      },
      error: (error) => {

        console.error('Error adding user:', error);
      },
    });

  }

  getErrorMessage() {
    return "all fields required"
  }
}
