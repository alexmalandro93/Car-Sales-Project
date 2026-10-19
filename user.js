  const postListEl = document.querySelector(`.post-list`);
  const id = localStorage.getItem("id");

  async function onSearchChange(movies) {
    const id = movies.target.value;
    renderPosts(movies)
  }
  
  
function postHTML(post) {
  `<div class="filtration">
      <select>
        <option value="all">All</option>
        <option value="action">A-Z</option>
        <option value="comedy">Z-A</option>
        <option value="drama">Year</option>
      </select>
    </div>`
}