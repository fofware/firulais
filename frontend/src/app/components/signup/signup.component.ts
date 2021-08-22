import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/_helpers/must-match-validator';
import { userEmailExistsValidator } from './email-exists.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  User:any = {}

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
//      title: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: [''],
      email: [''
            ,[Validators.required, Validators.email]
//            ,[existingEmailNumberValidato(this.authService)]
          ],
//      whatsapp: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
//      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword'),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.alertService.success('Va a grabar Registro');
    console.log(this.form.value);
    /*
    this.loading = true;
    this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
    */
  }


  signUp(){

  }

  async checkEmail(){
    this.alertService.clear();
    console.log(this.form.value.email)
    const exists = await this.authService.emailExists(this.form.value.email);
    console.log(this.form);
    if(exists){
      this.alertService.error('Email ya está registrado');

    }
  }
}
