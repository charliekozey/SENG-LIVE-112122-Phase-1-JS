const resultsDiv = document.querySelector('#results');
document.addEventListener('DOMContentLoaded', () => {
  const apiSearchForm = document.querySelector('#api-Search');
  
  apiSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = encodeURI(e.target.search.value);
    console.log(query);
    resultsDiv.innerHTML = "";
    // fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`)
    //   .then(response => response.json())
    //   .then(show => {
        
    
    //     console.log(show);
    //     debugger
    //     const resultDiv = document.createElement('div');

    //     const h3 = document.createElement('h3');
    //     h3.textContent = show.name;
    //     resultDiv.append(h3);

    //     if (show.image) {
    //       const img = document.createElement('img');
    //       img.src = show.image.medium;
    //       resultDiv.append(img);
    //     } else {
    //       const noImageP = document.createElement('p');
    //       noImageP.textContent = "No image available";
    //       resultDiv.append(noImageP);
    //     }

    //     resultsDiv.append(resultDiv);

    //     show._embedded.episodes.forEach(episode => {
    //       const episodeDiv = document.createElement('div');

    //       const h3 = document.createElement('h3');
    //       h3.textContent = `S${episode.season} E${episode.number}. ${episode.name}`;
    //       episodeDiv.append(h3);

    //       if (episode.image) {
    //         const img = document.createElement('img');
    //         img.src = episode.image.medium;
    //         episodeDiv.append(img);
    //       } else {
    //         const noImageP = document.createElement('p');
    //         noImageP.textContent = "No image available";
    //         episodeDiv.append(noImageP);
    //       }

    //       const summaryDiv = document.createElement('div');
    //       summaryDiv.innerHTML = episode.summary;
    //       episodeDiv.append(summaryDiv);

    //       resultsDiv.append(episodeDiv);
    //     })
        
    //   })
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=40`)
      .then(response => response.json())
      .then(data => {
        data.items.forEach(item => {
          const resultDiv = document.createElement('div');
  
          const h3 = document.createElement('h3');
          h3.textContent = item.volumeInfo.title;
          resultDiv.append(h3);
  
          if (item.volumeInfo.imageLinks) {
            const img = document.createElement('img');
            img.src = item.volumeInfo.imageLinks.thumbnail;
            resultDiv.append(img);
          } else {
            const noImageP = document.createElement('p');
            noImageP.textContent = "No image available";
            resultDiv.append(noImageP);
          }

          const summaryDiv = document.createElement('div');
          summaryDiv.textContent = item.volumeInfo.description || "Description not found";
          resultDiv.append(summaryDiv);
  
          resultsDiv.append(resultDiv);
        })
      })
  })
})