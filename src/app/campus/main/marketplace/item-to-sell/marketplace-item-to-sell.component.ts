import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusMarketplaceModel
} from '../../../../shared/models';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CryptoUtilities
} from '../../../../shared/utilities';
import {
  PostEmitter
} from '../../../../shared/emitter';
import {
  Location
} from '@angular/common';

@Component({
  selector: 'campus-marketplace-item-to-sell-component',
  templateUrl: './marketplace-item-to-sell.component.html',
  styleUrls: ['./marketplace-item-to-sell.component.scss']
})
export class CampusMarketplaceItemToSellComponent {
  constructor (
    private campusApiService: CampusApiService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  protected campusMarketPlace: CampusMarketplaceModel = new CampusMarketplaceModel();
  protected campusId: number;
  private hasImageSelected: boolean = false;

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });
  }

  protected onSubmit (formIsValid): void {
    if (formIsValid) {
      if (this.hasImageSelected) {
        PostEmitter.uploadImages().emit();
      } else {
        this.createMarketPlaceItemToSell();
      }
    }
  }

  protected onUploadComplete (attachments): void {
    this.campusMarketPlace.attachments =  attachments;
    this.createMarketPlaceItemToSell();
  }

  protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
  }

  private createMarketPlaceItemToSell (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseCreateMarketplace(campusId, this.campusMarketPlace)
      .then((_) => {
        // navigate to landing
        this.location.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
