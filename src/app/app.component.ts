import {Component, ViewChild} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {PageEvent} from '@angular/material/paginator';
import {NavbarComponent} from './components/navbar/navbar/navbar.component';
import {Contato, MockDataService} from './utils/generate-data';
import {ObjUtils} from './utils/obj-utils';
import {FormGroup} from '@angular/forms';
import {TabelaComponent} from './components/tabela/table-content/tabela.component';
import {RowAction} from './components/tabela/table-actions/table-actions.component';

@Component({
  selector: 'app-root',
  imports: [MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule, TabelaComponent, NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aprendizagemAngular';

  pikaDura = (arg: any) => `${arg} - PNSC`;

  cols = [
    { key: 'name', label: 'Nome' },
    { key: 'contato.email', label: 'E-mail' },
    { key: 'contato.idade', label: 'Idade' }
  ];
  dados: Contato[];
  total: number;

  @ViewChild(NavbarComponent) navbar!: NavbarComponent;
  form!: FormGroup;

  constructor(private mockService: MockDataService,
              private objUtils: ObjUtils) {
    this.dados = mockService.gerarDadosAleatorios();
    this.total = this.dados.length;
  }

  onPageChange(event: PageEvent) {
    console.log('📄 Página trocada:', event);
    // Requisição ao backend...
    console.log(this.dados);
  }

  onSortChange(event: Sort) {
    console.log('↕️ Ordenação trocada:', event);
    let {active, direction} = event;
    if (!direction) direction = 'asc';
    this.dados = this.dados.slice().sort((a, b) => {
      const aValue = this.objUtils.getNestedValue(a, active);
      const bValue = this.objUtils.getNestedValue(b, active);

      return direction === 'asc'
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });
  }

  search(value: any): void {
    console.log(value);
  }

  searchEvent(event: MouseEvent): void {
    const values = this.navbar.searchForm.value as { search: string };
    this.dados = this.dados.slice().filter(x => x.name.toLowerCase().includes(values.search.toLowerCase()));
  }


  rowActions: RowAction[] = [
    {
      icon: 'bi-pencil',
      label: 'Editar',
      action: (row: any) => this.editar(row)
    },
    {
      icon: 'bi-trash',
      label: 'Excluir',
      action: (row: any) => this.excluir(row)
    },
    {
      icon:  'bi-eye',
      label: 'Visualizar',
      action: (row: any) => this.visualizar(row)
    }
  ];

  editar(row: any) {
    console.log('🖋 Editar:', row);
  }

  excluir(row: any) {
    console.log('🗑 Excluir:', row);
  }

  visualizar(row: any) {
    console.log('Visualizar:', row)
  }
}
