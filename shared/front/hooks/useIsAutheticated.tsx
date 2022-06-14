import { useState, useEffect } from 'react';

import { watchState, getState } from '../state';

export default function useIsAutheticated() {
  const [isAutheticated, setIsAutheticated] = useState<boolean>(() => !!getState().authToken);

  useEffect(() => {
    return watchState(state => {
      setIsAutheticated(!!state?.authToken);
    });
  }, []);

  return isAutheticated;
}
