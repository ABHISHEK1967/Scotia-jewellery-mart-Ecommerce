/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GridLayoutBuilder } from "./components/gridLayoutBuilder/gridLayoutBuilder";
import { TableLayoutBuilder } from "./components/tableLayoutBuilder/tableLayoutBuilder";
import { PrimengModule } from "./primeng/primeng.module";

@NgModule({
  declarations: [
    GridLayoutBuilder,
    TableLayoutBuilder
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports:[
    GridLayoutBuilder,
    TableLayoutBuilder
  ]
})
export class SharedCustomModule {}
