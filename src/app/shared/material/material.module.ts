import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdSlideToggleModule, MdSelectModule, MdOptionModule, MdInputModule, MdDialogModule } from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdOptionModule,
    MdInputModule,
    MdDialogModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdOptionModule,
    MdInputModule,
    MdDialogModule
  ],
  declarations: []
})
export class MaterialModule { }