import { request } from './mock-request.mjs';

export function getUsers() {
  for (let i = 0; i < 10; i++) {
    request('api/users/' + i).then((user) => console.log(user)).catch(err => console.error(err));
  }
}
