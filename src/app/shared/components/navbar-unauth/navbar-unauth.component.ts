import {
  Component,
  OnInit,
  Input,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'shared-navbar-unauth-component',
  templateUrl: './navbar-unauth.component.html',
  styleUrls: ['./navbar-unauth.component.scss']
})
export class SharedNavbarUnauthComponent {

  constructor () {
  }

  @Input() protected logo: boolean;
  @Input() protected isLogoBlue: boolean = false;
  @Input() protected peersviewLogo: boolean;
  @Input() protected aboutUs: boolean;
  @Input() protected digitalCampus: boolean;
  @Input() protected employers: boolean;
  @Input() protected blog: boolean;
  @Input() protected press: boolean;
  @Input() protected signIn: boolean;
  @Input() protected signUp: boolean;
  @Input() protected aboutUsSecond: boolean;
  @Input() protected employersSecond: boolean;
  @Input() protected digitalCampusSecond: boolean;
  @Input() protected blogSecond: boolean;
  @Input() protected pressSecond: boolean;
  @Input() protected signInSecond: boolean;
  @Input() protected signUpSecond: boolean;
}
