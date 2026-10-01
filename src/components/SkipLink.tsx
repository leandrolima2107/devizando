'use client';

/**
 * Link de acessoibilidade para pular direto ao conteúdo.
 * Fica fora da tela até receber foco pelo teclado.
 */
export default function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="btn btn--primary"
      style={{ position: 'absolute', left: -9999, top: 16, zIndex: 100 }}
      onFocus={(event) => {
        event.currentTarget.style.left = '16px';
      }}
      onBlur={(event) => {
        event.currentTarget.style.left = '-9999px';
      }}
    >
      Pular para o conteúdo
    </a>
  );
}
