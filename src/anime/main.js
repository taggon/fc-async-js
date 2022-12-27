const results = document.querySelector('#results');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const query = event.target.query.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=1&limit=10`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      results.innerHTML = '';
      result.data?.forEach(anime => {
        const tpl = document.querySelector('template');
        const card = tpl.content.cloneNode(true);
        const img = (anime.images.webp ?? anime.images.jpg).image_url;

        card.querySelector('h2').innerText = anime.title;
        card.querySelector('img').src = img;
        card.querySelector('p').innerText = anime.synopsis ?? 'No synopsis';

        results.appendChild(card);
      });
    })
    .catch(err => console.err(err));
}, false);
