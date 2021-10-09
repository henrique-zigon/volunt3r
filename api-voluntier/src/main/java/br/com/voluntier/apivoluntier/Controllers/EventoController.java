package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.*;
import br.com.voluntier.apivoluntier.Repositories.*;
import br.com.voluntier.apivoluntier.Responses.Classificacao;
import br.com.voluntier.apivoluntier.Responses.UsuarioSimplesResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Services.EmailService;
import br.com.voluntier.apivoluntier.Services.S3Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

/*
TODO
 -Fazer filtros de eventos
 -Fazer paginação (Utilizar limit 10 offset x*10)
 */

@RestController
@RequestMapping("/eventos")
public class EventoController {
    @Autowired
    S3Services s3Services;
    @Autowired
    private EventoRepository repository;

    @Autowired
    private InscricaoEventoRepository repositoryInscricaoEvento;

    @Autowired
    private PublicacaoRepository repositoryPublicacao;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ClassificacaoRepository classificacaoRepository;

    @Autowired
    private EventoRepository eventoRepository;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping()
    public ResponseEntity getEventos(@RequestParam(defaultValue = "0") Integer pagina,
                                     @RequestParam(defaultValue = "10") Integer tamanho,
                                     @RequestHeader String Authorization) {
        String tokenLimpo=Authorization.substring(7,Authorization.length());
        Integer idUsu=tokenService.getIdUsuario(tokenLimpo);
        Page<Publicacao> allPub = repositoryPublicacao.findByTipoIs("evento", PageRequest.of(pagina, tamanho));
        if(allPub.isEmpty()) {
            return ResponseEntity.status(204).build();
        } else {
            allPub.forEach(pub -> {
                pub.isCurtido(idUsu);
            });
            return ResponseEntity.status(200).body(allPub);
        }
    }

//    @PostMapping("/novo")
//    public ResponseEntity postEvento(@RequestBody Evento novoEvento) {
//        retornoHasmap.clear();
//        try {
//            //repository.save(novoEvento);
//            retornoHasmap.put("message", "Evento criado com sucesso!");
//
//            return ResponseEntity.status(201).body(repository.findEventoMaxId().get(0).getId());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//    }

    @PostMapping(path="/novo", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postPublicacaoEvento(@RequestPart MultipartFile arquivo,
                                               @RequestPart Publicacao novaPublicacaoEvento)  throws IOException {
        String filename = arquivo.getOriginalFilename();
        String name = new Date().getTime()+"."+filename.substring(filename.lastIndexOf(".")+1);
        s3Services.uploadFile(name,arquivo);
        novaPublicacaoEvento.setPathImagem(name);
        repository.save(novaPublicacaoEvento.getEvento());

        try {
            repositoryPublicacao.save(novaPublicacaoEvento);
            retornoHasmap.put("message", "Evento criado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/inscrever")
    public ResponseEntity postInscricaoEvento(@RequestBody InscricaoEvento novaInscricao) {
        retornoHasmap.clear();
        Evento evento = repository.findById(novaInscricao.getFkEvento()).get();
        for(InscricaoEvento inscricao : evento.getInscritos()) {
            if(inscricao.getFkUsuario() == novaInscricao.getFkUsuario())
                return ResponseEntity.status(400).body("Você já está inscrito neste evento");
        }
        try {
            if(evento.getNumeroInscritos() == evento.getMaximoParticipantes())
                return ResponseEntity.status(400).body("Número de inscritos já atingido");

            repositoryInscricaoEvento.save(novaInscricao);
            EmailService.listaEmail.insert(novaInscricao);
            retornoHasmap.put("message", "usuário inscrito com sucesso!");

            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/confirmar-presenca")
    public ResponseEntity postParticipacao(@RequestBody InscricaoEvento inscricao){
        retornoHasmap.clear();
        try {

            InscricaoEvento registroInscricao=repositoryInscricaoEvento.findByFkUsuarioAndFkEvento(inscricao.getFkUsuario(), inscricao.getFkEvento());
            Optional <Usuario> usuario=usuarioRepository.findById(inscricao.getFkUsuario());


            if (registroInscricao.getStatus().equals("confirmado")){
                retornoHasmap.put("message","Você já participou desse evento");
                return ResponseEntity.status(400).body(retornoHasmap); //ver status
            }
            //String catDoEvento=eventoRepository.findCategoria(inscricao.getFkEvento());
            Evento eventoSelecionado=eventoRepository.findById(inscricao.getFkEvento()).get();
            System.out.println("Evento selecionado: "+eventoSelecionado.getId());
            Classificacao ranqueEmCategoria=classificacaoRepository.FindAllByFkUsuarioAndfkCategoriaBonificacao(usuario.get().getIdUsuario(),eventoSelecionado.getCategoria().getIdCategoria());
            if (usuario.isPresent()){
                Integer milhas=usuario.get().getQuantidadeMilhas() + eventoSelecionado.getMilhasParticipacao();
                usuario.get().setQuantidadeMilhas(milhas);  //ADD milhas de participação
                usuarioRepository.save(usuario.get());
                registroInscricao.setStatus("confirmado");
                repositoryInscricaoEvento.save(registroInscricao);
                retornoHasmap.put("message","Participação registrada");



                if (ranqueEmCategoria.getcontagem()==ranqueEmCategoria.getLimiteBronze() || ranqueEmCategoria.getcontagem()==ranqueEmCategoria.getLimitePrata() || ranqueEmCategoria.getcontagem()==ranqueEmCategoria.getLimiteOuro()){
                    retornoHasmap.clear();
                    retornoHasmap.put("message","Participação registrada! \n Você acabou de subir de nível na categoria "+ranqueEmCategoria.getNomeCategoria());
                    milhas=usuario.get().getQuantidadeMilhas() + ranqueEmCategoria.getMilhasPromocao();
                    usuario.get().setQuantidadeMilhas(milhas);  //ADD milhas de promoção
                    usuarioRepository.save(usuario.get());
                }



                return ResponseEntity.status(201).body(retornoHasmap);
            }
            else {
                return ResponseEntity.status(404).body("Usuario não encontrado");
            }

        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }



    }

    @GetMapping("/inscricoes")
    public ResponseEntity getInscritoEvento(){
        return ResponseEntity.status(200).body(repositoryInscricaoEvento.findAll());
    }

    @DeleteMapping("/inscricoes")
    public ResponseEntity deleteInscritoEvento(@RequestBody InscricaoEvento inscricaoDeletada){
        retornoHasmap.clear();
        try {
            repositoryInscricaoEvento.delete(inscricaoDeletada);
            retornoHasmap.put("message", "inscrição cancelada!");
            return ResponseEntity.status(200).body(retornoHasmap);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }

    }

    @GetMapping("/categorias")
    public ResponseEntity getCategorias() {
        return ResponseEntity.status(200).body(categoriaRepository.findAll());
    }

    @GetMapping("/niveis")
    public ResponseEntity getNiveis() {
        return ResponseEntity.status(200).body(categoriaRepository.findUniqueNiveis());
    }

    @GetMapping("/{id}/inscritos")
    public ResponseEntity getInscritos(@PathVariable Integer id) {
        Evento evento = repository.findById(id).get();
        List<Integer> lista = new ArrayList<>();
        for(InscricaoEvento ie : evento.getInscritos()) {
            lista.add(ie.getFkUsuario());
        }
        List<UsuarioSimplesResponse> listaUsuario = usuarioRepository.pesquisarTodosIds(lista);
        if(!listaUsuario.isEmpty()) {
            return ResponseEntity.status(200).body(listaUsuario);
        }else {
            return ResponseEntity.status(204).build();
        }
    }

}
