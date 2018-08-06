import {
  Component,
  Input
} from '@angular/core';
import {
  PostApiService,
  CampusApiService
} from '../../../../services/api';
import {
  UserService,
} from '../../../../services';
import {
  PostModel,
  PostReplyModel,
  CampusPostReplyModel,
  UserModel,
  IResponse
} from '../../models';
import {
  EmitterService
} from '../../emitter/emitter.component';

@Component({
  selector: 'shared-post-reply-component',
  templateUrl: './post-reply.component.html',
  styleUrls: ['./post-reply.component.scss']
})
export class SharedPostReplyComponent {
  constructor (
    private postApiService: PostApiService,
    private campusApiService: CampusApiService
  ) {}

  private user: UserModel = UserService.getUser();
  protected isUserCurrentlyCommenting = false;
  protected postReply: PostReplyModel = new PostReplyModel();
  @Input() private post: PostModel = new PostModel();
  @Input() protected route: {name: string, campusId?: number, campusFreshersFeedId?: number};
  protected campusPostReply: CampusPostReplyModel = new CampusPostReplyModel();

  protected onPostReply (): void {
    this.isUserCurrentlyCommenting = true;

    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseCreatePostReply(this.post.id, this.postReply)
          .then((response: IResponse) => {
            this.postReply.user = this.user;
            this.postReply.createdAt = new Date();
            // clone the postReply
            let postReply: any = this.postReply.clone();
            this.post.postReply.unshift(postReply);
            this.postReply.init(); // this will initialize the data with blank ones
            this.isUserCurrentlyCommenting = false;
          })
          .catch(error => {

          });
        break;
      case 'campus':
      case 'campusFreshersFeed':
        this.campusPostReply.assimilate({comment: this.postReply.comment});
        this.campusApiService.promiseCreatePostReply(this.post.id, this.campusPostReply)
          .then((response: IResponse) => {
            this.campusPostReply.user = this.user;
            this.campusPostReply.createdAt = new Date();
            let campusPostReply: any = this.campusPostReply.clone();
            this.post.postReply.unshift(campusPostReply);
            this.postReply.init();
            this.isUserCurrentlyCommenting = false;
          })
          .catch(error => {});
        break;
    }
  }
}
