package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Services.ArquivoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.MultiPixelPackedSampleModel;
import java.io.IOException;

@RestController
@RequestMapping("/arquivos")
public class ArquivoController {

    @Autowired
    ArquivoServices arqServices;

    @GetMapping(value = "/eventos-txt", produces = "application/txt")
    @ResponseBody
    public ResponseEntity getEventosTXT() {
        return arqServices.exportarEventosTXT();
    }

    @GetMapping(value = "/eventos-csv", produces = "application/csv")
    @ResponseBody
    public ResponseEntity getEventosCSV() {
        return arqServices.exportarEventosCSV();
    }

    @GetMapping(value = "/funcionarios-txt", produces = "application/txt")
    @ResponseBody
    public ResponseEntity getDocumentoFuncionario() {
        return arqServices.exportarFuncionariosTXT();
    }

    @GetMapping(value = "/funcionarios-csv", produces = "application/csv")
    @ResponseBody
    public ResponseEntity getFuncionarioCSV() {
        return arqServices.exportarFuncionariosCSV();
    }

    @PostMapping("/upload")
    public ResponseEntity uploadArquivo(@RequestParam MultipartFile arquivo) throws IOException {
        return arqServices.verificarUpload(arquivo);
    }
}
