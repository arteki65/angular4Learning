import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];

  static projectNameCantBeTest(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'projectNameCantBeTest': true};
    }
  }

  static projectNameForbiddenByExternalService(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({'projectNameForbiddenByExternalService': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, AppComponent.projectNameCantBeTest],
        AppComponent.projectNameForbiddenByExternalService),
      'mail': new FormControl(null, [Validators.email, Validators.required]),
      'projectStatus': new FormControl(this.statuses[0])
    });
  }

  onFormSubmit() {
    console.log(this.projectForm.value);
  }
}
