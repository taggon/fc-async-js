/**
 * 서버에 사용자 정보를 요청하고 콘솔에 출력하는 함수
 * async/await을 사용하여 코드를 개선해보세요.
 */
import { request } from './mock-request.mjs';

export async function getUsers() {
  for (let i = 0; i < 10; i++) {
    // 디버깅이 쉽지 않은 비동기 동작의 특성상, 가능한 한 에러를 감지하는 범위를 좁게 가져가는 것이 좋습니다.
    try {
      const user = await request('api/users/' + i);
      console.log(user);
    } catch(err) {
      console.error(err);
    }
  }
}
