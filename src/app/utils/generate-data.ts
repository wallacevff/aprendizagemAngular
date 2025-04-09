import { Injectable } from '@angular/core';

export interface Contato {
  name: string;
  contato: {
    email: string;
    idade: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private nomes = ['Ana', 'Carlos', 'Fernanda', 'Lucas', 'Mariana', 'João', 'Camila', 'Pedro', 'Laura', 'Rafael'];
  private sobrenomes = ['Silva', 'Souza', 'Oliveira', 'Pereira', 'Costa', 'Almeida', 'Nascimento', 'Lima', 'Araújo', 'Fernandes'];
  private dominios = ['@gmail.com', '@outlook.com', '@yahoo.com', '@email.com'];

  constructor() { }

  private gerarEmail(nome: string, sobrenome: string): string {
    const numero = Math.floor(Math.random() * 100);
    const dominio = this.dominios[Math.floor(Math.random() * this.dominios.length)];
    return `${nome.toLowerCase()}.${sobrenome.toLowerCase()}${numero}${dominio}`;
  }

  private gerarIdade(): number {
    return Math.floor(Math.random() * (60 - 18 + 1)) + 18;
  }

  public gerarDadosAleatorios(quantidade: number = 40): Contato[] {
    const lista: Contato[] = [];

    for (let i = 0; i < quantidade; i++) {
      const nome = this.nomes[Math.floor(Math.random() * this.nomes.length)];
      const sobrenome = this.sobrenomes[Math.floor(Math.random() * this.sobrenomes.length)];

      lista.push({
        name: `${nome} ${sobrenome}`,
        contato: {
          email: this.gerarEmail(nome, sobrenome),
          idade: this.gerarIdade()
        }
      });
    }

    return lista;
  }
}
