import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { SelectService } from './select.service';
import { Selection, CountryTally, Quantity, QuantityModel } from '../shared/model/select.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class SelectComponent implements OnInit {
  @Output() selectionMade = new EventEmitter<Selection>();
  public countryForm: FormGroup;
  public countryTally: CountryTally;
  public quantities: Quantity[];
  public quantityModel: QuantityModel;

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    this.initializeCountryForm();
    this.initializeQuantityModel();
	}

  onSubmit(): void {
    const selection: Selection = {
      countryForm: this.countryForm.value,
      quantity: this.quantityModel.quantity
    };
    this.selectionMade.emit(selection);
  }

  private initializeCountryForm(): void {
    this.countryForm = this.selectService.createCountryForm(true);
    this.updateCountryTally();
    this.countryForm.valueChanges.subscribe(() => {
      this.updateCountryTally();
    });
  }

  private initializeQuantityModel(): void {
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15},
      { display: '20', value: 20 },
      { display: 'All', value: undefined }
    ];
    this.quantityModel = { quantity: this.quantities[0].value };
  }

  private updateCountryTally(): void {
    this.countryTally = this.selectService.updateCountryTally(this.countryForm);
  }

}
