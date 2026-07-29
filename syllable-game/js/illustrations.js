/* SVG illustrations for words — colorful, kid-friendly */
const ILLUSTRATIONS = {
  mama() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="40" ry="8" fill="rgba(0,0,0,.1)"/>
      <circle cx="80" cy="48" r="28" fill="#FDBA74"/>
      <path d="M40 48 Q80 10 120 48" fill="#7C2D12"/>
      <path d="M52 95 Q80 75 108 95 L108 125 Q80 135 52 125 Z" fill="#FB7185"/>
      <circle cx="68" cy="48" r="4" fill="#1E293B"/>
      <circle cx="92" cy="48" r="4" fill="#1E293B"/>
      <path d="M72 60 Q80 68 88 60" stroke="#BE123C" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="56" r="6" fill="#FDA4AF" opacity=".8"/>
      <circle cx="100" cy="56" r="6" fill="#FDA4AF" opacity=".8"/>
      <circle cx="42" cy="78" r="10" fill="#FDBA74"/>
      <circle cx="118" cy="78" r="10" fill="#FDBA74"/>
    </svg>`;
  },
  papa() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="40" ry="8" fill="rgba(0,0,0,.1)"/>
      <circle cx="80" cy="48" r="28" fill="#FDBA74"/>
      <path d="M48 42 Q80 8 112 42 L105 55 Q80 35 55 55 Z" fill="#1E293B"/>
      <rect x="55" y="90" width="50" height="38" rx="8" fill="#38BDF8"/>
      <circle cx="68" cy="48" r="4" fill="#1E293B"/>
      <circle cx="92" cy="48" r="4" fill="#1E293B"/>
      <path d="M72 62 Q80 70 88 62" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="70" y="70" width="20" height="8" rx="2" fill="#64748B"/>
      <circle cx="42" cy="85" r="10" fill="#FDBA74"/>
      <circle cx="118" cy="85" r="10" fill="#FDBA74"/>
    </svg>`;
  },
  kot() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="36" ry="7" fill="rgba(0,0,0,.1)"/>
      <ellipse cx="80" cy="95" rx="38" ry="28" fill="#FB923C"/>
      <circle cx="80" cy="58" r="32" fill="#FB923C"/>
      <path d="M52 40 L45 12 L68 38 Z" fill="#FB923C"/>
      <path d="M108 40 L115 12 L92 38 Z" fill="#FB923C"/>
      <path d="M55 38 L50 20 L65 38 Z" fill="#FED7AA"/>
      <path d="M105 38 L110 20 L95 38 Z" fill="#FED7AA"/>
      <circle cx="68" cy="56" r="5" fill="#1E293B"/>
      <circle cx="92" cy="56" r="5" fill="#1E293B"/>
      <circle cx="70" cy="54" r="1.5" fill="#fff"/>
      <circle cx="94" cy="54" r="1.5" fill="#fff"/>
      <ellipse cx="80" cy="68" rx="6" ry="4" fill="#FDA4AF"/>
      <path d="M80 68 L80 74" stroke="#1E293B" stroke-width="2"/>
      <path d="M80 74 L72 78 M80 74 L88 78" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <path d="M50 66 H30 M50 72 H28 M110 66 H130 M110 72 H132" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <path d="M115 100 Q145 70 135 45" stroke="#FB923C" stroke-width="10" fill="none" stroke-linecap="round"/>
    </svg>`;
  },
  dom() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="50" ry="8" fill="rgba(0,0,0,.1)"/>
      <path d="M20 70 L80 20 L140 70 Z" fill="#EF4444"/>
      <rect x="35" y="70" width="90" height="55" fill="#FDE68A"/>
      <rect x="68" y="88" width="24" height="37" rx="3" fill="#92400E"/>
      <circle cx="86" cy="108" r="3" fill="#FBBF24"/>
      <rect x="45" y="82" width="18" height="18" rx="2" fill="#38BDF8"/>
      <rect x="97" y="82" width="18" height="18" rx="2" fill="#38BDF8"/>
      <path d="M45 91 H63 M54 82 V100 M97 91 H115 M106 82 V100" stroke="#fff" stroke-width="2"/>
      <rect x="118" y="45" width="12" height="28" fill="#64748B"/>
    </svg>`;
  },
  ryba() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="40" ry="7" fill="rgba(0,0,0,.08)"/>
      <ellipse cx="78" cy="70" rx="48" ry="28" fill="#38BDF8"/>
      <path d="M125 70 L155 45 L148 70 L155 95 Z" fill="#0EA5E9"/>
      <path d="M60 45 Q78 28 96 45" fill="#7DD3FC"/>
      <path d="M60 95 Q78 112 96 95" fill="#0284C7"/>
      <circle cx="50" cy="64" r="7" fill="#fff"/>
      <circle cx="52" cy="64" r="3.5" fill="#1E293B"/>
      <path d="M28 70 Q40 62 48 70 Q40 78 28 70" fill="#F97316"/>
      <circle cx="70" cy="70" r="4" fill="#7DD3FC" opacity=".8"/>
      <circle cx="88" cy="62" r="3" fill="#7DD3FC" opacity=".8"/>
      <circle cx="95" cy="78" r="3.5" fill="#7DD3FC" opacity=".8"/>
    </svg>`;
  },
  myach() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="36" ry="7" fill="rgba(0,0,0,.1)"/>
      <circle cx="80" cy="70" r="48" fill="#F8FAFC"/>
      <path d="M40 50 Q80 70 120 50" stroke="#1E293B" stroke-width="4" fill="none"/>
      <path d="M40 90 Q80 70 120 90" stroke="#1E293B" stroke-width="4" fill="none"/>
      <path d="M80 22 V118" stroke="#1E293B" stroke-width="4"/>
      <path d="M35 55 Q55 70 35 85" stroke="#EF4444" stroke-width="5" fill="none"/>
      <path d="M125 55 Q105 70 125 85" stroke="#EF4444" stroke-width="5" fill="none"/>
      <circle cx="80" cy="70" r="48" fill="none" stroke="#CBD5E1" stroke-width="3"/>
    </svg>`;
  },
  luna() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="140" rx="16" fill="#1E3A8A"/>
      <circle cx="30" cy="30" r="2" fill="#fff"/>
      <circle cx="50" cy="20" r="1.5" fill="#fff"/>
      <circle cx="130" cy="35" r="2" fill="#fff"/>
      <circle cx="110" cy="18" r="1.5" fill="#fff"/>
      <circle cx="140" cy="70" r="1.5" fill="#fff"/>
      <circle cx="25" cy="80" r="1.5" fill="#fff"/>
      <circle cx="95" cy="70" r="40" fill="#FDE047"/>
      <circle cx="112" cy="62" r="34" fill="#1E3A8A"/>
      <circle cx="78" cy="78" r="5" fill="#FACC15" opacity=".5"/>
      <circle cx="70" cy="55" r="4" fill="#FACC15" opacity=".4"/>
    </svg>`;
  },
  solnce() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="140" rx="16" fill="#7DD3FC"/>
      <g stroke="#FBBF24" stroke-width="6" stroke-linecap="round">
        <line x1="80" y1="18" x2="80" y2="30"/>
        <line x1="80" y1="110" x2="80" y2="122"/>
        <line x1="25" y1="70" x2="37" y2="70"/>
        <line x1="123" y1="70" x2="135" y2="70"/>
        <line x1="40" y1="30" x2="48" y2="38"/>
        <line x1="112" y1="102" x2="120" y2="110"/>
        <line x1="120" y1="30" x2="112" y2="38"/>
        <line x1="40" y1="110" x2="48" y2="102"/>
      </g>
      <circle cx="80" cy="70" r="32" fill="#FACC15"/>
      <circle cx="68" cy="64" r="4" fill="#1E293B"/>
      <circle cx="92" cy="64" r="4" fill="#1E293B"/>
      <path d="M68 80 Q80 92 92 80" stroke="#EA580C" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;
  },
  mashina() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="122" rx="55" ry="8" fill="rgba(0,0,0,.1)"/>
      <path d="M25 85 L40 55 H100 L130 85 Z" fill="#EF4444"/>
      <rect x="18" y="85" width="124" height="28" rx="10" fill="#DC2626"/>
      <rect x="48" y="58" width="28" height="22" rx="4" fill="#BAE6FD"/>
      <rect x="82" y="58" width="22" height="22" rx="4" fill="#BAE6FD"/>
      <circle cx="45" cy="112" r="14" fill="#1E293B"/>
      <circle cx="45" cy="112" r="6" fill="#94A3B8"/>
      <circle cx="115" cy="112" r="14" fill="#1E293B"/>
      <circle cx="115" cy="112" r="6" fill="#94A3B8"/>
      <rect x="128" y="90" width="10" height="8" rx="2" fill="#FDE047"/>
      <rect x="22" y="90" width="8" height="8" rx="2" fill="#F87171"/>
    </svg>`;
  },
  cvetok() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="30" ry="6" fill="rgba(0,0,0,.1)"/>
      <line x1="80" y1="70" x2="80" y2="125" stroke="#16A34A" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="62" cy="100" rx="14" ry="8" fill="#4ADE80" transform="rotate(-30 62 100)"/>
      <ellipse cx="98" cy="105" rx="14" ry="8" fill="#4ADE80" transform="rotate(30 98 105)"/>
      <circle cx="80" cy="48" r="16" fill="#FDE047"/>
      <circle cx="80" cy="22" r="16" fill="#FB7185"/>
      <circle cx="80" cy="74" r="16" fill="#FB7185"/>
      <circle cx="54" cy="48" r="16" fill="#F472B6"/>
      <circle cx="106" cy="48" r="16" fill="#F472B6"/>
      <circle cx="62" cy="30" r="14" fill="#FDA4AF"/>
      <circle cx="98" cy="30" r="14" fill="#FDA4AF"/>
      <circle cx="62" cy="66" r="14" fill="#FDA4AF"/>
      <circle cx="98" cy="66" r="14" fill="#FDA4AF"/>
      <circle cx="80" cy="48" r="12" fill="#FACC15"/>
    </svg>`;
  },
  derevo() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="40" ry="7" fill="rgba(0,0,0,.1)"/>
      <rect x="70" y="85" width="20" height="40" rx="4" fill="#92400E"/>
      <circle cx="80" cy="55" r="40" fill="#22C55E"/>
      <circle cx="55" cy="65" r="24" fill="#16A34A"/>
      <circle cx="105" cy="65" r="24" fill="#4ADE80"/>
      <circle cx="80" cy="40" r="22" fill="#86EFAC"/>
      <circle cx="68" cy="70" r="5" fill="#EF4444"/>
      <circle cx="95" cy="55" r="4" fill="#EF4444"/>
      <circle cx="55" cy="50" r="4" fill="#F87171"/>
    </svg>`;
  },
  kniga() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="40" ry="7" fill="rgba(0,0,0,.1)"/>
      <path d="M30 35 Q80 25 80 25 L80 115 Q80 115 30 120 Z" fill="#3B82F6"/>
      <path d="M130 35 Q80 25 80 25 L80 115 Q80 115 130 120 Z" fill="#60A5FA"/>
      <path d="M80 25 V115" stroke="#1E3A8A" stroke-width="3"/>
      <rect x="40" y="50" width="28" height="6" rx="2" fill="#BFDBFE"/>
      <rect x="40" y="65" width="24" height="6" rx="2" fill="#BFDBFE"/>
      <rect x="92" y="50" width="28" height="6" rx="2" fill="#DBEAFE"/>
      <rect x="92" y="65" width="24" height="6" rx="2" fill="#DBEAFE"/>
      <circle cx="54" cy="90" r="8" fill="#FDE047"/>
    </svg>`;
  },
  voda() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="140" rx="16" fill="#E0F2FE"/>
      <path d="M0 80 Q20 65 40 80 T80 80 T120 80 T160 80 V140 H0 Z" fill="#38BDF8"/>
      <path d="M0 95 Q25 80 50 95 T100 95 T150 95 T160 95 V140 H0 Z" fill="#0EA5E9" opacity=".8"/>
      <ellipse cx="50" cy="55" rx="8" ry="12" fill="#7DD3FC" opacity=".7"/>
      <ellipse cx="90" cy="45" rx="6" ry="10" fill="#7DD3FC" opacity=".6"/>
      <ellipse cx="120" cy="60" rx="7" ry="11" fill="#7DD3FC" opacity=".7"/>
    </svg>`;
  },
  noga() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="35" ry="7" fill="rgba(0,0,0,.1)"/>
      <path d="M70 20 Q85 20 88 70 L95 110 Q70 120 55 110 L62 70 Q65 20 70 20 Z" fill="#FDBA74"/>
      <ellipse cx="75" cy="115" rx="28" ry="12" fill="#FDBA74"/>
      <circle cx="55" cy="112" r="7" fill="#FDBA74"/>
      <circle cx="48" cy="108" r="5" fill="#FDBA74"/>
      <rect x="72" y="40" width="14" height="8" rx="2" fill="#FB7185"/>
    </svg>`;
  },
  ruka() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="30" ry="6" fill="rgba(0,0,0,.1)"/>
      <ellipse cx="80" cy="85" rx="28" ry="32" fill="#FDBA74"/>
      <rect x="68" y="100" width="24" height="28" rx="8" fill="#FDBA74"/>
      <rect x="55" y="48" width="14" height="40" rx="7" fill="#FDBA74" transform="rotate(-15 62 68)"/>
      <rect x="72" y="40" width="14" height="45" rx="7" fill="#FDBA74"/>
      <rect x="88" y="42" width="14" height="42" rx="7" fill="#FDBA74" transform="rotate(8 95 63)"/>
      <rect x="102" y="52" width="12" height="35" rx="6" fill="#FDBA74" transform="rotate(20 108 70)"/>
    </svg>`;
  },
  litso() {
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="128" rx="36" ry="7" fill="rgba(0,0,0,.1)"/>
      <circle cx="80" cy="70" r="48" fill="#FDBA74"/>
      <circle cx="62" cy="62" r="6" fill="#1E293B"/>
      <circle cx="98" cy="62" r="6" fill="#1E293B"/>
      <circle cx="64" cy="60" r="2" fill="#fff"/>
      <circle cx="100" cy="60" r="2" fill="#fff"/>
      <ellipse cx="80" cy="78" rx="5" ry="4" fill="#FB7185"/>
      <path d="M65 92 Q80 105 95 92" stroke="#BE123C" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="48" cy="78" r="8" fill="#FDA4AF" opacity=".7"/>
      <circle cx="112" cy="78" r="8" fill="#FDA4AF" opacity=".7"/>
    </svg>`;
  },
  fox() {
    return `<svg class="mascot" viewBox="0 0 200 220" aria-hidden="true">
      <ellipse cx="100" cy="200" rx="48" ry="12" fill="rgba(0,0,0,.12)"/>
      <path d="M55 95 C55 50 145 50 145 95 L145 145 C145 175 55 175 55 145 Z" fill="#FF8A3D"/>
      <path d="M70 100 C70 70 130 70 130 100 L130 140 C130 160 70 160 70 140 Z" fill="#FFE8D0"/>
      <path d="M55 70 L40 25 L75 80 Z" fill="#FF8A3D"/>
      <path d="M145 70 L160 25 L125 80 Z" fill="#FF8A3D"/>
      <path d="M58 68 L48 38 L72 78 Z" fill="#FFE8D0"/>
      <path d="M142 68 L152 38 L128 78 Z" fill="#FFE8D0"/>
      <circle cx="82" cy="105" r="8" fill="#2D2A32"/>
      <circle cx="118" cy="105" r="8" fill="#2D2A32"/>
      <circle cx="84" cy="103" r="2.5" fill="#fff"/>
      <circle cx="120" cy="103" r="2.5" fill="#fff"/>
      <ellipse cx="100" cy="120" rx="7" ry="5" fill="#FF5E7E"/>
      <path d="M93 128 Q100 136 107 128" stroke="#2D2A32" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M100 125 L100 132" stroke="#2D2A32" stroke-width="2"/>
      <ellipse cx="45" cy="130" rx="14" ry="18" fill="#FF8A3D"/>
      <ellipse cx="155" cy="130" rx="14" ry="18" fill="#FF8A3D"/>
      <circle cx="72" cy="118" r="10" fill="#FFB4A2" opacity=".7"/>
      <circle cx="128" cy="118" r="10" fill="#FFB4A2" opacity=".7"/>
    </svg>`;
  },
};

function getIllustration(key) {
  const fn = ILLUSTRATIONS[key];
  return fn ? fn() : ILLUSTRATIONS.fox();
}
