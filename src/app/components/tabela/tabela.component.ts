import {AfterViewInit, Component, EventEmitter, Input, input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NgForOf, NgIf} from '@angular/common';

export interface ColumnConfig {
  key: string;
  label: string;
}

@Component({
  selector: 'app-tabela',
  imports: [
    MatTableModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    NgForOf,
    NgIf,
  ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements AfterViewInit, OnInit {

  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() total: number = 0;
  @Input() hasPagination: boolean = true;

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected pageSize = 10;
  protected dataSource = new MatTableDataSource<any>();
  protected displayedColumns: string[] = [];


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
  }
  ngAfterViewInit(): void {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    console.log(this.displayedColumns);
    this.applySort();
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
  }

  onpageEvent(pageEvent: PageEvent): void {
    this.pageChange.emit(pageEvent);
  }

  protected getNestedValue(obj: any, path: string): void {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  }

}
