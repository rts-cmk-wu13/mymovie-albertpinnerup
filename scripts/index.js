let sectionElm = document.createElement("section");
sectionElm.className = "nowshowing"

sectionElm.innerHTML = `
    <h2 class="nowshowing__title">Now showing</h2>
`

fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1?append_to_response=genres", {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA0YTkyYzIwMGNmY2YwOWY3NmY5ODJhZjZjYThmNCIsIm5iZiI6MTc0MDk4NjkzMy43MDUsInN1YiI6IjY3YzU1YTM1NmNhOTAzNWE2YTdhNmQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM27U_P6T9V1xVp1NnX-uIYw9gSZtd9JcuqtFNas79w'
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let nowShowingCards = document.createElement("div")
        nowShowingCards.className = "nowshowing__cards"
        
        data.results.map(movie => {
            
            let cards = document.createElement("div")
            cards.classList.add("movie__card", "clickable-card")

            let imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            let movieTitle = movie.title
            let id = movie.id
            
            cards.innerHTML = `
            <div class="movie__img">
                <img src="${imgUrl}" alt="">
            </div>
            <a href="details.html?id=${id}">${movieTitle}</a>
            <p><i class="fa-solid fa-star"></i><span>${movie.vote_average}</span></p>
                
            `

            nowShowingCards.append(cards)
        })

        sectionElm.append(nowShowingCards)
    })

    document.querySelector("main").append(sectionElm)