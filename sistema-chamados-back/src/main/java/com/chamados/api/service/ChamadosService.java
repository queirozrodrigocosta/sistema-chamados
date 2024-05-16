package com.chamados.api.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.chamados.api.model.Chamados;

@Service
public interface ChamadosService {

	List<Chamados> listar(String nome);

	List<Chamados> listar();

	List<Chamados> finalizar(Long id);

	List<Chamados> avaliar(Long id, Integer valor);

	List<Chamados> abrir(Chamados obj);

}
