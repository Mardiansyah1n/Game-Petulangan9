import React from 'react';

interface ShapeSvgProps {
  type: string;
  className?: string;
  color?: string;
  showLabels?: boolean;
  size?: number;
  interactive?: boolean;
}

export const ShapeSvg: React.FC<ShapeSvgProps> = ({
  type,
  className = "w-32 h-32",
  color = "#3b82f6",
  showLabels = false,
  size = 140
}) => {
  const strokeColor = "#1e293b";
  const strokeWidth = 3;

  switch (type) {
    case 'equilateral_triangle':
    case 'triangle':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <defs>
            <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <polygon
            points="70,18 126,115 14,115"
            fill="url(#triGrad)"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Cute face on triangle mascot style */}
          <circle cx="58" cy="72" r="5" fill="#1e293b" />
          <circle cx="82" cy="72" r="5" fill="#1e293b" />
          <path d="M64,84 Q70,90 76,84" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          {showLabels && (
            <>
              <text x="70" y="132" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="700">sisi (s)</text>
              <text x="28" y="60" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="700">sisi (s)</text>
              <text x="112" y="60" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="700">sisi (s)</text>
            </>
          )}
        </svg>
      );

    case 'right_triangle':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="25,20 25,120 120,120"
            fill="#38bdf8"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Right angle indicator box */}
          <rect x="25" y="105" width="15" height="15" fill="none" stroke="#1e293b" strokeWidth="2" />
          {showLabels && (
            <>
              <text x="12" y="75" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">tinggi (t)</text>
              <text x="70" y="135" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">alas (a)</text>
              <text x="82" y="62" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">sisi miring (c)</text>
            </>
          )}
        </svg>
      );

    case 'isosceles_triangle':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="70,20 115,120 25,120"
            fill="#a855f7"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Tick marks on equal legs */}
          <line x1="43" y1="68" x2="51" y2="72" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="89" y1="72" x2="97" y2="68" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {showLabels && (
            <text x="70" y="135" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="700">alas (a)</text>
          )}
        </svg>
      );

    case 'square':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <defs>
            <linearGradient id="sqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <rect
            x="24"
            y="24"
            width="92"
            height="92"
            rx="6"
            fill="url(#sqGrad)"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Cheerful face */}
          <circle cx="54" cy="62" r="5" fill="#ffffff" />
          <circle cx="86" cy="62" r="5" fill="#ffffff" />
          <circle cx="55" cy="63" r="2.5" fill="#1e293b" />
          <circle cx="87" cy="63" r="2.5" fill="#1e293b" />
          <path d="M62,78 Q70,86 78,78" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {showLabels && (
            <>
              <text x="70" y="132" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="700">sisi (s)</text>
              <text x="12" y="74" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="700">sisi (s)</text>
            </>
          )}
        </svg>
      );

    case 'rectangle':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <defs>
            <linearGradient id="recGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect
            x="14"
            y="35"
            width="112"
            height="70"
            rx="6"
            fill="url(#recGrad)"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Eyes & smile */}
          <circle cx="56" cy="64" r="5" fill="#ffffff" />
          <circle cx="84" cy="64" r="5" fill="#ffffff" />
          <path d="M64,78 Q70,84 76,78" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {showLabels && (
            <>
              <text x="70" y="124" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">panjang (p)</text>
              <text x="6" y="74" textAnchor="start" fill="#047857" fontSize="11" fontWeight="700">lebar (l)</text>
            </>
          )}
        </svg>
      );

    case 'circle':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <defs>
            <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <circle
            cx="70"
            cy="70"
            r="50"
            fill="url(#circGrad)"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Center point and radius line */}
          <circle cx="70" cy="70" r="3.5" fill="#ffffff" />
          <line x1="70" y1="70" x2="120" y2="70" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Cheerful face */}
          <circle cx="56" cy="58" r="4.5" fill="#ffffff" />
          <circle cx="84" cy="58" r="4.5" fill="#ffffff" />
          <path d="M63,78 Q70,86 77,78" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {showLabels && (
            <text x="96" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">r</text>
          )}
        </svg>
      );

    case 'parallelogram':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="35,32 125,32 105,108 15,108"
            fill="#c084fc"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Altitude dotted line */}
          <line x1="35" y1="32" x2="35" y2="108" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
          {showLabels && (
            <>
              <text x="60" y="124" textAnchor="middle" fill="#7e22ce" fontSize="11" fontWeight="700">alas (a)</text>
              <text x="42" y="70" textAnchor="start" fill="#ffffff" fontSize="10" fontWeight="700">tinggi (t)</text>
            </>
          )}
        </svg>
      );

    case 'rhombus':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="70,18 122,70 70,122 18,70"
            fill="#f472b6"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Diagonals */}
          <line x1="70" y1="18" x2="70" y2="122" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="18" y1="70" x2="122" y2="70" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          {showLabels && (
            <text x="80" y="55" textAnchor="start" fill="#ffffff" fontSize="10" fontWeight="700">d1</text>
          )}
        </svg>
      );

    case 'kite':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="70,14 116,55 70,126 24,55"
            fill="#fb923c"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <line x1="70" y1="14" x2="70" y2="126" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="24" y1="55" x2="116" y2="55" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'trapezoid':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="38,36 102,36 124,106 16,106"
            fill="#facc15"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Height line */}
          <line x1="38" y1="36" x2="38" y2="106" stroke="#1e293b" strokeWidth="1.8" strokeDasharray="3 3" />
          {showLabels && (
            <>
              <text x="70" y="28" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="700">sisi atas (a)</text>
              <text x="70" y="124" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="700">sisi bawah (b)</text>
            </>
          )}
        </svg>
      );

    case 'pentagon':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="70,18 122,56 102,118 38,118 18,56"
            fill="#2dd4bf"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'hexagon':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="70,16 116,42 116,96 70,122 24,96 24,42"
            fill="#fbbf24"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'octagon':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="42,16 98,16 124,42 124,98 98,124 42,124 16,98 16,42"
            fill="#f87171"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <text x="70" y="76" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">STOP</text>
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <polygon
            points="70,15 85,52 125,52 92,76 104,115 70,91 36,115 48,76 15,52 55,52"
            fill="#facc15"
            stroke="#b45309"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'cube':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          {/* 3D Cube Isometric */}
          {/* Top face */}
          <polygon points="70,20 115,44 70,68 25,44" fill="#93c5fd" stroke={strokeColor} strokeWidth={2.5} />
          {/* Left face */}
          <polygon points="25,44 70,68 70,118 25,94" fill="#3b82f6" stroke={strokeColor} strokeWidth={2.5} />
          {/* Right face */}
          <polygon points="70,68 115,44 115,94 70,118" fill="#1d4ed8" stroke={strokeColor} strokeWidth={2.5} />
        </svg>
      );

    case 'cylinder':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          {/* Body */}
          <path d="M35,40 L35,100 A35,14 0 0,0 105,100 L105,40 Z" fill="#38bdf8" stroke={strokeColor} strokeWidth={2.5} />
          {/* Bottom ellipse stroke */}
          <path d="M35,100 A35,14 0 0,0 105,100" fill="none" stroke={strokeColor} strokeWidth={2.5} />
          {/* Top ellipse */}
          <ellipse cx="70" cy="40" rx="35" ry="14" fill="#7dd3fc" stroke={strokeColor} strokeWidth={2.5} />
        </svg>
      );

    case 'cone':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          {/* Base */}
          <path d="M25,106 A45,15 0 0,0 115,106" fill="none" stroke={strokeColor} strokeWidth={2.5} />
          {/* Cone body */}
          <path d="M70,20 L115,106 A45,15 0 0,1 25,106 Z" fill="#fb923c" stroke={strokeColor} strokeWidth={2.5} />
        </svg>
      );

    case 'sphere':
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <defs>
            <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="60%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4c1d95" />
            </radialGradient>
          </defs>
          <circle cx="70" cy="70" r="48" fill="url(#sphereGrad)" stroke={strokeColor} strokeWidth={2.5} />
          <ellipse cx="70" cy="70" rx="46" ry="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 140 140" className={className} width={size} height={size}>
          <rect x="25" y="25" width="90" height="90" rx="8" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
  }
};
