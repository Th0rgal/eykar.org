import styles from '../../styles/Map.module.css'
import React, { useRef, useEffect } from "react";
import debounce from "debounce";
import { startDrawing, stopDrawing } from "./draw";
import ZoomControler from './events/zoom';
import PanningControler from './events/panning';
import SpeedControler from "./events/speed";

export let cache;
export let speedControler;
export let wheelControler;

export function MapCanvas({ onPlotClick }) {

  // center of the map (normal coordinates)
  const center = useRef({ x: 0.0, y: 0.0 });
  // scale in cells displayed per width
  const scale = useRef(32.0);

  const canvasRef = useRef(null);
  const selected = useRef([0, 0]);

  const pixelRatio = (typeof window === 'undefined') ? 1 : window.devicePixelRatio;
  const windowSize = useRef((typeof window === 'undefined') ? null : {
    width: window.innerWidth * pixelRatio,
    height: window.innerHeight * pixelRatio
  });

  useEffect(() => {
    canvasRef.current.width = windowSize.current.width;
    canvasRef.current.height = windowSize.current.height;
    speedControler = new SpeedControler(center, scale, windowSize);

    // handle canvas drawing
    cache = startDrawing(canvasRef.current, center, scale, selected, speedControler)
    cache.refresh(center.current, scale.current, windowSize.current.height / windowSize.current.width);

    // handle listeners creation
    const mouseControler = new PanningControler(center, scale, windowSize, canvasRef, selected, onPlotClick, cache);

    const touchDown = mouseControler.handleTouchDown.bind(mouseControler);
    const touchMove = mouseControler.handleTouchMove.bind(mouseControler);
    window.addEventListener("touchstart", touchDown);
    window.addEventListener("touchmove", touchMove);

    const mouseStart = mouseControler.handleMouseDown.bind(mouseControler);
    const mouseMove = mouseControler.handleMouseMove.bind(mouseControler);
    const mouseStop = mouseControler.handleMouseUp.bind(mouseControler);
    window.addEventListener("mousedown", mouseStart);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseStop);

    speedControler.setCache(cache);
    const listenKeyDown = speedControler.onKeyDown.bind(speedControler);
    const listenKeyUp = speedControler.onKeyUp.bind(speedControler);
    window.addEventListener("keydown", listenKeyDown);
    window.addEventListener("keyup", listenKeyUp);

    wheelControler = new ZoomControler(scale, (newScale) => {
      scale.current = newScale;
      cache.refresh(center.current, newScale, windowSize.current.height / windowSize.current.width);
    });
    const listenMouseWheel = wheelControler.handleMouseWheel.bind(wheelControler);
    window.addEventListener("wheel", listenMouseWheel);

    // screen resize
    const handler = debounce(() => {
      windowSize.current = {
        width: window.innerWidth * pixelRatio,
        height: window.innerHeight * pixelRatio
      }
      canvasRef.current.width = windowSize.current.width;
      canvasRef.current.height = windowSize.current.height;
    }, 20);

    window.addEventListener("resize", handler);
    return () => {
      stopDrawing();
      window.removeEventListener("touchstart", touchDown);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("mousedown", mouseStart);
      window.removeEventListener("mouseup", mouseStop);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", handler);
      window.removeEventListener("keydown", listenKeyDown);
      window.removeEventListener("keyup", listenKeyUp);
      window.removeEventListener("wheel", listenMouseWheel);
    };
  }, [pixelRatio]);

  return (
    <canvas
      className={styles.map}
      ref={canvasRef}
      tabIndex={1}
    />
  );
}