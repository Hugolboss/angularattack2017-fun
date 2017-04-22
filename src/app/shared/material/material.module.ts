import { NgModule } from '@angular/core';
import {MdButtonModule, MdSnackBarModule, MdButtonToggleModule, MdTabsModule, MdCardModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdSlideToggleModule, MdSelectModule, MdOptionModule, MdInputModule, MdDialogModule, MdGridList, MdGridListModule} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdSnackBarModule,
    MdButtonToggleModule,
    MdCardModule,
    MdTabsModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdOptionModule,
    MdInputModule,
    MdDialogModule,
    MdGridListModule
  ],
  exports: [
    MdButtonModule,
    MdSnackBarModule,
    MdButtonToggleModule,
    MdCardModule,
    MdTabsModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdOptionModule,
    MdInputModule,
    MdDialogModule,
    MdGridListModule
  ],
  declarations: []
})
export class MaterialModule { }
