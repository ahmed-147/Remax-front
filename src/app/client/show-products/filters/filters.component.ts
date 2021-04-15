import { Component, OnInit } from '@angular/core';
enum CheckBoxType { ch_1, ch_2, ch_3,NONE };
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  check_box_type = CheckBoxType;

  currentlyChecked: CheckBoxType;
  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }

  constructor() { }

  ngOnInit(): void {
  }
  

}
