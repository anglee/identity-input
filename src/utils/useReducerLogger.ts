import { AnyAction } from 'redux';
import { useCallback } from 'react';

const useReducerLogger = <T>(reducer: (state: T, action: AnyAction) => T, prefix = ' ') => {
  // logger.groupCollapsed(`%c ${title}`, ...headerCSS)
  const reducerWithLogger = useCallback(
    (state, action) => {
      const next = reducer(state, action);
      const title = `action %c${action.type}`;
      const titleCSS = `color: #2F3942;`;
      // const headerCSS = ['color: gray; font-weight: lighter;'];
      const headerCSS = ['color: #CAA000; font-weight: lighter;'];
      headerCSS.push(titleCSS);

      /* eslint-disable no-console */
      // console.groupCollapsed(`${prefix}%c${title}`, ...headerCSS);
      console.group(`${prefix}%c${title}`, ...headerCSS);
      console.log('%cprev state', 'color: #9E9E9E; font-weight: 700;', state);
      console.log('%caction    ', 'color: #00A7F7; font-weight: 700;', action);
      console.log('%cnext State', 'color: #47B04B; font-weight: 700;', next);
      console.groupEnd();
      /* eslint-enable no-console */
      return next;
    },
    [reducer, prefix],
  );

  return reducerWithLogger;
};

export default useReducerLogger;
