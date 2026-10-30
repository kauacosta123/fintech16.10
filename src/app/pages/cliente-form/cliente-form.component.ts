import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  cliente = {} as Cliente;
  confirmarSenha:string = "";

  // acesso a camada de serviços
  private service = inject(ClienteService);
  private router = inject(Router);

  private route = inject(ActivatedRoute);
  clienteId: string | null = this.route.snapshot.paramMap.get("id");

  ngOnInit(): void {

    if(this.clienteId){
      this.service.buscarPorId(this.clienteId).subscribe({
        next: (cliente) => this.cliente = cliente
      })
    }
  }
  
  salvar() {

    


    if (this.cliente.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }
    
    if(this.clienteId){
      // modo de alteração
      this.service.editar(this.cliente).subscribe({
        next: (cliente) =>{
          alert(`Cliente ${cliente.nome} alterado com sucesso"`);
          this.router.navigate(["/admin-cliente-listar"])
        }
      })
    }else{
      // modo de inclusão
      this.service.incluir(this.cliente).subscribe({
      next: (cliente) => {
        alert(`Cliente ${cliente.nome} criado com id ${cliente.id} `);
        this.router.navigate(["/admin-clientes-listar"]);
      }
    });
    }

  }// fim do salvar
}
