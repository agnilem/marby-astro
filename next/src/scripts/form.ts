/**
 * Contact form states: loading, then "Thank you" (or "Something went wrong").
 * Posts to PUBLIC_FORM_ENDPOINT when the form has an action; otherwise it only
 * runs the states locally and sends nothing.
 */
export function initForms() {
  document.querySelectorAll<HTMLFormElement>('[data-form]').forEach((form) => {
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const label = btn.querySelector<HTMLElement>('.submit__label')!;
    const set = (state: 'idle' | 'loading' | 'success' | 'error') => {
      btn.dataset.state = state;
      label.textContent = state === 'success' ? label.dataset.labelSuccess! : state === 'error' ? label.dataset.labelError! : label.dataset.labelIdle!;
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (btn.dataset.state === 'loading') return;
      set('loading');
      try {
        if (form.getAttribute('action')) {
          const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(String(res.status));
        } else {
          await new Promise((r) => setTimeout(r, 900));
        }
        set('success');
        form.reset();
      } catch {
        set('error');
      }
      setTimeout(() => set('idle'), 4000);
    });
  });
}
