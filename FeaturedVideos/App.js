// import React, { useEffect, useState } from 'react';
// import 'react';
// import 'App.css';
// import 'Tmdb.js';
// import 'Featured.js';
// import 'Featured.css';

var isLoading = true;

function listGenres (genresList) {
    //debugger;
    let result = '';

    for (let i = 0; i < genresList.length; i++) {
      const element = genresList[i];
      result = result + element.name;
      if(i < genresList.length-1) {
        result = result + ', ';
      };
    }

    console.log('listGenres:');
    console.log(result);
    return result;
  }

const Featured = ({item}) => {
    const { useState, useEffect } = React;

    console.log('item:');
    console.log(item);
    
    let firstDate = new Date(item.first_air_date);

    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    // description will be used to check and limit description (item.overview)
    let description = item.overview;
    if (description.length > 200) {
        description = description.substring(0, 300) + '...';
    }
    
    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                {/* to add the second effect which is the gradient from left to right we need a second "div" which we will call featured--horizontal*/}
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div> {/* take care of plural */}
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a> {/* a href instead of button! */}
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minhas Lista</a>

                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                    {/* <div className="featured--genres"><strong>Gêneros: </strong>{listGenres(item.genres)}</div> */}
                </div>
            </div>
        </section>
    )
}

function App () {
  const { useState, useEffect } = React;
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect( () => {
    const loadAll = async () => {
      // get entire list
    //   let list = await Tmdb.getHomeList();
      let list = await getHomeList();
      console.log(list);
      setMovieList(list);

      // get featured movie
      //
      // we chose to pick randomly from the netflix originals
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); // generating a random from 0 to max index (that is why we subtract one from length)
      let chosen = originals[0].items.results[randomChosen];
      // get more info on the featured movie using its id
    //   let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv'); // we know that all netflix originals are of type "tv"
      let chosenInfo = await getMovieInfo(chosen.id, 'tv'); // we know that all netflix originals are of type "tv"
      setFeaturedData(chosenInfo);

      // testing fetched data of featured (that we chose randomly from netflix series)
      console.log('Destaque: ' + chosen.name);
      console.log(chosen);
      // testing Extra data for the featured
      // NOTE: seasons.length many fool us because "specials" will be one item of the array!
      //       So, to get the real number of season we must use property "number_of_seasons"
      console.log('Seasons: ' + chosenInfo.seasons.length);
      console.log('Last Air Episode Date: ' + chosenInfo.last_air_date);
      console.log('qtd Genres: ' + chosenInfo.genres.length);
      //debugger;
      console.log('Genres: ' + listGenres(chosenInfo.genres));
      console.log(chosenInfo);
      
      // testing fetched data
      // let testOneSpecific = await Tmdb.getMovieInfo(1434, 'tv'); // Family Guy
      // console.log('Name: ' + testOneSpecific.name);
      // console.log('Original Name: ' + testOneSpecific.original_name);
      // // NOTE: seasons.length many fool us because "specials" will be one item of the array!
      // //       So, to get the real number of season we must use property "number_of_seasons"
      // console.log('Seasons: ' + testOneSpecific.seasons[0].name);
      // console.log('Seasons: ' + testOneSpecific.seasons.length); // seasons.length many fool us because "specials" will be one item of the array!
      // console.log('Seasons: ' + testOneSpecific.number_of_seasons);
      // console.log('Episodes: ' + testOneSpecific.number_of_episodes);
      // console.log('Last Air Episode Date: ' + testOneSpecific.last_air_date);
      // console.log('qtd Genres: ' + testOneSpecific.genres.length);
      // //debugger;
      // console.log('Genres: ' + listGenres(testOneSpecific.genres));
      // console.log(testOneSpecific);
    }
    
    //debugger;
    loadAll();

  }, []);

  return (
    <>
    {/* <div>
      Olá Mundo!
    </div> */}
    <div className="page">
        {/* FeaturedMovie (Destaque)*/}
        {/* by using "FeaturedMovie &&" here and initializing above with "useState(null)" we make sure it will only be "show" after being fetched aka exists */}
        {featuredData &&
          <Featured item={featuredData}/>
        } 

        {/* Rodapé */}
        <footer>
           The Featured Videos as Fetch and Render Coding Challenge Exercise |
           Dada from Themoviedb.org
        </footer>   

         {/* here we set a "loading" animation while the user is waiting for the content to obe fetched from internet */}
         {!isLoading &&
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
          </div>
         }

      </div>
    </>    
  );
}

ReactDOM.render(<App />, document.getElementById("root"));