import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.css']
})
export class ContactUsFormComponent implements OnInit {
  first_name = "";
  last_name = "";
  email = "";
  phone = "";
  message = "";
  error = "";
  @Input() MIN_LENGTH_MESSAGE = 50;
  @Output() form_submitted = new EventEmitter();
  submitted = false;
  constructor() { }

  ngOnInit(): void {
  }

  validate_email(email:string) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  validate_f_name() {
    if (this.first_name.length < 3) {
      return false;
    }
    return true;
  }

  validate_l_name() {
    if (this.last_name.length < 3) {
      return false;
    }
    return true;
  }

  validate_phone() {
    if (this.phone.toString().length == 10) {
      return true;
    }
    return false;
  }

  validate_message() {
    if (this.message.length < this.MIN_LENGTH_MESSAGE) {
      return false;
    }
    return true;
  }

  raise_error(message:string) {
    this.error = message;
    setTimeout(() => {this.error = "";}, 1500);
  }

  validate_form() {
    let form_data:any = {};

    if (!this.validate_f_name()) {
      this.raise_error("Invalid First Name") 
      return false;
    }

    if (!this.validate_email(this.email)) {
      this.raise_error("Invalid Email") 
      return false;
    }
    
    if (!this.validate_l_name()) {
      this.raise_error("Invalid Last name") 
      return false;
    }

    if (!this.validate_phone()) {
      this.raise_error("Invalid Phone No") 
      return false;
    }

    if (!this.validate_message()) {
      this.raise_error("Query should contain atleast 50 characters.") 
      return false;
    }

    return {
      email: this.email,
      phone: this.phone,
      first_name: this.first_name,
      last_name: this.last_name,
      message: this.message
    }
  }

  onSubmit() {
    let validated_form = this.validate_form();
    if (validated_form) {
      this.form_submitted.emit(validated_form)
      this.submitted = true;
    }    
  }
}
