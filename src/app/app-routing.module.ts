import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CanActivateUserProfile
} from './shared/can-activate';

export const appRoutes: Routes = [{
  path: 'peers',
  loadChildren: './peers/peers.module#PeersModule',
  data: { state: 'peers' }
}, {
  path: 'campus',
  loadChildren: './campus/campus.module#CampusModule',
  canActivate: [CanActivateUserProfile],
  data: { state: 'campus' }
}, {
  path: 'community',
  loadChildren: './community/community.module#CommunityModule',
  canActivate: [CanActivateUserProfile],
  data: { state: 'community' }
}, {
  path: 'user',
  loadChildren: './user/user.module#UserModule',
  data: { state: 'user' }
}, {
  path: 'profile',
  loadChildren: './profile/profile.module#ProfileModule',
  canActivate: [CanActivateUserProfile],
  data: { state: 'profile' }
}, {
  path: 'home',
  loadChildren: './home/home.module#HomeModule',
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'home'
  }
}, {
  path: 'leisure',
  loadChildren: './leisure/leisure.module#LeisureModule',
  data: { state: 'leisure' }
}, {
  path: '',
  loadChildren: './index/index.module#IndexModule',
  canActivate: [CanActivateUserProfile]
}, {
  path: 'sign-up',
  loadChildren: './sign-up/sign-up.module#SignUpModule',
  canActivate: [CanActivateUserProfile],
  data: { state: 'sign-up' }
}, {
  path: 'sign-in',
  loadChildren: './sign-in/sign-in.module#SignInModule',
  canActivate: [CanActivateUserProfile],
  data: { state: 'sign-in' }
}, {
  path: 'about-us',
  loadChildren: './about-us/about-us.module#AboutUsModule',
  data: { state: 'about-us' }
}, {
  path: 'contact-us',
  loadChildren: './contact-us/contact-us.module#ContactUsModule',
  data: { state: 'contact-us' }
}, {
  path: 'digital-campus',
  loadChildren: './digital-campus/digital-campus.module#DigitalCampusModule',
  data: { state: 'digital-campus' }
}, {
  path: 'advance-search',
  loadChildren: './advance-search/advance-search.module#AdvanceSearchModule',
  data: { state: 'advance-search' }
}, {
  path: 'account-settings',
  loadChildren: './account-settings/account-settings.module#AccountSettingsModule',
  canActivate: [CanActivateUserProfile],
  data: { state: 'account-settings' }
}, {
  path: 'terms-of-use-user',
  loadChildren: './terms-of-use-user/terms-of-use-user.module#TermsOfUseUserModule',
  data: { state: 'terms-of-use-user' }
}, {
  path: 'privacy-policy',
  loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule',
  data: { state: 'privacy-policy' }
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
