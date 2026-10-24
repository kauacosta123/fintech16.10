import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent {
  cliente = {} as Cliente;
  confirmarSenha:string = "";

  // acesso a camada de serviços
  private service = inject(ClienteService);
  private router = inject(Router);

  salvar() {
    if (this.cliente.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }
    
    this.service.incluir(this.cliente).subscribe({
      next: (cliente) => {
        alert(`Cliente ${cliente.nome} criado com id ${cliente.id} `);
        this.router.navigate(["/admin-clientes-listar"]);
      }
    });



  }// fim do salvar
}
