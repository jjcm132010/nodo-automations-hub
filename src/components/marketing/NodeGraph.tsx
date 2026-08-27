import { useTranslation } from "react-i18next";

/** SVG minimalista de nodos conectados; decorativo pero con etiqueta accesible. */
export function NodeGraph({ className }: { className?: string }) {
  const { t } = useTranslation();

  const nodes = [
    { x: 20, y: 130 },
    { x: 110, y: 60 },
    { x: 110, y: 200 },
    { x: 210, y: 130 },
    { x: 310, y: 70 },
    { x: 310, y: 190 },
    { x: 400, y: 130 },
  ];
  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
  ];

  return (
    <svg
      viewBox="0 0 420 260"
      role="img"
      aria-label={t("home.hero.diagramLabel")}
      className={className}
    >
      {edges.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={nodes[from]!.x}
          y1={nodes[from]!.y}
          x2={nodes[to]!.x}
          y2={nodes[to]!.y}
          stroke="hsl(var(--border))"
          strokeWidth={1}
        />
      ))}
      {nodes.map((node, index) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={index === 3 ? 9 : 5}
          fill={index === 3 ? "hsl(var(--primary))" : "hsl(var(--surface))"}
          stroke={index === 6 ? "hsl(var(--accent))" : "hsl(var(--ink-muted))"}
          strokeWidth={index === 3 ? 0 : 1.25}
        />
      ))}
    </svg>
  );
}
