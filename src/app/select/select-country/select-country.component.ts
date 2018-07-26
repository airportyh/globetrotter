import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { CountryTally } from '../../shared/model/select.interface';
import { SelectCountryService } from './select-country.service';
import { Country } from 'src/app/shared/model/country.interface';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  @Input() readonly data: Country[];
  @Input() readonly category: string;
  @Input() readonly subcategory: string;
  public dataByCategory: _.Dictionary<Country[]>;
  public dataBySubcategory: _.Dictionary<Country[]>;
  public subcategoriesByCategory: _.Dictionary<string[]>;
  public categories: string[];
  public subcategories: string[];
  public form: FormGroup;
  public tally: CountryTally;

  constructor(private selectCountryService: SelectCountryService) { }

  ngOnInit() {
    // organize data
    this.dataByCategory = _.groupBy(this.data, this.category);
    this.dataBySubcategory = _.groupBy(this.data, this.subcategory);
    this.subcategoriesByCategory = this.selectCountryService.groupSubcategoriesByCategory(this.data, this.category, this.subcategory);
    this.categories = Object.keys(this.dataByCategory);
    this.subcategories = Object.keys(this.dataBySubcategory);

    // initialize form/tally
    this.form = this.selectCountryService.createForm(this.categories, this.subcategories, true);
    this.updateTally();
    this.form.valueChanges.subscribe(() => {
      this.updateTally();
    });
  }

  onSelectAll() {
    const updatedFormModel = this.selectCountryService.createForm(this.categories, this.subcategories, true);
    this.form.setValue(updatedFormModel.value);
  }

  onClearAll() {
    const updatedFormModel = this.selectCountryService.createForm(this.categories, this.subcategories, false);
    this.form.setValue(updatedFormModel.value);
  }

  onCategoryChange(category: HTMLInputElement) {
    const subcategories = this.subcategoriesByCategory[category.value];
    const updateToFormModel = this.selectCountryService.createCategoryAndSubcategoryUpdate(category.value, subcategories, category.checked);
    this.form.patchValue(updateToFormModel);
  }

  onSubcategoryChange(category: HTMLInputElement) {
    const updateToFormModel = this.selectCountryService.createCategoryUpdate(this.form, category.value);
    this.form.patchValue(updateToFormModel);
  }

  private updateTally(): void {
    this.tally = this.selectCountryService.updateTally(this.form);
  }

}
