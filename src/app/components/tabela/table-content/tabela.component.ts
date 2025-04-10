import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NgForOf, NgIf} from '@angular/common';
import {ObjUtils} from '../../../utils/obj-utils';
import {RowAction, TableActionsComponent} from '../table-actions/table-actions.component';

export interface ColumnConfig {
  key: string;
  label: string;
}



@Component({
  selector: 'app-tabela',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatTableModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    NgForOf,
    NgIf,
    TableActionsComponent,
  ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements AfterViewInit, OnInit {

  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() total: number = 0;
  @Input() hasPagination: boolean = true;
  @Input() rowActions: RowAction[] = [];

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected pageSize = 10;
  protected dataSource = new MatTableDataSource<any>();
  protected displayedColumns: string[] = [];


  constructor(private objService: ObjUtils) { }

  protected get columnsKey() {
    return this.columns.map(col => col.key);
  }

  private applySort(): void {
    this.sort.sortChange.subscribe(sort => {
      this.sortChange.emit(sort);
      this.paginator.firstPage();
    });
  }
  ngOnInit(): void {
    this.displayedColumns = this.columnsKey;
    this.displayedColumns = [...this.columnsKey, 'actions'];
  }
  ngAfterViewInit(): void {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applySort();
    console.log(this.rowActions);
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
  }

  onpageEvent(pageEvent: PageEvent): void {
    this.pageChange.emit(pageEvent);
  }

  protected getNestedValue(obj: any, path: string): void {
    return this.objService.getNestedValue(obj, path);
  }


}
