package com.chamados.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chamados.api.model.Chamados;
import com.chamados.api.service.ChamadosService;


@RestController
@RequestMapping("/chamado")
public class ChamadoController {

	@Autowired
	private ChamadosService servico;

	@GetMapping("/listar-chamados")
	@PreAuthorize("hasAnyRole('ROLE_ATENDENTE', 'ROLE_USUARIO')")
	public List<Chamados> listarChamados(String nome, @RequestHeader("Authorization") String token){

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ATENDENTE"))) {
			return this.servico.listar();

		} else if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USUARIO"))) {

			return this.servico.listar(nome);

		}
		return null;

	}

	@PostMapping("/finalizar/{id}")
	@PreAuthorize("hasAuthority('ROLE_ATENDENTE')")
	public List<Chamados> finalizar(@PathVariable Long id){
		return this.servico.finalizar(id);

	}

	@PostMapping("/avaliar/{id}/{valor}")
	@PreAuthorize("hasAuthority('ROLE_USUARIO')")
	public List<Chamados> avaliar(@PathVariable Long id, @PathVariable Integer valor){
		return this.servico.avaliar(id, valor);

	}

	@PostMapping("/abrir")
	@PreAuthorize("hasAuthority('ROLE_USUARIO')")
	public List<Chamados> abrir(@RequestBody Chamados obj){
		return this.servico.abrir(obj);

	}

}
