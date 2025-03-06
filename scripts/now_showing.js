console.log("Script started")

let sectionElm = document.createElement("section");
sectionElm.className = "nowshowing"

sectionElm.innerHTML = `
    <h2 class="nowshowing__title">Now showing</h2>
`

let nowShowingCards = document.createElement("div")
nowShowingCards.className = "nowshowing__cards"



function fetchNowShowing(page) {
    console.log("before fetch");
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA0YTkyYzIwMGNmY2YwOWY3NmY5ODJhZjZjYThmNCIsIm5iZiI6MTc0MDk4NjkzMy43MDUsInN1YiI6IjY3YzU1YTM1NmNhOTAzNWE2YTdhNmQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM27U_P6T9V1xVp1NnX-uIYw9gSZtd9JcuqtFNas79w'
        }
    })
        .then(response => {
            console.log("fetch respone received", response);

            return response.json()
        })
        .then(data => {
            console.log("Fetch data:", data)



            let nowShowingPromises = data.results.map(movie => {

                let cards = document.createElement("div")
                cards.classList.add("movie__card", "clickable-card")

                let imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                let movieTitle = movie.title
                let id = movie.id

                cards.innerHTML = `
            <div class="movie__img">
                <img src="img/placeholder.svg" data-imagesrc="${imgUrl}" alt="">
            </div>
            <a href="details.html?id=${id}">${movieTitle}</a>
            <p class="movie__rating"><i class="fa-solid fa-star"></i><span>${movie.vote_average}/10 IMDb</span></p>
                
            `

                nowShowingCards.append(cards)
            });

            Promise.all(nowShowingPromises).then(() => {
                let observedCard = nowShowingCards.querySelector(".movie__card:nth-last-child(5)")
                observer.observe(observedCard)

                let observedImgs = nowShowingCards.querySelectorAll(".nowshowing__cards .movie__img img")

                if (observedImgs) {
                    observedImgs.forEach(img => {
                        imageObserver.observe(img)
                    })
                }

                sectionElm.append(nowShowingCards)
            });


        })
        .catch(error => console.error("fetch error", error));

    console.log("after fetch");


    document.querySelector("main").append(sectionElm)

}

fetchNowShowing(currentPage)