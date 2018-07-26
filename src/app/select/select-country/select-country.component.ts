import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CountryClass } from '../../shared/country/country.class';
import { CountryTally } from '../../shared/model/select.interface';
import { CountryService } from '../../shared/country/country.service';
import { SelectCountryService } from './select-country.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent extends CountryClass implements OnInit {
  @Input() form: FormGroup;
  public tally: CountryTally;

  constructor(
    countryService: CountryService,
    private selectCountryService: SelectCountryService
  ) {
    super(countryService)
  }

  ngOnInit() {
    this.form = this.selectCountryService.createForm(true);
    this.updateTally();
    this.form.valueChanges.subscribe(() => {
      this.updateTally();
    });
  }

  onSelectAll() {
    const updatedFormModel = this.selectCountryService.createForm(true);
    this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.selectCountryService.createForm(false);
    this.form.setValue(updatedFormModel.value);
  }

  onRegionChange(region: HTMLInputElement) {
    const subregions = this.subregionsByRegion[region.value];
    const updateToFormModel = this.selectCountryService.createRegionAndSubregionsUpdate(region.value, subregions, region.checked);
    this.form.patchValue(updateToFormModel);
  }

  onSubregionChange(region: HTMLInputElement) {
    const updateToFormModel = this.selectCountryService.createRegionUpdate(this.form, region.value);
    this.form.patchValue(updateToFormModel);
  }

  private updateTally(): void {
    this.tally = this.selectCountryService.updateTally(this.form);
  }

}
