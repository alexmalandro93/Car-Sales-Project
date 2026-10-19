// http://www.omdbapi.com/?i=tt3896198&apikey=a72428fc
// http://www.omdbapi.com/apikey.aspx
// VERIFYKEY=5b216c90-1976-4ae2-bb07-ae04c8f2866c

const searchTerm = document.getElementById("search");
// console.log()

async function searchMovies() {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchTerm.value || "batman"}&apikey=a72428fc`,
  );
  const data = await response.json();
  console.log(data.Search);
  document.getElementById("movies").innerHTML = data.Search.map((movie) =>
    renderSingleMovie(movie),
  ).join("");
}

searchMovies();

document.getElementById("search-btn").addEventListener("click", searchMovies);

function renderSingleMovie(movie) {
  return `<div class="card">
  <img src="${movie.Poster}">
  <p>${movie.Title}</p>
  <span>${movie.Year}</span>
  </div>`;
}

function filterMovies () {
  if (filter === "OLDEST") {
    filteredMovies.sort((a, b) =>
      parseInt(a.Year) - parseInt(b.Year)
    );
  }

  else if (filter === "A_Z") {
    filteredMovies.sort((a, b) =>
      a.Title.localeCompare(b.Title)
    );
  }

  else if (filter === "Z_A") {
    filteredMovies.sort((a, b) =>
      b.Title.localeCompare(a.Title)
    );
  }
}

  renderMovies(filteredMovies);
