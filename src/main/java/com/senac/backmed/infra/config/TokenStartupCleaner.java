package com.senac.backmed.infra.config;

import com.senac.backmed.domain.repository.TokenRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class TokenStartupCleaner implements ApplicationRunner {

    private final TokenRepository tokenRepository;

    public TokenStartupCleaner(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        tokenRepository.deleteAll();
    }
}
