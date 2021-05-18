package br.com.voluntier.apivoluntier.Security;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
@Order(1)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256("YOUR_API_AUDIENCE", "YOUR_API_ISSUER")
                .configure(http)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/usuarios/novo/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/admin/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/public/**").permitAll();
    }

}
