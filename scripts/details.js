let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

let detailsId = urlParams.get('id');
console.log(detailsId);




let detailsElm = document.createElement("section");
detailsElm.className = "details__info";

let overviewElm = document.createElement("section")
overviewElm.className = 'details__overview'

let castElm = document.createElement("section")
castElm.className = "details__cast"

document.querySelector("main").append(detailsElm, overviewElm, castElm);


let detailsHeader = document.querySelector("header");




let ratingCache;

function fetchDetails(movieId) {
    // Fetch the movie details
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=release_dates,credits`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA0YTkyYzIwMGNmY2YwOWY3NmY5ODJhZjZjYThmNCIsIm5iZiI6MTc0MDk4NjkzMy43MDUsInN1YiI6IjY3YzU1YTM1NmNhOTAzNWE2YTdhNmQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM27U_P6T9V1xVp1NnX-uIYw9gSZtd9JcuqtFNas79w'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // HEADER

            let imgUrl = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
            let imgDiv = document.createElement("div");
            imgDiv.className = "details__img";

            let img = document.createElement("img");
            img.src = imgUrl;

            imgDiv.appendChild(img);
            detailsHeader.appendChild(imgDiv);

            // HEADER END


            // DETAILS

            let genreNames = data.genres.map(genre => {

                if (genre) {
                    return `<span class="movie__genre">${genre.name}</span>`;
                } else {
                    return ''
                };

            }).join('');


            function findRating(countryCode) {
                const country = data.release_dates.results.find(country => country.iso_3166_1 === countryCode);

                let rating = 'N/A'

                if (country) {
                    country.release_dates.forEach(release => {
                        if (release.certification) {
                            rating = release.certification;
                        };
                    });
                };

                return rating;
            };

            ratingCache = findRating('US')

            detailsElm.innerHTML = `
            <h1 class="details__title">${data.title}</h1>
            <div class="movie__info">
                <p class="movie__rating"><i class="fa-solid fa-star"></i><span>${data.vote_average}/10 IMDb</span></p>
                <div class="movie__genres">${genreNames}</div>
                <div class="movie__more-info">
                    <div class="more-info__box"><span>Length</span><p>${timeConvert(data.runtime)}</p></div>
                    <div class="more-info__box"><span>Language</span><p>${data.spoken_languages[0].english_name}</p></div>
                    <div class="more-info__box"><span>Rating</span><p>${ratingCache}</p></div>
                </div>
            </div>
        `;

            // DETAILS END


            // DESCRIPTION

            overviewElm.innerHTML = ` 
            <h2>Description</h2>
            <p>${data.overview}</p>
        `

            // DESRIPTION END


            // CAST

            function castSection() {

                if (data.credits.cast && data.credits.cast.length > 0) {
                    castElm.innerHTML = `
                    <h2>Cast</h2>
                `;

                    let castCards = document.createElement("div");
                    castCards.className = "cast__cards";


                    data.credits.cast.map(actor => {

                        let cardContent = ''

                        if (actor.profile_path && actor.profile_path.trim() !== "") {
                            let castCard = document.createElement("div");
                            castCard.className = "details__cast-card"
                            let actorUrl = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

                            cardContent += `
                            <div class="cast__img">
                                <img src="${actorUrl}" alt="">
                            </div>
                            <p>${actor.name}</p>
                            
                        `

                            castCard.innerHTML = cardContent
                            castCards.append(castCard)
                        }
                    }).join('');


                    castElm.appendChild(castCards);


                };
            };

            castSection();

            // CAST END

        });
};



fetchDetails(detailsId);



