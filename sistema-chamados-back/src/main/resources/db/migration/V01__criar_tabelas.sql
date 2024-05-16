CREATE TABLE usuario(
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	login VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE atendente(
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	login VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE permissao (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE usuario_permissao (
	codigo_usuario BIGINT(20) NOT NULL,
	codigo_permissao BIGINT(20) NOT NULL,
	PRIMARY KEY (codigo_usuario, codigo_permissao),
	FOREIGN KEY (codigo_usuario) REFERENCES usuario(id),
	FOREIGN KEY (codigo_permissao) REFERENCES permissao(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE atendente_permissao (
	codigo_atendente BIGINT(20) NOT NULL,
	codigo_permissao BIGINT(20) NOT NULL,
	PRIMARY KEY (codigo_atendente, codigo_permissao),
	FOREIGN KEY (codigo_atendente) REFERENCES atendente(id),
	FOREIGN KEY (codigo_permissao) REFERENCES permissao(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE chamados (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	codigo_atendente VARCHAR(255),
	codigo_usuario VARCHAR(255),
	assunto VARCHAR(255) NOT NULL,
	descricao VARCHAR(255) NOT NULL,
	pontuacao INT(2),
	finalizado INT(1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;