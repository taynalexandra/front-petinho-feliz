import React from 'react';
import './Denuncia.css';

const Denuncia = () => {

  return (
    <div className="div-denuncia">
      <main className="container servicos">
        <article className="servico bg-white radius">
          <a href="/#"><img src="maustratos.jpg" alt="Maus tratos" /></a>
          <div className="inner">
            <h3>O que diz a Lei</h3>
            <h4>Identificando o problema</h4>
            <p>A Constituição Federal garante a proteção da fauna e
            veda práticas que submetam os animais à crueldade
            (artigo 23, inciso VII; e artigo 225, § 1º e inciso VII).
            O artigo 32 da Lei de Crimes Ambientais (nº 9.605, de 12
            de fevereiro de 1998) considera crime as práticas de
            abuso, maus-tratos, ferir ou mutilar animais silvestres,
            domésticos ou domesticados, nativos ou exóticos. Dessa
            forma cabe a todo cidadão denunciar quando essa prática
            for de seu conhecimento.
                </p>
          </div>
        </article>

        <article className="servico bg-white radius">
          <a href="/#"><img src="cachorro1.jpg" alt="Cachorro com telefone" /></a>
          <div className="inner">
            <h3>Como denunciar</h3>
            <h4>Saiba o que fazer em caso de mais tratos</h4>
            <p>Para denunciar qualquer tipo de abuso, anote sempre
            o maior número de dados que ajudem a identificar os
            maus tratos ou abandono do animal. A comprovação pode
            ser feita através de fotos, filmagens ou ainda por
            meio de testemunhas. A denúncia deve ser feita em órgão
            de proteção à vida animal, bem como o registro de
            boletim de ocorrência nas delegacias.
				</p>
          </div>
        </article>

        <article className="servico bg-white radius">
          <a href="/#"><img src="caopolicial.jpg" alt="Cão Policial" /></a>
          <div className="inner">
            <h3>Denuncie!</h3>
            <h4>Amanhã pode ser tarde demais</h4>
            <p>Telefones:<br /><br />
              Polícia Militar - 190 <br />
                Disque-Denúncia - 181 <br />
                  Ibama Linha Verde - 0800 61 8080</p>
            <p>Sites: <br /><br />
              <a className="link-interno" href="http://www.ibama.gov.br/fale-com-o-ibama-rodape">Ibama</a>
              <br />
              <a className="link-interno" href="https://www.webdenuncia.org.br/">Web Denúncia</a>
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}

export default Denuncia;