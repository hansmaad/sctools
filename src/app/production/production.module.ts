import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductionComponent } from './production.component';
import { ProductionRoutingModule } from './production-routing.module';



@NgModule({
  declarations: [ProductionComponent],
  imports: [
    FormsModule,
    CommonModule,
    ProductionRoutingModule,
  ]
})
export class ProductionModule { }
