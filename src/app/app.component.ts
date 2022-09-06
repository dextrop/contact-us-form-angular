import { Component } from '@angular/core';
import { FirestorecontrollerService } from './services/firestorecontroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contact-us-form';

  constructor(private Firebase: FirestorecontrollerService) {}

  onSubmitted(event: any) {
    let id = new Date().getTime().toString();
    this.Firebase.add("contact-us-form", id, event);
  }
}
