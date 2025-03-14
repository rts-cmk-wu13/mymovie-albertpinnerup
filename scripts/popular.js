let popularSectionElm = document.createElement("section");
popularSectionElm.className = "popular"

popularSectionElm.innerHTML = `
    <h2 class="popular__title">Popular</h2>
`





let genreCache = null;
fetch("data/genres.json")
    .then(response => response.json())
    .then(data => {
        genreCache = data.genres;
        fetchMovies(currentPage)
    });
        


function fetchMovies(page) {

    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA0YTkyYzIwMGNmY2YwOWY3NmY5ODJhZjZjYThmNCIsIm5iZiI6MTc0MDk4NjkzMy43MDUsInN1YiI6IjY3YzU1YTM1NmNhOTAzNWE2YTdhNmQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM27U_P6T9V1xVp1NnX-uIYw9gSZtd9JcuqtFNas79w'
        }
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
            


            let popularCards = document.createElement("div")
            popularCards.className = "popular__cards"

            let moviePromises = data.results.map(movie => {

                let id = movie.id

                let cards = document.createElement("div")
                cards.classList.add("movie__card")

                let imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                let movieTitle = movie.title

                let genreNames = movie.genre_ids.map(genreId => {
                        const genre = genreCache.find(g => g.id === genreId);
                        return genre ? `<span class="movie__genre">${genre.name}</span>` : '';
                    })
                    .join("");


                cards.innerHTML += `
                        <a href="details.html?id=${id}" class="movie__img">
                            <img src="img/placeholder.svg" data-imagesrc="${imgUrl}" alt="">
                        </a>
                        <div class="movie__info">
                        <a href="details.html?id=${id}" class="movie__title">${movieTitle}</a>
                        <p class="movie__rating"><i class="fa-solid fa-star"></i><span>${movie.vote_average}/10 IMDb</span></p>
                        <div class="movie__genres">${genreNames}</div>
                        </div> 
                        `

                popularCards.append(cards)

            })

            
                let observedCard = popularCards.querySelector(".movie__card:nth-last-child(5)")
                PopularObserver.observe(observedCard)

                let observedImgs = popularCards.querySelectorAll(".popular__cards .movie__img img")

                if (observedImgs) {
                    observedImgs.forEach(img => {
                        imageObserver.observe(img)
                    })
                }

                popularSectionElm.append(popularCards)
           
        });

    document.querySelector("main").append(popularSectionElm)

}


