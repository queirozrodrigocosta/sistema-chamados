package com.chamados.api.service.impl;


import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chamados.api.model.Chamados;
import com.chamados.api.repository.ChamadosRepository;
import com.chamados.api.service.ChamadosService;


@Service
public class ChamadosServiceImpl implements ChamadosService {


	@Autowired
	private ChamadosRepository chamadosRepository;


	@Override
	public List<Chamados> listar() {
		return this.chamadosRepository.findAll();

	}
	@Override
	public List<Chamados> listar(String nome) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		List<Chamados> chamados = new ArrayList<Chamados>();

		if (StringUtils.isBlank(nome)) {
			chamados = this.chamadosRepository.findByCodigoUsuario(auth.getPrincipal().toString());
		} else {
			chamados = this.chamadosRepository.findByCodigoUsuarioAndAssunto(auth.getPrincipal().toString(), nome.trim());
			try {
				if (chamados.size() == 0)
					chamados = this.chamadosRepository.findByCodigoUsuarioAndId(auth.getPrincipal().toString(), Long.parseLong(nome.trim()));
			}catch (Exception e) {
			}
		}

		return chamados;
	}

	@Override
	public List<Chamados> finalizar(Long id) {

		Chamados chamado = this.chamadosRepository.getOne(id);

		chamado.setFinalizado(1);

		this.chamadosRepository.save(chamado);

		return this.chamadosRepository.findAll();

	}

	@Override
	public List<Chamados> avaliar(Long id, Integer valor) {

		Chamados chamado = this.chamadosRepository.getOne(id);

		chamado.setPontuacao(valor);

		this.chamadosRepository.save(chamado);

		return this.listar(null);

	}
	@Override
	public List<Chamados> abrir(Chamados obj) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		obj.setFinalizado(0);
		obj.setCodigoUsuario(auth.getPrincipal().toString());

		this.chamadosRepository.save(obj);

		return this.listar(null);
	}


}

