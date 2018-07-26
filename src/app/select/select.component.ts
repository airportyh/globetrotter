import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { SelectService } from './select.service';

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

  constructor(private selectService: SelectService) { }

  ngOnInit() {
  }

}
