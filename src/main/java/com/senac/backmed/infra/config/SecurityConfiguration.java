package com.senac.backmed.infra.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JWTFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.requestMatchers(
                        "/auth/login",
                        "/medicos/adm",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger-resources/**",
                        "/v3/api-docs/**").permitAll()

                        //para desativar a segurança, descomentar a linha abaixo
                        //.requestMatchers("/**").permitAll()

                        //rotas medico
                        .requestMatchers(HttpMethod.GET,"/medicos").authenticated()
                        .requestMatchers(HttpMethod.GET, "/medicos/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/medicos").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/medicos/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/medicos/usuariologado").authenticated()

                        //rotas paciente
                        .requestMatchers(HttpMethod.GET, "/pacientes").authenticated()
                        .requestMatchers(HttpMethod.GET, "/pacientes/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/pacientes").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/pacientes/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/pacientes/**").authenticated()

                        //rotas prontuario
                        .requestMatchers(HttpMethod.GET, "/prontuarios").authenticated()
                        .requestMatchers(HttpMethod.GET, "/prontuarios/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/prontuarios").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/prontuarios/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/prontuarios/**").authenticated()

                        //rotas dashboard
                        .requestMatchers(HttpMethod.GET, "/dashboard").authenticated()

                        //rotas endereco
                        .requestMatchers(HttpMethod.GET, "/api/enderecos/**").authenticated()

                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
