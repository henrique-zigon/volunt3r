package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Services.ArquivoServices;
import br.com.voluntier.apivoluntier.Services.S3Services;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/arquivos")
public class ArquivoController {
    @Autowired
    S3Services s3Services;

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

    @PostMapping("/imagem")
    public ResponseEntity uploadImagem(@RequestParam MultipartFile imagem) throws IOException {
        s3Services.uploadFile(imagem.getOriginalFilename(), imagem);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/imagem/{nome}")
    public ResponseEntity downloadImagem(@PathVariable String nome) throws IOException {
        S3Object stream = s3Services.downloadFile(nome);
        byte[] content = IOUtils.toByteArray(stream.getObjectContent());
        ByteArrayResource resource = new ByteArrayResource(content);
        return ResponseEntity.status(200)
                .contentLength(content.length)
                .header("Content-type", "application/octet-stream")
                .body(resource);
    }

}
