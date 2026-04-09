package com.senac.backmed.BackMed.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenApi(){
        return new OpenAPI().info(new Info().title("MedSys").version("1.0").description("Controle de histórico médico").termsOfService("linkedin ou github"));
    }
}


