import { useEffect, useRef, useState, useCallback } from "react";

const KONAMI = ["g"];const GRID = 17;       // tamanho do tabuleiro (células)
const CELL = 20;       // pixels por célula
const SPEED = 110;     // ms por passo (menor = mais rápido)

export default function SnakeGame() {
  const [open, setOpen] = useState(false);
  const seqRef = useRef([]);

  // detecta o código Konami
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seqRef.current = [...seqRef.current, key].slice(-KONAMI.length);
      if (KONAMI.every((k, i) => seqRef.current[i] === k)) {
        setOpen(true);
        seqRef.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  return <SnakeModal onClose={() => setOpen(false)} />;
}

function SnakeModal({ onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(true);

  const stateRef = useRef({
    snake: [{ x: 8, y: 8 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 12, y: 8 },
  });

  const randomFood = useCallback((snake) => {
    let f;
    do {
      f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snake.some((s) => s.x === f.x && s.y === f.y));
    return f;
  }, []);

  const reset = () => {
    stateRef.current = {
      snake: [{ x: 8, y: 8 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 12, y: 8 },
    };
    setScore(0);
    setGameOver(false);
    setRunning(true);
  };

  // controles
  useEffect(() => {
    const onKey = (e) => {
      const s = stateRef.current;
      if (e.key === "ArrowUp" && s.dir.y === 0) s.nextDir = { x: 0, y: -1 };
      else if (e.key === "ArrowDown" && s.dir.y === 0) s.nextDir = { x: 0, y: 1 };
      else if (e.key === "ArrowLeft" && s.dir.x === 0) s.nextDir = { x: -1, y: 0 };
      else if (e.key === "ArrowRight" && s.dir.x === 0) s.nextDir = { x: 1, y: 0 };
      else if (e.key === "Escape") onClose();
      if (e.key.startsWith("Arrow")) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // loop do jogo
  useEffect(() => {
    if (!running) return;
    const ctx = canvasRef.current.getContext("2d");
    const tick = setInterval(() => {
      const s = stateRef.current;
      s.dir = s.nextDir;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      // colisão com parede ou corpo
      if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
          s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true);
        setRunning(false);
        return;
      }

      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) {
        setScore((sc) => sc + 1);
        s.food = randomFood(s.snake);
      } else {
        s.snake.pop();
      }

      // desenha
      ctx.fillStyle = "#0a0e14";
      ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);
      // comida
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(s.food.x * CELL + CELL / 2, s.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      // cobra
      s.snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#4ade80" : "rgba(74,222,128,.7)";
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      });
    }, SPEED);
    return () => clearInterval(tick);
  }, [running, randomFood]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)",
      display: "grid", placeItems: "center",
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#0f141d", border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 18, padding: "1.5rem", textAlign: "center",
        fontFamily: "'Space Mono', monospace", color: "#e8eef5",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".8rem" }}>
          <span style={{ color: "#4ade80" }}>snake.exe</span>
          <span>score: {score}</span>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid rgba(255,255,255,.15)", color: "#7d8aa0",
            borderRadius: 6, padding: ".2rem .6rem", cursor: "pointer",
          }}>esc ✕</button>
        </div>
        <canvas ref={canvasRef} width={GRID * CELL} height={GRID * CELL}
          style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", display: "block" }} />
        {gameOver && (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "#f87171", marginBottom: ".6rem" }}>game over — score {score}</p>
            <button onClick={reset} style={{
              background: "#4ade80", color: "#04130a", border: "none",
              borderRadius: 8, padding: ".5rem 1.2rem", cursor: "pointer", fontWeight: 700,
            }}>jogar de novo</button>
          </div>
        )}
        {!gameOver && (
          <p style={{ color: "#7d8aa0", fontSize: ".75rem", marginTop: ".8rem" }}>
            use as setas ↑ ↓ ← → · esc pra sair
          </p>
        )}
      </div>
    </div>
  );
}