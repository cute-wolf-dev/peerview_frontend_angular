import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserModel
} from '../../../models';
import {
  TokenStore,
  UserService
} from '../../../../../services';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { SharedCreateMessageComponent } from '../../../modals';

@Component({
  selector: 'navbar-desktop-component',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class NavbarDesktopComponent {
  constructor (
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  protected user: UserModel = UserService.getUser();
  protected keyword: string = null;

  protected onSignOut (): void {
    TokenStore.expungeData();
    window.location.reload();
  }

  protected onNewMessageClick (): void {
    // let queryParams = {
    //   newMsg: true
    // }

    // this.router.navigate([`/messages`], {queryParams});
    /* Added MatDialogConfig for adding a custom setting for this modal */
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'share-post-modal';
    dialogConfig.disableClose = true;
    // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = 'this.post';
    dialogConfig.id = 'SharePostModalComponent';
    this.dialog.open(SharedCreateMessageComponent, dialogConfig);
      // .afterClosed()
      // .subscribe((post: PostModel|CampusPostModel) => {
      //   if (post) {
      //     PostEmitter.postShare().emit(post);
      //   }
      // }, error => {
      //   console.log(error);
      // });
  }
}
