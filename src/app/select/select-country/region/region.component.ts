import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CountryClass } from 'src/app/shared/country/country.class';
import { CountryService } from 'src/app/shared/country/country.service';
import { SelectService } from 'src/app/select/select.service';
import { CountryTally } from 'src/app/shared/model/select.interface';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent extends CountryClass implements OnInit {
	@Input() region: string;
	@Input() form: FormGroup;
	@Input() tally: CountryTally;

  constructor(
    countryService: CountryService,
    private selectService: SelectService
  ) {
    super(countryService)
  }

  ngOnInit() {
	}

	onRegionChange(region: HTMLInputElement) {
		const subregions = this.subregionsByRegion[region.value];
		const updateToFormModel = this.selectService.createRegionAndSubregionsUpdate(region.value, subregions, region.checked);
		this.form.patchValue(updateToFormModel);
	}

	onSubregionChange(region: HTMLInputElement) {
		const updateToFormModel = this.selectService.createRegionUpdate(this.form, region.value);
		this.form.patchValue(updateToFormModel);
	}

}
