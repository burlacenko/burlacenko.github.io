// this component will take care of the poster of the movie in the "upper part" with a special effects at the (destaque)

/* eslint-disable import/no-anonymous-default-export */

import React from "react";
import './FeaturedMovie.css';

// export default () => {
//     return (
//         <div>
//             FILME EM DESTAQUE
//         </div>
//     )
// }

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
    return result;
  }

// export default ({item}) => {
const Featured = ({item}) => {
    const { useState, useEffect } = React;
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