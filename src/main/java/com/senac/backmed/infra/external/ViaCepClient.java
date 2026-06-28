package com.senac.backmed.infra.external;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.senac.backmed.infra.dto.ViaCepResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component
public class ViaCepClient {

    private final HttpClient httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ViaCepResponse consultarCep(String cep) {
        String cepLimpo = cep.replaceAll("[^0-9]", "");

        if (cepLimpo.length() != 8) {
            throw new IllegalArgumentException("CEP deve conter exatamente 8 dígitos.");
        }

        String url = "https://viacep.com.br/ws/" + cepLimpo + "/json/";

        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new RuntimeException("Erro ao consultar a API do ViaCEP. Status: " + response.statusCode());
            }

            ViaCepResponse viaCepResponse = objectMapper.readValue(response.body(), ViaCepResponse.class);
            if (Boolean.TRUE.equals(viaCepResponse.getErro())) {
                throw new IllegalArgumentException("CEP inválido ou inexistente.");
            }
            return viaCepResponse;

        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Falha na comunicação com o ViaCEP: " + e.getMessage());
        }
    }
}
