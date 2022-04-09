import { useRef, useState, useCallback, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
type UseRafState = typeof useState;

const useRafState: UseRafState = <S>(initialState?: S | (() => S)): ReturnType<UseRafState> => {
  const [state, setState] = useState(initialState);
  const timer = useRef(0);
  const setStateInRaf = useCallback<Dispatch<SetStateAction<S>>>((s: S | ((pre: S) => S)) => {
    cancelAnimationFrame(timer.current);
    timer.current = requestAnimationFrame(() => {
      setState(s);
    });
  }, []);

  useEffect(() => {
    cancelAnimationFrame(timer.current);
  }, []);

  return [state, setStateInRaf];
};

export default useRafState;
