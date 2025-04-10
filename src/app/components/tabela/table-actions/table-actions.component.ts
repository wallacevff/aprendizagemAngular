import {Component, Input} from '@angular/core';
import {CommonModule, NgForOf, NgOptimizedImage} from '@angular/common';


export interface RowAction {
  icon?: string;
  iconUrl?: string;
  label: string;
  action: (row: any) => void;
}

@Component({
  selector: 'app-table-actions',
  imports: [
    NgForOf,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './table-actions.component.html',
  styleUrl: './table-actions.component.css'
})
export class TableActionsComponent {
  @Input() rowActions: RowAction[] = [];
  @Input() row: any;
}
