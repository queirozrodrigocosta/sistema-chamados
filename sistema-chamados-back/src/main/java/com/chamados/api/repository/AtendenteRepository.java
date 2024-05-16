package com.chamados.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chamados.api.model.Atendente;

public interface AtendenteRepository extends JpaRepository<Atendente, Long> {

	public Optional<Atendente> findByLogin(String login);

}
