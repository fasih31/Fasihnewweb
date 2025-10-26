
export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--chart-2))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Circular background */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      
      {/* Letter F */}
      <path
        d="M 30 30 L 30 70 M 30 30 L 55 30 M 30 48 L 50 48"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Letter R */}
      <path
        d="M 60 30 L 60 70 M 60 30 L 70 30 Q 75 30 75 37 Q 75 44 70 44 L 60 44 M 65 44 L 75 70"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
