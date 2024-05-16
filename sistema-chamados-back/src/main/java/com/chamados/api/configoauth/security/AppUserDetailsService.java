package com.chamados.api.configoauth.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.chamados.api.model.Atendente;
import com.chamados.api.model.Usuario;
import com.chamados.api.repository.AtendenteRepository;
import com.chamados.api.repository.UsuarioRepository;

@Service
public class AppUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private AtendenteRepository atendenteRepository;

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		Optional<Usuario> usuarioOpt = this.usuarioRepository.findByLogin(login);
		Optional<Atendente> atendenteOpt = this.atendenteRepository.findByLogin(login);
		if(usuarioOpt.isPresent()) {
			Usuario usuario = usuarioOpt.orElseThrow(() -> new UsernameNotFoundException("Login e/ou senha incorreto(s)"));
			return new User(login, usuario.getSenha(), getPermissoes(usuario));
			
		}else if(atendenteOpt.isPresent()){
			Atendente atendente = atendenteOpt.orElseThrow(() -> new UsernameNotFoundException("Login e/ou senha incorreto(s)"));
			return new User(login, atendente.getSenha(), getPermissoes(atendente));
		}
		return new User(null,null,null);
		
	}

	private Collection<? extends GrantedAuthority> getPermissoes(Usuario usuario) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		usuario.getPermissoes().forEach(p -> authorities.add(new SimpleGrantedAuthority(p.getDescricao().toUpperCase())));
		return authorities;
	}

	private Collection<? extends GrantedAuthority> getPermissoes(Atendente atendente) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		atendente.getPermissoes().forEach(p -> authorities.add(new SimpleGrantedAuthority(p.getDescricao().toUpperCase())));
		return authorities;
	}

}
