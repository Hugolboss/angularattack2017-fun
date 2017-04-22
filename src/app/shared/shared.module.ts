import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
