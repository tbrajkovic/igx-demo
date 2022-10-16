import { Component, inject, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GroupedRecords, IgxDialogComponent, IgxGridComponent, Transaction } from "igniteui-angular";
import { Observable } from 'rxjs';


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
  @ViewChild(IgxDialogComponent, { static: true }) public dialog!: IgxDialogComponent;

  data: Product[] = [];
  productCount: number = 0;
  transactionCount: number = 0;
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

  public undo() {
    /* exit edit mode and commit changes */
    this.grid.endEdit(true);
    this.grid.transactions.undo();
  }

  public redo() {
    /* exit edit mode and commit changes */
    this.grid.endEdit(true);
    this.grid.transactions.redo();
  }

  public openCommitDialog() {
    this.transactionsData = this.grid.transactions.getAggregatedChanges(true);
    this.dialog.open();
  }

  public commit() {
    this.grid.transactions.commit(this.data);
    this.dialog.close();
  }

  public discard() {
    this.grid.transactions.clear();
    this.dialog.close();
  }

  public stateFormatter(value: any) {
    return JSON.stringify(value);
  }

  public typeFormatter(value: string) {
    return value.toUpperCase();
  }

  public classFromType(type: string): string {
    return `transaction--${type.toLowerCase()}`;
  }

  cyRandom() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

}
}

@Pipe({ name: "startsWith" })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = "") {
    return collection.filter(item =>
      item.name
        .toString()
        .toLowerCase()
        .startsWith(term.toString().toLowerCase())
    );
  }
}
