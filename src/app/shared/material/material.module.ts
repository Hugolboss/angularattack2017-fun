import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdCheckboxModule, MdButtonModule, MdInputModule, MdSelectModule, MdOptionModule, MdToolbarModule, MdCardModule, MdSliderModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdCheckboxModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdOptionModule,
    MdToolbarModule,
    MdCardModule,
    MdSliderModule
  ],
  declarations: [],
  exports: [
    MdCheckboxModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdOptionModule,
    MdToolbarModule,
    MdCardModule,
    MdSliderModule
  ]
})
export class MaterialModule { }
