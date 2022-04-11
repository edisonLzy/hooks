import { useEffect, useRef } from 'react';

interface Handle {
  id: number | NodeJS.Timer;
}

type Options = {
  immediate: boolean;
};
type Cb = (...args: any[]) => void;
function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined;
}
const clearRafInterval = function (handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearInterval(handle.id);
  }
  cancelAnimationFrame(handle.id);
};

function setRafInterval(fn: Cb, delay: number) {
  if (typeof requestAnimationFrame === 'undefined') {
    return {
      id: setInterval(fn, delay),
    };
  }
  let pre_time = Date.now();
  const handle: Handle = {
    id: 0,
  };
  const loop = () => {
    const current_time = Date.now();
    if (current_time - pre_time >= delay) {
      fn();
      pre_time = current_time;
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
}
export default function useRafInterval(fn: Cb, delay?: number, options?: Options) {
  const fn_ref = useRef(fn);

  useEffect(() => {
    if (typeof delay === 'undefined' || delay < 0) return;
    if (options?.immediate) {
      fn_ref.current();
    }
    const timer = setRafInterval(() => {
      fn_ref.current();
    }, delay);
    return () => {
      clearRafInterval(timer);
    };
  }, [delay]);
}
