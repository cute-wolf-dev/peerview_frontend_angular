import {
  Component,
  Input
} from '@angular/core';
import {
  PostApiService,
} from '../../../../services/api';
import {
  UserService,
} from '../../../../services';
import {
  PostModel,
  PostReplyModel,
  UserModel,
  IResponse
} from '../../models';
import {CryptoUtilities} from '../../utilities';
import { Link, NgxLinkifyjsService } from 'ngx-linkifyjs';

@Component({
  selector: 'shared-post-reply-comment-component',
  templateUrl: './post-reply-comment.component.html',
  styleUrls: ['./post-reply-comment.component.scss']
})
export class SharedPostReplyCommentComponent {
  constructor (
    private postApiService: PostApiService,
    public linkifyService: NgxLinkifyjsService
  ) {}

  private user: UserModel = UserService.getUser();
  private postReply: PostReplyModel = new PostReplyModel();
  protected isUserCurrentlyCommenting = false;
  @Input() private post: PostModel = new PostModel();
  @Input() private reply: PostReplyModel = new PostReplyModel();

  public ngOnInit (): void {
    this.postReply.quoteReplyId = this.reply.id;
  }

  protected onPostReplyComment (): void {
    this.isUserCurrentlyCommenting = true;
    this.postApiService.promiseCreatePostReply(this.post.id, this.postReply)
      .then(async (response: IResponse) => {
        this.postReply.user = this.user;
        this.postReply.createdAt = new Date();
        // clone the postReply
        let postReply: any = this.postReply.clone();
        if (response && response.data) {
          postReply.id = parseInt(CryptoUtilities.decipher(response.data.id), 10);
          let findUrl: Link[] = await this.linkifyService.find(postReply.comment);
          if (findUrl.length > 0 && findUrl[0].type === 'url') {
            let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
              .then((res: any) => {
                postReply.comment = `${(postReply.comment.replace(regex, ' ')).trim()}
                  <div class="link-preview">
                    <div class="link-area">
                    <div class="og-image">
                      <a href="${res.data.url}" target="_blank">
                        <img src="${res.data.image}" alt="logo" />
                      </a>
                    </div>
                    <div class="descriptions">
                      <div class="og-title">${res.data.title}</div>
                      <div class="og-description">${res.data.description}</div>
                      <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                    </div>
                    </div>
                  </div>`;
              });
          }
          this.post.postReply.unshift(postReply);
        }
        this.postReply.init(); // this will initialize the data with blank ones
        this.isUserCurrentlyCommenting = false;
      })
      .catch(error => {
        console.log('error', error);
        this.isUserCurrentlyCommenting = false;
      });
  }

  protected onDeletePostReply (replyId: number): void {
    this.postApiService.promiseRemovePostReply(replyId)
      .then((response: IResponse) => {
        let index = this.post['postReply'].findIndex((filter: any) => {
          return filter.id === replyId;
        });
        if (index > -1 ) {
          this.post['postReply'].splice(index, 1);
        }
      }).catch(error => {
      console.error('error', error);
    });
  }
}
