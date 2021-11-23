package br.com.voluntier.apivoluntier.Utils;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.Usuario;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class JSONStringConverterToPublicacao implements Converter<String, Publicacao> {

    private final ObjectMapper objectMapper;

    public JSONStringConverterToPublicacao(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Publicacao convert(String s) {
        try {
            return objectMapper.readValue(s, Publicacao.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}