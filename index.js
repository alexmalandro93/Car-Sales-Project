// http://www.omdbapi.com/?i=tt3896198&apikey=a72428fc
// http://www.omdbapi.com/apikey.aspx
// VERIFYKEY=5b216c90-1976-4ae2-bb07-ae04c8f2866c


const searchTerm = document.getElementById("search");
const moviesContainer = document.getElementById("movies");
const searchBtn = document.getElementById("search-btn");
const filterSelect = document.querySelector(".filtration select");

let movies = [];

// FETCH MOVIES FROM API
async function searchMovies() {
  const search = searchTerm.value.trim() || "batman";

  moviesContainer.innerHTML = "<p>Loading movies...</p>";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=a72428fc`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    if (data.Response === "False") {
      movies = [];
      moviesContainer.textContent =
        data.Error || "No movies found.";
      return;
    }

    movies = data.Search || [];

    filterMovies();

  } catch (error) {
    console.error("Error fetching movies:", error);
    moviesContainer.textContent =
      "Something went wrong. Please try again.";
  }
}

// DISPLAY MOVIES
function renderMovies(movieList) {
  moviesContainer.innerHTML = movieList
    .map(movie => renderSingleMovie(movie))
    .join("");
}

// RENDER SINGLE MOVIE
function renderSingleMovie(movie) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "./placeholder.jpg";

  return `
    <div class="card">
      <img
        src="${poster}"
        alt="${movie.Title}"
        loading="lazy"
      />

      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    </div>
  `;
}

// FILTER / SORT MOVIES
function filterMovies() {
  const filter = filterSelect.value;

  let filteredMovies = [...movies];

  if (filter === "NEWEST") {
    filteredMovies.sort(
      (a, b) => parseInt(b.Year) - parseInt(a.Year)
    );
  }

  else if (filter === "OLDEST") {
    filteredMovies.sort(
      (a, b) => parseInt(a.Year) - parseInt(b.Year)
    );
  }

  else if (filter === "A_Z") {
    filteredMovies.sort(
      (a, b) => a.Title.localeCompare(b.Title)
    );
  }

  else if (filter === "Z_A") {
    filteredMovies.sort(
      (a, b) => b.Title.localeCompare(a.Title)
    );
  }

  renderMovies(filteredMovies);
}

// EVENT LISTENERS
searchBtn.addEventListener("click", searchMovies);

searchTerm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});

filterSelect.addEventListener("change", filterMovies);

// LOAD DEFAULT MOVIES
searchMovies();