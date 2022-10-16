import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompletePipeStartsWith, GridExampleComponent } from './grid-example/grid-example.component';
import {IgxActionStripModule, IgxDialogModule, IgxGridModule, IgxSimpleComboModule} from "igniteui-angular";
import { 
	IgxAutocompleteModule,
	IgxDropDownModule,
	IgxInputGroupModule
 } from "igniteui-angular";




@NgModule({
  declarations: [
    GridExampleComponent,
	  AutocompletePipeStartsWith
  ],
  imports: [
    CommonModule,
    IgxGridModule,
    IgxActionStripModule,
    IgxSimpleComboModule,
    IgxAutocompleteModule,
    IgxDropDownModule,
    IgxInputGroupModule,
    IgxDialogModule
  ],
  exports: [
    GridExampleComponent
  ]
})
export class GridExampleModule { }
