import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  loading = false;
    submitted = false;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authenticationService: AuthService,
              private alertService: AlertService,
              ) {  // redirect to home if already logged in
               // if (this.authenticationService.userIsLogged) {
                 //  this.router.navigate(['']);}
                }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
     // name: ['', Validators.required],
      //     lastname: ['', Validators.required],
        //   cin: ['', Validators.required],
    });
  }
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
       // if (this.signupForm.invalid) {
       //   return;
       // }

        this.loading = true;
        this.userService.register(this.signupForm.value)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['']);
                },
                error => {
                  console.log(error);
                    this.errorMessage = error;
                    this.loading = false;
                });
  }
}
