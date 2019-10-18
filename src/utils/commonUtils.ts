// eslint-disable-next-line import/prefer-default-export
export const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
