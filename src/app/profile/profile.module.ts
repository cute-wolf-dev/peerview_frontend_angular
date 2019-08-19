/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  ProfileComponent
} from './profile.component';
import {
  ProfileLeftSidebarComponent
} from './left-sidebar/left-sidebar.component';
import {
  ProfileLeftSidebarUserInfoComponent
} from './left-sidebar/user-info/user-info.component';
import {
  ProfileLeftSidebarUserOtherInfoComponent
} from './left-sidebar/user-other-info/user-other-info.component';
import {
  ProfileLeftSidebarUserInfoMessageDiaglogComponent
} from './left-sidebar/user-info/message/message.component';
import {
  ProfileLeftSidebarUserInfoPostToDiaglogComponent
} from './left-sidebar/user-info/post-to/post-to.component';
import {
  ProfileRightSidebarComponent
} from './right-sidebar/right-sidebar.component';
import {
  ProfileContentComponent
} from './content/content.component';
import {
  ProfileLeftSidebarUserInfoAboutMeDialogComponent
} from './left-sidebar/user-info/modal/about-me-modal.component';
import {
  CanActivateOtherProfile
} from './check-if-other-profile';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  profileRouting
} from './profile-routing.component';
import { ProfileAddExperienceDialogComponent } from './content/add-experience-modal/add-experience-modal.component';
import { ProfileAddSkillsDialogComponent } from './content/add-skills-modal/add-skills-modal.component';
import { SharedPipeModule } from '../shared/pipe/pipe.module';

@NgModule({
  imports : [
    SharedModule,
    SharedPipeModule,
    profileRouting
  ],
  declarations : [
    ProfileComponent,
    ProfileLeftSidebarComponent,
    ProfileLeftSidebarUserInfoComponent,
    ProfileLeftSidebarUserOtherInfoComponent,
    ProfileRightSidebarComponent,
    ProfileContentComponent,
    ProfileLeftSidebarUserInfoMessageDiaglogComponent,
    ProfileLeftSidebarUserInfoPostToDiaglogComponent,
    ProfileLeftSidebarUserInfoAboutMeDialogComponent,
    ProfileAddExperienceDialogComponent,
    ProfileAddSkillsDialogComponent
  ],
  exports: [
    ProfileLeftSidebarUserInfoMessageDiaglogComponent,
    ProfileLeftSidebarUserInfoPostToDiaglogComponent,
    ProfileLeftSidebarUserInfoAboutMeDialogComponent,
    ProfileAddExperienceDialogComponent,
    ProfileAddSkillsDialogComponent
  ],
  entryComponents: [
    ProfileLeftSidebarUserInfoMessageDiaglogComponent,
    ProfileLeftSidebarUserInfoPostToDiaglogComponent,
    ProfileLeftSidebarUserInfoAboutMeDialogComponent,
    ProfileAddExperienceDialogComponent,
    ProfileAddSkillsDialogComponent
  ],
  providers: [
    CanActivateOtherProfile
  ]
})
export class ProfileModule {}
