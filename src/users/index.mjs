import { getUsers } from './users.mjs';
import { getUsers as getUsersCompleted } from './users.completed.mjs';

if (typeof document === 'undefined') {
  getUsers();
} else {
  // DOM 이벤트 핸들러에 비동기 코드를 추가해도 괜찮습니다.
  document.querySelector('#btn').addEventListener('click', getUsersCompleted, false);
}
