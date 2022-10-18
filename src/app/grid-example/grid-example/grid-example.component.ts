import { Component, inject, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CellType, IGridEditEventArgs, IgxGridComponent, Transaction } from "igniteui-angular";


export interface Product {
  sku: string;
  name: string;
  brand: string;
  stockQty: number;
  available: boolean;
  description: {
    text: string;
    price: string;
    discount: number;
  }
}

export interface Sku {
  sku: string;
  name: string;
  brand: string;
}

@Component({
  selector: 'int-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.scss']
})
export class GridExampleComponent implements OnInit {
  private readonly http = inject(HttpClient);
  @ViewChild('grid', { read: IgxGridComponent, static: true }) public grid!: IgxGridComponent;

  data: Product[] = [];
  skuData$ = this.http.get<Sku[]>('https://mocki.io/v1/4482e17a-92b8-4b6f-a012-62e1def6dd17');
  skuData!: Sku[];
  public transactionsData: Transaction[] = [];

  ngOnInit() {
    this.skuData$.subscribe(s => {
      this.skuData = s;
    });
  }

  public addRow() {
    this.grid.beginAddRowById(null);
  }
  
  public deleteRow(id: any) {
    this.grid.deleteRow(id);
  }

  public commit() {
    this.transactionsData = this.grid.transactions.getAggregatedChanges(true);
    this.grid.transactions.commit(this.data);
  }

  public discard() {
    this.transactionsData = this.grid.transactions.getAggregatedChanges(true);
    this.grid.transactions.clear();
  }

  cellEditDone(event: any){
    console.log(event);
    if(event.column.field == 'sku'){
      if(event.newValue != event.oldValue){
        var sku = this.skuData.find(x => x.sku === event.newValue);
        if(sku!=null){
          setTimeout(() => {
            var cellBrand = this.grid.gridAPI.get_cell_by_key(event.cellID.rowID,"brand");
            cellBrand.value = sku?.brand;
            cellBrand.editValue = sku?.brand;
            cellBrand.update(sku?.brand);
            cellBrand.grid.cdr.detectChanges();
          },500);
          setTimeout(() => {
            var cellName = this.grid.gridAPI.get_cell_by_key(event.cellID.rowID,"name");
            cellName.value = sku?.name;
            cellName.editValue = sku?.brand;
            cellName.update(sku?.name);
            cellName.grid.cdr.detectChanges();
          },500);
        }
      }
    }
    if(event.column.field == 'stockQty'){
      if(event.newValue != event.oldValue){
        setTimeout(() => {
          var cellAvailable = this.grid.gridAPI.get_cell_by_key(event.cellID.rowID,"available");
          cellAvailable.value = false;
          cellAvailable.editValue = false;
          cellAvailable.update(false);
          cellAvailable.grid.cdr.detectChanges();
        },500);
        
      }
    }
  }

  
}

@Pipe({ name: "startsWith" })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = "") {
    var rez = collection.filter(item =>
      item.sku
        .toString()
        .toLowerCase()
        .startsWith(term.toString().toLowerCase())
    );
    return rez
  }
}
