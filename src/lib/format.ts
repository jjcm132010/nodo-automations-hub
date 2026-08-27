export const USD_RATE = 4000; // Tasa simulada, solo referencia informativa.

export function formatCop(value: number) {
  return `$${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value)} COP`;
}

export function formatUsd(valueCop: number) {
  return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(valueCop / USD_RATE))} USD`;
}
