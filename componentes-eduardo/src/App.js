import React from 'react';
import Teste from '../src/componentes/Teste';
import CardBranco from './componentes/CardBranco';
import Vlibras from './componentes/Vlibras';
import Medalha from './componentes/Medalha';
import Conquista from './componentes/Conquista';

function App() {
  return (
    <>
      <Teste />
      <CardBranco titulo="Tintulo" conteudo="Oloko bincho olha só como eu sou bom no Reacto" />
      <Medalha borda={true} iconeMedalha="./imagens/vaadin_medal.png" alt="Medalha de ouro de doação de sangue" elo="Ouro"/>
      <Conquista titulo="Mentoria" conteudo="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
      <Vlibras />
    </>
  );
}

export default App;
