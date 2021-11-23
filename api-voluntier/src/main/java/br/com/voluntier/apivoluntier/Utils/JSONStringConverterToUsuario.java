package br.com.voluntier.apivoluntier.Utils;

import br.com.voluntier.apivoluntier.Models.Usuario;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class JSONStringConverterToUsuario implements Converter<String, Usuario> {

    private final ObjectMapper objectMapper;

    public JSONStringConverterToUsuario(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Usuario convert(String s) {
        try {
            return objectMapper.readValue(s, Usuario.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}