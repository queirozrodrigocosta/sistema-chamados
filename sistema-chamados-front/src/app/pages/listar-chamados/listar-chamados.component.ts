// import { AuthService } from './../../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
// import { ChamadoModel } from './../../model';
// import { ChamadoFiltro } from './../chamado-filtro.model';
// import { ChamadoService } from './../../../servicos/chamado.service';
import { Component, OnInit } from '@angular/core';
import { ChamadoService } from 'src/app/_services/chamado.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ChamadoModel } from './model';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.scss']
})
export class ListarChamadosComponent implements OnInit {




  id!: number;
  nome: string = "";
  assunto: string = "";
  descricao: string = "";
  
  listaDeChamados = [];
  coluna: any[] = [
    { field: 'id', header: 'Código' },
    { field: 'assunto', header: 'Assunto' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'pontuacao', header: 'Pontuação' },
    { field: 'finalizado', header: 'Situação' },
  ];
  dialogInlcuir: boolean = false;
  dialogAvaliar: boolean = false;

  numeros : any[] = [];
  numero!: number;

  constructor(private chamadoService: ChamadoService, 
    private rota: Router,
    private title: Title, private messageService: MessageService, private auth: AuthService) {
      for (let i = 1; i <= 10; i++) {
        this.numeros.push({ id: i.toString(), val: i });
      }
    }

  ngOnInit() {
    this.chamadoService.atualizarToken();
    this.pesquisar();
    this.title.setTitle("Listar chamados");
  }

  abrir() {
    if(this.temPermissao('ROLE_USUARIO')) {
      if(this.assunto === "" || this.descricao === "") {
        this.messageService.add({severity:'error', summary: 'Erro', detail:'Digite o Assunto e Descrição'});

      } else {
        let obj = new ChamadoModel(); 
        obj.assunto = this.assunto;
        obj.descricao = this.descricao;

        this.chamadoService.abrir(obj)
          .then( chamados => {
            this.listaDeChamados = chamados;
            this.dialogInlcuir = false
          })
          .catch(erro => {
            this.erroPermissao();
          });
      }
    }   
  }

  avaliar() {
    if(this.temPermissao('ROLE_USUARIO')) {
      if(!Number(this.numero)) {
        this.messageService.add({severity:'error', summary: 'Erro', detail:'Selecione uma nota'});

      } else {
        this.chamadoService.avaliar(this.id, this.numero)
          .then( chamados => {
            this.listaDeChamados = chamados;
            this.dialogAvaliar = false;
          })
          .catch(erro => {
            this.erroPermissao();
          });
      }
    }   
  }

  private erroPermissao() {
    this.messageService.add({ severity: 'error', summary: 'Erro de permissão', detail: 'Você não tem permissão para operar esse conteúdo' });
    this.rota.navigate(['login']);
  }

  finalizar(id: number) {
    if(this.temPermissao('ROLE_ATENDENTE')) {
      this.chamadoService.finalizar(id)
        .then( chamados => 
          this.listaDeChamados = chamados
        )
        .catch(erro => {
          this.erroPermissao();
        });
    }   
  }

  pesquisar(){
    if(this.temPermissao('ROLE_ATENDENTE')) {
      this.chamadoService.listarChamados(this.nome)
        .then( chamados => 
          this.listaDeChamados = chamados
        )
        .catch(erro => {
          this.erroPermissao();
        });
    } else if(this.temPermissao('ROLE_USUARIO')) {

      this.chamadoService.listarChamados(this.nome)
        .then( chamados => 
          this.listaDeChamados = chamados
        )
        .catch(erro => {
          this.erroPermissao();
        });
    } else {
      this.rota.navigate(['login']);
    }
  }

  showDialogInlcuir() {
    this.dialogInlcuir = true; 
  }

  showDialogAvaliar(id: number) {
    this.id = id;
    this.dialogAvaliar = true; 
  }

  temPermissao(permissao: string){
    if(this.auth.jwtPayload != null){
      return this.auth.temPermissao(permissao);
    }
  }
}