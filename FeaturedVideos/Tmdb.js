/* eslint-disable import/no-anonymous-default-export */
const API_KEY = '93b0c71a50c19f04ce40246b33c8bbba';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais da netflix (originals)
- recomendados (destaques do momento, trending)
- em alta (melhores votados, toprated)
- ação
- comédia
- romance
- terror
- documentários
*/

const basicFetch = async (endpoint) => {
        const req = await fetch(`${API_BASE}${endpoint}`);
        const json = await req.json();
        return json;
};

const getHomeList = async () => {
        console.log('getHomeList');
    
        return [
            {
                slug: 'family',
                title: 'Para a Família',
                // items: await basicFetch(`/discover/movie?with_genres=10751&language=pt-BR&api_key=${API_KEY}`)
                items: await basicFetch(`/discover/movie?with_genres=10751&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                // items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`) // filtramos apenas da netflix
                items: await basicFetch(`/discover/tv?with_network=213&language=en&api_key=${API_KEY}`) // filtramos apenas da netflix
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                // items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
                items: await basicFetch(`/trending/all/week?language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'top_rated',
                title: 'Em Alta',
                // items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
                items: await basicFetch(`/movie/top_rated?language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                // items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
                items: await basicFetch(`/discover/movie?with_genres=28&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                // items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
                items: await basicFetch(`/discover/movie?with_genres=35&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                // items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
                items: await basicFetch(`/discover/movie?with_genres=27&language=en&api_key=${API_KEY}`)
            },
            // {
            //     slug: 'romance',
            //     title: 'Romance',
            ////    items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            //     items: await basicFetch(`/discover/movie?with_genres=10749&language=en&api_key=${API_KEY}`)
            // },
            {
                slug: 'documentary',
                title: 'Documentários',
                // items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
                items: await basicFetch(`/discover/movie?with_genres=99&language=en&api_key=${API_KEY}`)
            }
        ];
};

const getMovieInfo = async (movieId, type) => {
            console.log('getMovieInfo');        
            let info = {};

            if (movieId) {
                switch (type) {
                    case 'movie':
                        // info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                        info = await basicFetch(`/movie/${movieId}?language=en&api_key=${API_KEY}`);
                        break;
                    case 'tv':
                        // info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                        info = await basicFetch(`/tv/${movieId}?language=en&api_key=${API_KEY}`);
                        break;
                    default:
                        info = {};
                        break;
                }
            }

            return info;
};



