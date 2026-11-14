"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const whole = (n) => Math.round(n).toLocaleString("en-US");

// Counts up when scrolled into view and again whenever `value` changes.
export default function CountUp({ value = 0, format = whole, duration = 1.1, className }) {
  const ref = useRef(null);
  const from = useRef(0);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(value);
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        from.current = v;
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [value, inView, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} className={className}>{format(0)}</span>;
}
