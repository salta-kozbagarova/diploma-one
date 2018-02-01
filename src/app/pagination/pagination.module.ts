import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent
  ],
  bootstrap: [PaginationComponent],
  exports: [PaginationComponent]
})
export class PaginationModule { }
