INSERT INTO atendente VALUES
(1, "atendente", "$2a$10$mAg1SsQGBTJM.gSPbr9uv.EPk9IykanHcc8Vjy6/34HKVjQEq347q");

INSERT INTO usuario VALUES
(1, "usuario", "$2a$10$mAg1SsQGBTJM.gSPbr9uv.EPk9IykanHcc8Vjy6/34HKVjQEq347q");

INSERT INTO permissao (codigo, descricao) values (1, 'ROLE_ATENDENTE');
INSERT INTO permissao (codigo, descricao) values (2, 'ROLE_USUARIO');

INSERT INTO atendente_permissao(codigo_atendente,codigo_permissao) VALUES
(1,1);

INSERT INTO usuario_permissao(codigo_usuario,codigo_permissao) VALUES
(1,2);


