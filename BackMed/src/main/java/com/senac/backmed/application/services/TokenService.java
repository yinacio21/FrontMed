package com.senac.backmed.application.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.senac.backmed.domain.entities.Medico;
import com.senac.backmed.domain.entities.Token;
import com.senac.backmed.domain.repository.MedicoRepository;
import com.senac.backmed.domain.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.secretKey}")
    private static String secret;

    @Value("${spring.emissor}")
    private static String emissor;

    @Value("${spring.tempoExpiracao}")
    private static Long tempoExpiracao;

    @Autowired
    private static TokenRepository tokenRepository;

    @Autowired
    private static Medico medico;

    @Autowired
    private static MedicoRepository medicoRepository;

    public UserDetails validarToken(String token) {

        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algoritimo).withIssuer(emissor).build();

            verifier.verify(token);

            var tokenBanco = tokenRepository.findTokenByToken(token);

            return tokenBanco.get().getMedico();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String gerarToken(String email) {

        try{
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            String token = JWT.create().withIssuer(emissor).withSubject(email).withExpiresAt(gerarDataExpiracao()).sign(algoritimo);

            var medico = medicoRepository.findByEmail(email).orElse(null);

            tokenRepository.save(new Token(token, medico));

            return token;

        } catch (Exception e){
            return null;
        }
    }

    private static Instant gerarDataExpiracao(){
        return LocalDateTime.now().plusMinutes(tempoExpiracao).toInstant(ZoneOffset.of("-03:00"));
    }
}

