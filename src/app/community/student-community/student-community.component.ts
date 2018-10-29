import {
	Component
} from '@angular/core';
import {
	CourseModel,
	UserModel,
	CommunityModel
} from '../../shared/models';
import {
	CourseApiService,
	CommunityApiService
} from '../../../services/api';
import {
	UserService
} from '../../../services';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
	ComunityMobileAskQuestionMobileComponent
} from '../../shared/modals';
import {
	PostEmitter
} from '../../shared/emitter';

@Component({
	selector: 'student-community-component',
	templateUrl: './student-community.component.html',
	styleUrls: ['./student-community.component.scss']
})
export class StudentCommunityComponent {
	constructor (
		private courseApiService: CourseApiService,
		private communityApiService: CommunityApiService,
		private dialog: MatDialog,
		private overlay: Overlay) {}

	private hasImageSelected: boolean = false;
	private courses = [];
	private user: UserModel;
	protected communityPosts: CommunityModel = new CommunityModel();
	protected isToggleUploadComponentVisible: boolean = false;

	public ngOnInit (): void {
		this.getCourse();
		this.user = UserService.getUser();
	}

	private getCourse (): void {
		this.courseApiService.promiseGetAllCourses()
		.then((courses: CourseModel[]) => {
			this.courses = courses;
		})
		.catch(() => {});
	}

	protected onAskQuestion (): void {
		if (this.hasImageSelected) {
			PostEmitter.uploadImages().emit();
		} else {
			this.createQuestion();
		}
	}

	protected onChangeCourse (item): void {
		this.communityPosts.courseId = item;
		this.communityApiService.promiseGetAllCommunityPostsData(this.communityPosts.courseId)
		.then((response) => {
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		});
	}

	protected onOpenAskQuestionModal (): void {
    let dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'ask-a-question-modal';
		dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
		dialogConfig.data = this.user;
		this.dialog.open(ComunityMobileAskQuestionMobileComponent, dialogConfig);
	}

  protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
	}

	protected onUploadComplete (attachments): void {
		this.communityPosts.attachments = attachments;
		this.createQuestion();
	}

	private createQuestion (): void {
		this.communityPosts.area = 'community';
		this.communityPosts.type = 'post';
		console.log(this.communityPosts);
		this.communityApiService.promiseCreateStudentCommunityPosts(this.communityPosts)
		.then(() => {})
		.catch((error) => {
			console.log(error);
		});
	}
}