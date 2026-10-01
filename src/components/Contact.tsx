'use client';

import { useState, type FormEvent } from 'react';
import { services, site } from '@/lib/site';
import styles from './Contact.module.css';

type Status = 'idle' | 'sending' | 'ok' | 'error';

type FieldErrors = Partial<Record<'name' | 'email' | 'service' | 'message' | 'consent', string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ formEnabled }: { formEnabled: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form);
    const next: FieldErrors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const service = String(data.get('service') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const consent = data.get('consent');

    if (name.length < 2) next.name = 'Informe seu nome.';
    if (!emailPattern.test(email)) next.email = 'Informe um e-mail válido.';
    if (!service) next.service = 'Escolha o serviço de interesse.';
    if (message.length < 10) next.message = 'Escreva uma mensagem com pelo menos 10 caracteres.';
    if (!consent) next.consent = 'É preciso concordar com a política de privacidade.';
    return next;
  }

  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    setStatusMessage('');

    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      service: String(data.get('service') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      website: String(data.get('website') ?? ''),
    };

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (response.ok && result.ok) {
        setStatus('ok');
        setStatusMessage(
          'Mensagem enviada. Obrigado pelo contato — responderemos no e-mail informado assim que possível.',
        );
        form.reset();
      } else {
        setStatus('error');
        setStatusMessage(result.error ?? 'Não foi possível enviar agora. Tente novamente em instantes.');
      }
    } catch {
      setStatus('error');
      setStatusMessage(
        'Não foi possível enviar agora. Verifique sua conexão ou fale pelo e-mail indicado ao lado.',
      );
    }
  }

  return (
    <section className="section" id="contato">
      <div className={`container ${styles.grid}`}>
        <div className="reveal">
          <p className="eyebrow">Contato</p>
          <h2 className="section-title">Vamos conversar sobre o seu projeto</h2>
          <p className="section-lead">
            Conte o que você precisa resolver. Respondemos pelo e-mail informado, com os
            próximos passos e as perguntas que faltam para montar a proposta.
          </p>

          <div className={styles.channels}>
            <a className={styles.channel} href={`mailto:${site.email}`}>
              <span className={styles.channelIcon} aria-hidden="true">@</span>
              <span>
                <span className={styles.channelLabel}>E-mail</span>
                <span className={styles.channelValue}>{site.email}</span>
              </span>
            </a>

            {site.whatsapp && (
              <a
                className={styles.channel}
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.channelIcon} aria-hidden="true">WA</span>
                <span>
                  <span className={styles.channelLabel}>WhatsApp</span>
                  <span className={styles.channelValue}>Conversar agora</span>
                </span>
              </a>
            )}
          </div>

          <p className={styles.pending}>
            <strong>Atendimento:</strong> as mensagens são lidas e respondidas em até um dia útil.
            Se o seu assunto for urgente, escreva “urgente” no assunto da mensagem.
          </p>
        </div>

        {formEnabled ? (
          <form className={`reveal ${styles.form}`} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Nome
                </label>
                <input
                  className={styles.input}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  onChange={() => clearError('name')}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  E-mail
                </label>
                <input
                  className={styles.input}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={() => clearError('email')}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="company">
                  Empresa (opcional)
                </label>
                <input className={styles.input} id="company" name="company" type="text" autoComplete="organization" />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="service">
                  Serviço de interesse
                </label>
                <select
                  className={styles.select}
                  id="service"
                  name="service"
                  defaultValue=""
                  required
                  onChange={() => clearError('service')}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Ainda não sei">Ainda não sei / quero conversar</option>
                </select>
                {errors.service && <p className={styles.error}>{errors.service}</p>}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                Mensagem
              </label>
              <textarea
                className={styles.textarea}
                id="message"
                name="message"
                required
                onChange={() => clearError('message')}
                placeholder="Descreva o que você precisa, o momento do negócio e algum prazo que exista."
              />
              {errors.message && <p className={styles.error}>{errors.message}</p>}
            </div>

            {/* Honeypot: invisível para pessoas, preenchido por robôs. */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">Não preencha este campo</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className={styles.field}>
              <label className={styles.consent} htmlFor="consent">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  onChange={() => clearError('consent')}
                />
                <span>
                  Concordo com o uso dos dados enviados para resposta deste contato, conforme a{' '}
                  <a href="/privacidade">política de privacidade</a>.
                </span>
              </label>
              {errors.consent && <p className={styles.error}>{errors.consent}</p>}
            </div>

            {status === 'ok' && (
              <p className={`${styles.status} ${styles.statusOk}`} role="status">
                {statusMessage}
              </p>
            )}
            {status === 'error' && (
              <p className={`${styles.status} ${styles.statusError}`} role="alert">
                {statusMessage}
              </p>
            )}

            <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
            </button>

            <p className={styles.disclaimer}>
              Seus dados são usados apenas para responder a este contato e não são compartilhados
              com terceiros para marketing.
            </p>
          </form>
        ) : (
          <div className={`reveal ${styles.form}`}>
            <p className={`${styles.status} ${styles.statusError}`} role="status">
              O envio pelo site está temporariamente indisponível. Escreva para{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a> — o atendimento é o mesmo.
            </p>
            <a className="btn btn--primary" href={`mailto:${site.email}?subject=Contato%20pelo%20site`}>
              Escrever por e-mail
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
