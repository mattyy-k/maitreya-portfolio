"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { detectRenderTier, type Capabilities } from "@/lib/render-tier";

const CapabilityContext = createContext<Capabilities>({ tier: 0, reducedMotion: false, canvas2d: false, webgl: false, coarsePointer: false });
const defaultCapabilities: Capabilities = { tier: 0, reducedMotion: false, canvas2d: false, webgl: false, coarsePointer: false };

export function CapabilityProvider({ children }: { children: ReactNode }) {
  const [capabilities, setCapabilities] = useState<Capabilities>(defaultCapabilities);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = document.createElement("canvas");
    const canvas2d = Boolean(canvas.getContext("2d"));
    const webgl = Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    const update = () => {
      const reducedMotion = motionQuery.matches;
      setCapabilities({
        tier: detectRenderTier(reducedMotion, webgl, canvas2d),
        reducedMotion,
        canvas2d,
        webgl,
        coarsePointer: window.matchMedia("(pointer: coarse)").matches,
      });
    };
    update();
    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  return <CapabilityContext.Provider value={capabilities}>{children}</CapabilityContext.Provider>;
}

export function useCapabilities() {
  return useContext(CapabilityContext);
}

type ScrollState = { y: number; progress: number };
const ScrollContext = createContext<ScrollState>({ y: 0, progress: 0 });

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const [scroll, setScroll] = useState<ScrollState>({ y: 0, progress: 0 });
  const frame = useRef<number | null>(null);
  const latestY = useRef(0);

  useEffect(() => {
    const process = () => {
      frame.current = null;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setScroll({ y: latestY.current, progress: maximum > 0 ? latestY.current / maximum : 0 });
    };
    const onScroll = () => {
      latestY.current = window.scrollY;
      if (frame.current === null) frame.current = window.requestAnimationFrame(process);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    process();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return <ScrollContext.Provider value={scroll}>{children}</ScrollContext.Provider>;
}

export function useScrollProgress() {
  return useContext(ScrollContext);
}

export function PerformanceInstrumentation() {
  useEffect(() => {
    performance.mark("portfolio-shell-mounted");
    performance.measure("portfolio-shell", "navigationStart", "portfolio-shell-mounted");
    return () => performance.clearMarks("portfolio-shell-mounted");
  }, []);
  return null;
}