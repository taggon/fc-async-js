/**
 * 애니메이션 검색
 *
 * 검색어를 입력하면 해당 검색어와 일치하는 애니메이션 목록을 화면에 표시하는 함수를 작성하세요.
 * 사용할 API는 아래에 주어져 있습니다.
 *
 * #result-wrapper에 .loading 또는 .empty 클래스를 추가하면 로딩 애니메이션 또는 빈 화면을 표시할 수 있습니다.
 *
 * #card에 있는 템플릿을 사용하여 결과를 표시하세요.
 *
 * 사용할 API:
 * - url: `https://api.jikan.moe/v4/anime?q=${query}&page=1&limit=10`
 * - query: 검색어
 *
 * API 문서: https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
 */

const wrapper = document.querySelector('#result-wrapper');
const results = document.querySelector('#results');
const tpl = document.querySelector('#card');
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.elements.query.value;
  let data = [];

  // 기존 결과는 삭제합니다.
  results.innerHTML = '';

  // 로딩 애니메이션을 표시합니다.
  wrapper.classList.add('loading');
  wrapper.classList.remove('empty');

  try {
    const resp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw=true&page=1&limit=10`);
    const result = await resp.json();

    data = result.data;

    if (data.length === 0) {
      wrapper.classList.add('empty');
      return;
    }
  } catch (err) {
    console.error(`데이터를 가져오는 도중 에러가 발생했습니다: ${err}`);
    return;
  } finally {
    // 로딩 애니메이션을 제거합니다.
    wrapper.classList.remove('loading');
  }

  data.forEach(render);
}, false);

function render(item) {
  const tpl = template.content.cloneNode(true);

  tpl.querySelector('img').src = item.images.jpg.image_url;
  tpl.querySelector('.card-title').innerText = item.title;
  tpl.querySelector('.desc').innerText = item.synopsis;

  results.appendChild(tpl);
}
