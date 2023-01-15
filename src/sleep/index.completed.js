/**
 * setTimeout 대신 사용할 Promise 기반의 sleep 함수
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
