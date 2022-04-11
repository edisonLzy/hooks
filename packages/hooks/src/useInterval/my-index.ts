import { useRef, useEffect } from 'react';
export default function useInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const fn_ref = useRef(fn);
  fn_ref.current = fn;
  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;
    if (options?.immediate) {
      fn_ref.current();
    }
    const timer = setInterval(() => {
      fn_ref.current();
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}
