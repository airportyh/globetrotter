import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CountryClass } from '../../shared/country/country.class';
import { CountryTally } from '../../shared/model/select.interface';
import { CountryService } from '../../shared/country/country.service';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent extends CountryClass implements OnInit {
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

  onSelectAll() {
    const updatedFormModel = this.selectService.createCountryForm(true);
    this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.selectService.createCountryForm(false);
    this.form.setValue(updatedFormModel.value);
  }

}
