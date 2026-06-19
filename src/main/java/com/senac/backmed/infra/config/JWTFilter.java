package com.senac.backmed.infra.config;

import com.senac.backmed.application.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        String path = request.getRequestURI();

        //liberação de metodos para não travar o token jwt
        //adionar a land page aqui
        //para desativar a segurança, descomentar a linha abaixo
        if (    //path.startsWith("/") ||
                path.equals("/auth/login") || path.startsWith("/swagger-ui")
                || path.startsWith("/medicos/adm")
                || path.startsWith("/webjars")
                || path.startsWith("/swagger-resources")
                || path.startsWith("/v3/api-docs")
                || request.getMethod().startsWith("OPTIONS"))
        {
            filterChain.doFilter(request,response);
            return;
        }
        //fazendo testes

        String header = request.getHeader("Authorization");

        if(header != null && header.startsWith("Bearer ")){
            String token = header.replace("Bearer ", "");

            var retornotoken = tokenService.validarToken(token);

            UsernamePasswordAuthenticationToken usuario = new UsernamePasswordAuthenticationToken(retornotoken, null, retornotoken.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(usuario);

            //validar token jwt
        }else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token não informado ou inválido");
            return;
        }
        filterChain.doFilter(request,response);
    }
}


