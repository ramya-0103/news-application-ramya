const apiKey = '44c74f8c495e47bf9d596e0dd46c5604';
const newsContainer = document.getElementById('news-container');

// Using an alternative CORS proxy
const proxyUrl = 'https://api.allorigins.win/get?url=';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        const data = await response.json();
        
        const jsonData = JSON.parse(data.contents); // Parse the JSON from the response
        
        if (jsonData.status === "ok") {
            displayNews(jsonData.articles);
        } else {
            newsContainer.innerHTML = `<p>Error fetching news: ${jsonData.message}</p>`;
        }
    } catch (error) {
        newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = articles.map(article => `
        <div class="news-item">
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News image">` : ''}
            <div>
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        </div>
    `).join('');
}

fetchNews();
