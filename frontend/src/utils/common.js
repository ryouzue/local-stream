const logtype = {
  0: 'DEBUG',
  1: 'INFO',
  2: 'WARNING',
  3: 'ERROR',
  4: 'SUCCESS',
  5: 'PASS'
}

const time = () => `[${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}::${String(new Date().getMilliseconds()).padStart(3, '0')}]`;
const log = (type, obj) => console.log(time(), logtype[type], '::', obj);

export { 
  time,
  log
};
