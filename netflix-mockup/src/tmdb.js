import dotenv from 'dotenv';

dotenv.config();

/*
- Originais Netflix
- Em Destaque
- Em Alta
- Ação
- Comédia
- Terror
- Romance
- Documentários  
*/
const api_key = process.env.REACT_APP_API_KEY
const base_url = process.env.REACT_APP_BASE_URL;

const fetchData = async (endpoint) => {
    const req = await fetch(`${base_url}${endpoint}`);
    const json = await req.json();
    return json;
}

const tmdb = {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await fetchData(`/discover/tv?with_network=213&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await fetchData(`/trending/all/week?language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await fetchData(`/movie/top_rated?language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await fetchData(`/discover/movie?with_genres=28&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await fetchData(`/discover/movie?with_genres=35&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await fetchData(`/discover/movie?with_genres=27&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await fetchData(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await fetchData(`/discover/movie?with_genres=99&language=pt-BR&api_key=${api_key}`)
            }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if(movieId) {
            switch(type){
                case 'movie':
                    info = await fetchData(`/movie/${movieId}?language=pt-BR&api_key=${api_key}`);
                break;
                case 'tv':
                    info = await fetchData(`/tv/${movieId}?language=pt-BR&api_key=${api_key}`);
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    } 
}

export default tmdb;