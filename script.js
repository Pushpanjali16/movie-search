let key = "b1eab4c429d7178da745c839d0789a12";
let movieContainer = document.querySelector(".movie-container");
let inputMovie = document.getElementById("input");


function createCardMovie(movie) {
    if (!movie || !movie.poster_path || !movie.title || !movie.release_date || !movie.runtime) {
        console.log("Movie data is missing or invalid:", movie);
        return null;
    }

    let mainDiv = document.createElement("div");
    mainDiv.classList.add("movie-card");

    mainDiv.innerHTML = `
    <div class="img">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="title">${movie.title}</div>
    <div class="release-date">${movie.release_date}</div>
    <div class="runtime">${movie.runtime} minutes</div>
    <button id="submit" onclick="openMenu()" style="background-color: green; color: white;">SEE MORE</button>   
`;
    return mainDiv;
}



inputMovie.addEventListener("keyup", function () {
    let inputValue = inputMovie.value.toLowerCase();
    console.log(inputValue);

    let allMovies = document.querySelectorAll('.movie-card');
    allMovies.forEach(function (mainDiv) {
        let movieName = mainDiv.querySelector(".title").textContent.toLowerCase();
        if (movieName.startsWith(inputValue)) {
            mainDiv.style.display = "block";
        } else {
            mainDiv.style.display = "none";
        }
    });
});


async function fetchData(movieId) {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`);
        let data = await response.json();
        console.log("Fetched movie data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function fetchNmovie() {
    for (let i = 1; i <= 200; i++) {
        let movie = await fetchData(i);
        if (movie) {
            let cardMovie = createCardMovie(movie);
            if (cardMovie) {
                movieContainer.appendChild(cardMovie);
            }
        } else {
            console.log(`Movie with ID ${i} is undefined.`);
        }
    }
}

fetchNmovie();




