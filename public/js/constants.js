const HUE_COLORS = {
  GREEN: 25500,
  RED: 0,
  BLUE: 38000,
  YELLOW: 10000,
  ORANGE: 5000,
  PURPLE: 48000,
};

window.POWER_ZONES = (ftp) => [
  {
    title: "Active Recovery",
    low: 0,
    high: 0.55 * ftp,
    hue: HUE_COLORS.BLUE,
    color: "#36b9cc",
  },
  {
    title: "Endurance",
    low: 0.55 * ftp,
    high: 0.76 * ftp,
    hue: HUE_COLORS.GREEN,
    color: "#1cc88a",
  },
  {
    title: "Tempo",
    low: 0.76 * ftp,
    high: 0.88 * ftp,
    hue: HUE_COLORS.YELLOW,
    color: "#f6c23e",
  },
  {
    title: "Sweet Spot",
    low: 0.88 * ftp,
    high: 0.95 * ftp,
    hue: HUE_COLORS.ORANGE,
    color: "#ff5f1f",
  },
  {
    title: "Threshold",
    low: 0.95 * ftp,
    high: 1.06 * ftp,
    hue: HUE_COLORS.ORANGE,
    color: "#ff5f1f",
  },
  {
    title: "VO2 Max",
    low: 1.06 * ftp,
    high: 1.21 * ftp,
    hue: HUE_COLORS.RED,
    color: "#e74a3b",
  },
  {
    title: "Anaerobic",
    low: 1.21 * ftp,
    high: Infinity,
    hue: HUE_COLORS.PURPLE,
    color: "#4e73df",
  },
];