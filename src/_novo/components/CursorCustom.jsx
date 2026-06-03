import { useEffect, useRef } from "react";

export default function CursorCustom() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // não ativa em telas de toque (celular não tem cursor)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my; // posição do anel (com atraso)
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      // o pontinho central acompanha na hora
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    // hover em elementos clicáveis -> anel cresce
    const onOver = (e) => {
      if (e.target.closest("a, button, .nv-card, .nv-chip, .nv-contact, .nv-ctrl")) {
        ring.classList.add("nv-cursor-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, .nv-card, .nv-chip, .nv-contact, .nv-ctrl")) {
        ring.classList.remove("nv-cursor-hover");
      }
    };

    const loop = () => {
      // anel segue com suavidade (lerp)
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="nv-cursor-ring" />
      <div ref={dotRef} className="nv-cursor-dot" />
    </>
  );
}