package br.com.voluntier.apivoluntier.Security;

import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
@Component
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AutentificacaoService autentificacaoService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    // configurações de autentificação
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(autentificacaoService).passwordEncoder(new BCryptPasswordEncoder());
    }

    // Configuração de Autorizacao
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/usuarios/login").permitAll()
                .antMatchers(HttpMethod.POST, "/usuarios/email-existente/**").permitAll()
                .antMatchers(HttpMethod.POST, "/usuarios/validarToken/**").permitAll()
                .antMatchers(HttpMethod.POST, "/usuarios/updateSenha").permitAll()
                .antMatchers(HttpMethod.POST, "/usuarios/novo").permitAll()
                .antMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
                .antMatchers(HttpMethod.GET, "/v3/**").permitAll()
                // Filtrando autoridades do ArquivoController
                .antMatchers(HttpMethod.GET, "/arquivos/imagem/*").permitAll()
                .antMatchers(HttpMethod.GET, "/arquivos/*").hasAuthority("b3_social")
                .antMatchers(HttpMethod.POST, "/arquivos/*").hasAuthority("b3_social")
                // Filtrando autoridades de CursoController
                .antMatchers(HttpMethod.POST, "/cursos").hasAuthority("b3_social")
                .antMatchers(HttpMethod.DELETE, "/cursos/*").hasAuthority("b3_social")
                .antMatchers(HttpMethod.PUT, "/cursos/*").hasAuthority("b3_social")
                //Filtrando autoridades de EventoController
                .antMatchers(HttpMethod.PUT, "/eventos/novo").hasAuthority("b3_social")
                .antMatchers(HttpMethod.POST, "/eventos/confirmar-presenca/*").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().addFilterBefore(new AutentificacaoViaTokenFilter(tokenService, usuarioRepository), UsernamePasswordAuthenticationFilter.class);



        //  http.cors().and().cors();
    }

    // configuracao de recursos(js, css, imagens, etc)
    @Override
    public void configure(WebSecurity web) throws Exception {

    }
}
