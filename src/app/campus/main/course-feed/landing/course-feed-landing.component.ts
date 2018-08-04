import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CampusCourseModel
} from '../../../../shared/models';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-course-feed-landing-component',
  templateUrl: './course-feed-landing.component.html',
  styleUrls: ['./course-feed-landing.component.scss']
})
export class CampusCourseFeedLandingComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected campusCourseList: Array<any> = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;

      this.getCourseList();
    });
  }

  private getCourseList (): void {
    this.campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllCampusCourse(this.campusId)
      .then((campusCourseList: CampusCourseModel[]) => {
        this.campusCourseList = campusCourseList;
      });
  }
}
