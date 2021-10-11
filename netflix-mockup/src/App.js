import react, { useEffect, useState } from "react";
import tmdb from "./tmdb";
import LinhaDeFilmes from "./components/LinhaDeFilmes";
import './App.css';
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";

export default () => {
  const [listaFilmes, setListaFilmes] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      //Pegando a lista toda com as informações da página Home
      let list = await tmdb.getHomeList();
      console.log(list);
      setListaFilmes(list);
      //Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadData();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featureData &&
        <FeatureMovie item={featureData}></FeatureMovie>
      }
      <section className="lists">
        {listaFilmes.map((item, key) => (
          <LinhaDeFilmes key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito com carinho por Thiago Yure<br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site themoviedb.org
      </footer>
      {listaFilmes.length <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/full/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="carregando" />
        </div>
      }
    </div>
  );
}