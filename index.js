const API_KEY = '0fc970f1-e3c6-4e9f-9b6f-51c200e60c9c'
const API_URL_TOP_250_BEST_FILMS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
const SEARCH_KEYWORD = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
console.log(URL);
getMovies(API_URL_TOP_250_BEST_FILMS)
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },

    })
    const respData = await resp.json()
    showMovies(respData);
}
function getClassByRate(vote) {
    if(vote>=7){
        return 'green'
    }else if (vote>5){
        return 'orange'
    }else return 'red'
}
function showMovies(data) {
    const moviesEl = document.querySelector('.movies')
    moviesEl.innerHTML=''
    data.films.forEach(movie => {
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
    <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}">
        <div class="movie__cover--darkened"></div>
    </div>
    <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(item=>` ${item.genre}`)}</div>
        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
    </div>
        `
    moviesEl.appendChild(movieEl)

    })

}

const form = document.querySelector('form')
const search = document.querySelector('.header__search')
form.addEventListener('submit', (event)=>{
event.preventDefault()
const apiSearchUrl = `${SEARCH_KEYWORD}${search.value}`
if(search.value){
    getMovies(apiSearchUrl)
}
})
