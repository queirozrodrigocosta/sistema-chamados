package com.chamados.api.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "chamados")
public class Chamados implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Size(max = 255, message="O você não pode digitar mais do que 255 caracteres no campo 'descrição'")
	@NotNull(message="O campo 'descrição' não pode ser nulo!")
	private String descricao;

	@Size(max = 255, message="O você não pode digitar mais do que 255 caracteres no campo 'assunto'")
	@NotNull(message="O campo 'assunto' não pode ser nulo!")
	private String assunto;

	private Integer pontuacao;
	
	private Integer finalizado;

	@Column(name = "codigo_atendente")
	private String codigoAtendente;

	@Column(name = "codigo_usuario")
	private String codigoUsuario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getAssunto() {
		return assunto;
	}

	public void setAssunto(String assunto) {
		this.assunto = assunto;
	}

	public Integer getPontuacao() {
		return pontuacao;
	}

	public void setPontuacao(Integer pontuacao) {
		this.pontuacao = pontuacao;
	}

	public Integer getFinalizado() {
		return finalizado;
	}

	public void setFinalizado(Integer finalizado) {
		this.finalizado = finalizado;
	}

	public String getCodigoAtendente() {
		return codigoAtendente;
	}

	public void setCodigoAtendente(String codigoAtendente) {
		this.codigoAtendente = codigoAtendente;
	}

	public String getCodigoUsuario() {
		return codigoUsuario;
	}

	public void setCodigoUsuario(String codigoUsuario) {
		this.codigoUsuario = codigoUsuario;
	}

	@Override
	public int hashCode() {
		return Objects.hash(assunto, codigoAtendente, codigoUsuario, descricao, finalizado, id, pontuacao);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Chamados other = (Chamados) obj;
		return Objects.equals(assunto, other.assunto) && Objects.equals(codigoAtendente, other.codigoAtendente)
				&& Objects.equals(codigoUsuario, other.codigoUsuario) && Objects.equals(descricao, other.descricao)
				&& Objects.equals(finalizado, other.finalizado) && Objects.equals(id, other.id)
				&& Objects.equals(pontuacao, other.pontuacao);
	}


	
	
	

}
