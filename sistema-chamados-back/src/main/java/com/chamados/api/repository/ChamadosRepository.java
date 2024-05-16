package com.chamados.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chamados.api.model.Chamados;

public interface ChamadosRepository extends JpaRepository<Chamados, Long>{

	List<Chamados> findByCodigoUsuario(String login);

	List<Chamados> findByCodigoUsuarioAndAssunto(String login, String assunto);

	List<Chamados> findByCodigoUsuarioAndId(String login, Long id);

}
