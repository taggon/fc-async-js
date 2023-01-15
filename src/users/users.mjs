/**
 * 서버에 사용자 정보를 요청하고 콘솔에 출력하는 함수
 * async/await을 사용하여 코드를 개선해보세요.
 */
import { request } from './mock-request.mjs';

export function getUsers() {
  for (let i = 0; i < 10; i++) {
    request('api/users/' + i).then((user) => console.log(user)).catch(err => console.error(err));
  }
}
