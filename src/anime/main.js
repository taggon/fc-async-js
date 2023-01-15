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
 * - url: `https://api.jikan.moe/v4/anime?q=${query}&sfw=true&page=1&limit=10`
 * - query: 검색어
 *
 * API 문서: https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
 */

const wrapper = document.querySelector('#result-wrapper');
const results = document.querySelector('#results');
const template = document.querySelector('#card');
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // TODO
}, false);
