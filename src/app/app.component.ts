import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TabelaComponent} from './components/tabela/tabela.component';
import {PageEvent} from '@angular/material/paginator';
import {NavbarComponent} from './components/navbar/navbar/navbar.component';
import {Contato, MockDataService} from './utils/generate-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule, TabelaComponent, NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aprendizagemAngular';

  cols = [
    { key: 'name', label: 'Nome' },
    { key: 'contato.email', label: 'E-mail' },
    { key: 'contato.idade', label: 'Idade' }
  ];
  dados: Contato[];
  total: number;
  constructor(private mockService: MockDataService) {
    this.dados = mockService.gerarDadosAleatorios();
    this.total = this.dados.length;
  }





  onPageChange(event: PageEvent) {
    console.log('📄 Página trocada:', event);
    // Requisição ao backend...
  }

  onSortChange(event: Sort) {
    console.log('↕️ Ordenação trocada:', event);
    let {active, direction} = event;
    if (!direction) direction = 'asc';
    this.dados = this.dados.slice().sort((a, b) => {
      const aValue = this.getNestedValue(a, active);
      const bValue = this.getNestedValue(b, active);

      return direction === 'asc'
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });
  }
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((val, key) => val?.[key], obj);
  }
}
