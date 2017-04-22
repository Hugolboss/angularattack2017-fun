import { NgModule } from '@angular/core';
import {MdButtonModule, MdTabsModule, MdCardModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdSlideToggleModule, MdSelectModule, MdOptionModule, MdInputModule, MdDialogModule, MdGridList, MdGridListModule} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
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
