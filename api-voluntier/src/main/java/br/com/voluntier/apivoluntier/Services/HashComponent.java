package br.com.voluntier.apivoluntier.Services;

import br.com.voluntier.apivoluntier.Utils.HashTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class HashComponent implements
        ApplicationListener<ContextRefreshedEvent> {

    private static final Logger LOG
            = Logger.getLogger(""+HashComponent.class);


//    @Autowired
//    HashService hashService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        LOG.info("INICIALIZANDO HASHSERVICE");
    //    hashService.ConstrutorHashService();
    }
//
//    public HashTable getHashTable(){
//        return hashService.getHashTable();
//    }

}
