/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  SharedFilterPipeComponent
} from './filter.pipe';
import {
  SharedLocalDatePipeComponent
} from './local-date.pipe';
import {
  SearchTextPipe
} from './search-text.pipe';
import {
  SharedAvailablePostPipeComponent
} from './available-post.pipe';
import {
  SharedLinkPreviewPipeComponent
} from './link-preview.pipe';
import {
  SharedAvailableNotificationPipeComponent
} from './available-notification.pipe';
import {
  SharedAvailableFollowerPipeComponent
} from './available-follower.pipe';
import {
  SharedAvailableFolloweePipeComponent
} from './available-followee.pipe';
import {
  RemoveAmpPipe
} from './remove-amp.pipe';

@NgModule({
  imports: [],
  declarations: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent,
    SharedLinkPreviewPipeComponent,
    SharedAvailableNotificationPipeComponent,
    SharedAvailableFollowerPipeComponent,
    SharedAvailableFolloweePipeComponent,
    RemoveAmpPipe
  ],
  exports: [
    SharedFilterPipeComponent,
    SharedLocalDatePipeComponent,
    SearchTextPipe,
    SharedAvailablePostPipeComponent,
    SharedLinkPreviewPipeComponent,
    SharedAvailableNotificationPipeComponent,
    SharedAvailableFollowerPipeComponent,
    SharedAvailableFolloweePipeComponent,
    RemoveAmpPipe
  ]
})
export class SharedPipeModule {}
