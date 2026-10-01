import styles from './SceneFallback.module.css';
import type { ScreenKind } from './sceneTextures';

/**
 * Alternativa estática para navegadores sem WebGL
 * e para visitantes que preferem menos movimento.
 */
export default function SceneFallback({ kind: _kind = 'sites' }: { kind?: ScreenKind }) {
  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label="Ilustração de uma estação de trabalho digital com computador, celular e elementos de automação"
    >
      <svg className={styles.svg} viewBox="0 0 640 460" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dz-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1b222b" />
            <stop offset="100%" stopColor="#10151b" />
          </linearGradient>
          <radialGradient id="dz-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff5b24" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff5b24" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="130" r="150" fill="url(#dz-glow)" />

        {/* monitor */}
        <rect x="150" y="110" width="330" height="215" rx="14" fill="#20262e" />
        <rect x="164" y="124" width="302" height="187" rx="8" fill="url(#dz-screen)" />
        <rect x="184" y="148" width="120" height="14" rx="7" fill="#ff5b24" />
        <rect x="184" y="176" width="180" height="9" rx="4.5" fill="#39434f" />
        <rect x="184" y="194" width="140" height="9" rx="4.5" fill="#39434f" />
        <rect x="184" y="228" width="86" height="26" rx="13" fill="#ff5b24" />
        <rect x="368" y="148" width="86" height="86" rx="8" fill="#252c35" />
        <path d="M295 325h40l8 42h-56l8-42Z" fill="#20262e" />
        <rect x="258" y="367" width="114" height="12" rx="6" fill="#20262e" />

        {/* celular */}
        <rect x="58" y="205" width="86" height="176" rx="16" fill="#20262e" />
        <rect x="67" y="218" width="68" height="150" rx="9" fill="#141a21" />
        <rect x="76" y="232" width="34" height="8" rx="4" fill="#ff5b24" />
        <rect x="76" y="252" width="50" height="18" rx="8" fill="#242b34" />
        <rect x="88" y="278" width="38" height="18" rx="8" fill="#242b34" />

        {/* núcleo de IA */}
        <g className={styles.core}>
          <circle cx="540" cy="120" r="34" stroke="#ff5b24" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="540" cy="120" r="17" fill="#ff5b24" opacity="0.85" />
        </g>

        {/* rede de automação */}
        <g stroke="#39434f" strokeWidth="1.6">
          <path d="M500 300h70M535 265v70M500 300l35-35M570 300l-35 35" />
        </g>
        <circle cx="500" cy="300" r="9" fill="#20262e" stroke="#5b6672" strokeWidth="1.5" />
        <circle cx="570" cy="300" r="9" fill="#20262e" stroke="#5b6672" strokeWidth="1.5" />
        <circle cx="535" cy="265" r="9" fill="#ff5b24" />
        <circle cx="535" cy="335" r="9" fill="#20262e" stroke="#5b6672" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
