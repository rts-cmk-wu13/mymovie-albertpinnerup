let popularSectionElm = document.createElement("section");
popularSectionElm.className = "popular"

popularSectionElm.innerHTML = `
    <h2 class="popular__title">Popular</h2>
`

let options = {
    threshold: 1.0,
}


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentPage++
            fetchMovies(currentPage)
        }
    })
}, options)

const imageObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.imagesrc

            imageObserver.unobserve(entry.target)
        }
    })
})

let currentPage = 1


function fetchMovies(page) {

    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA0YTkyYzIwMGNmY2YwOWY3NmY5ODJhZjZjYThmNCIsIm5iZiI6MTc0MDk4NjkzMy43MDUsInN1YiI6IjY3YzU1YTM1NmNhOTAzNWE2YTdhNmQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM27U_P6T9V1xVp1NnX-uIYw9gSZtd9JcuqtFNas79w'
        }
    })
        .then(response => response.json())
        .then(data => {

            let popularCards = document.createElement("div")
            popularCards.className = "popular__cards"

            let moviePromises = data.results.map(movie => {

                let id = movie.id

                return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US?`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA0YTkyYzIwMGNmY2YwOWY3NmY5ODJhZjZjYThmNCIsIm5iZiI6MTc0MDk4NjkzMy43MDUsInN1YiI6IjY3YzU1YTM1NmNhOTAzNWE2YTdhNmQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM27U_P6T9V1xVp1NnX-uIYw9gSZtd9JcuqtFNas79w'
                    }
                })
                    .then(response => response.json())
                    .then(movieData => {

                        let cards = document.createElement("div")
                        cards.classList.add("movie__card")

                        let imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        let movieTitle = movie.title
                        let genres = movieData.genres.map(genre => `<span class="movie__genre">${genre.name}</span>`).join("");
                        let runTime = timeConvert(movieData.runtime)

                       
                        cards.innerHTML = `
                        <a href="details.html?id=${id}" class="movie__img">
                            <img src="img/placeholder.svg" data-imagesrc="${imgUrl}" alt="">
                        </a>
                        <div class="movie__info">
                        <a href="details.html?id=${id}" class="movie__title">${movieTitle}</a>
                        <p class="movie__rating"><i class="fa-solid fa-star"></i><span>${movie.vote_average}/10 IMDb</span></p>
                        <div class="movie__genres">${genres}</div>
                        <p class="movie__runtime"><i class="fa-regular fa-clock"></i> <span>${runTime}</span></p>
                        </div> 
                        `

                        popularCards.append(cards)

                        
                        
                    })
                    
            })

            Promise.all(moviePromises).then(() => {
                let observedCard = popularCards.querySelector(".movie__card:nth-last-child(5)")
                observer.observe(observedCard)

                let observedImgs = popularCards.querySelectorAll(".popular__cards .movie__img img")

                if (observedImgs) {
                    observedImgs.forEach(img => {
                        imageObserver.observe(img)
                    })
                }

                popularSectionElm.append(popularCards)
            });    
        });

    document.querySelector("main").append(popularSectionElm)

}

fetchMovies(currentPage)
