const apiKey = "fcbdb947bf934dd2b368c8957646231f"; 
const newsContainer = document.getElementById("news-container");

// Fetch Top Headlines on Load
window.onload = () => {
  fetchNews("top-headlines?country=us");
};

// Fetch News
function fetchNews(endpoint) {
  fetch(`https://newsapi.org/v2/${endpoint}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => displayNews(data.articles))
    .catch(error => console.error("Error fetching news:", error));
}

// Display News
function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p>No news found.</p>";
    return;
  }
  articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
      <h2>${article.title}</h2>
      <p>${article.description || ''}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;
    newsContainer.appendChild(card);
  });
}

// Search News
function searchNews() {
  const query = document.getElementById("search").value;
  if (query) {
    fetchNews(`everything?q=${query}`);
  } else {
    fetchNews("top-headlines?country=in");
  }
}
