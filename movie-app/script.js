// var APIKEY = "50f8784667cde4fe806a78ddc89a4242";
var APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

var IMGPATH = "https://image.tmdb.org/t/p/w1280";
var SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

var main = document.querySelector("main");
var form = document.querySelector("form");
var search = document.querySelector(".search");

getMovies(APIURL);

async function getMovies(url) {
  var response = await fetch(url);
  var responseData = await response.json();

  console.log(responseData);

  showMovies(responseData.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach(function loopEachMovie(movie) {
    var { overview, poster_path, title, vote_average, backdrop_path } = movie;

    var movieElement = document.createElement("div");

    movieElement.classList.add("movie");
    movieElement.innerHTML = `
        <img
        src="${poster_path ? IMGPATH + poster_path : IMGPATH + backdrop_path}"
        alt="${title}"
        />
        <div class="movie-info">
          <h2>${title}</h3>
          <span class="${getClassByRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h4>Overview:</h4>
        ${overview}
        </div>
    `;
    main.appendChild(movieElement);
  });
}

function getClassByRating(vote) {
  if (vote > 7) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();
  var searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
