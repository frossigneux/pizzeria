import { items } from '../data/menu';
import { t, itemCount, price, type Lang } from '../i18n';

const lang = document.documentElement.lang as Lang;
const body = document.body;
const CART_KEY = 'pizzeria.cart';
const CUSTOMER_KEY = 'pizzeria.customer';
const MAX_DOTS = 10;

const store = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode: the cart just won't survive a reload */
    }
  },
};

const cart = new Map<string, number>(
  Object.entries(store.get<Record<string, number>>(CART_KEY, {})).filter(([id, n]) => items[id] && n > 0),
);

const $ = <T extends Element>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;
const $$ = <T extends Element>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

const dock = $<HTMLElement>('[data-dock]');
const toggle = $<HTMLButtonElement>('[data-toggle]');
const scrim = $<HTMLElement>('[data-scrim]');
const track = $<HTMLElement>('[data-track]');
const form = $<HTMLFormElement>('[data-form]');
const lines = $<HTMLUListElement>('[data-lines]');
const sent = $<HTMLElement>('[data-sent]');
const nameInput = form.elements.namedItem('name') as HTMLInputElement;
const nameHint = $<HTMLElement>('[data-name-hint]');
const formError = $<HTMLElement>('[data-form-error]');
const foot = $<HTMLElement>('[data-foot]');
const metaText = $<HTMLElement>('[data-meta-text]');
const pickupSelect = $<HTMLSelectElement>('[data-pickup]');
const desktop = matchMedia('(min-width: 960px)');

const units = () => [...cart.values()].reduce((a, n) => a + n, 0);
const total = () => [...cart].reduce((a, [id, n]) => a + items[id].price * n, 0);

function change(id: string, delta: number) {
  const n = Math.max(0, (cart.get(id) ?? 0) + delta);
  if (n) cart.set(id, n);
  else cart.delete(id);
  store.set(CART_KEY, Object.fromEntries(cart));
  formError.textContent = '';
  render(delta > 0 ? id : undefined);
}

function qtyControl(id: string, n: number): HTMLElement {
  const name = items[id].name[lang];
  const el = document.createElement('div');
  el.className = 'qty';
  el.dataset.qty = String(n);
  el.innerHTML = `
    <button class="qty-btn" type="button" data-remove aria-label="${t(lang, 'removeOne', { name })}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12"/></svg></button>
    <output class="qty-n">${n}</output>
    <button class="qty-btn" type="button" data-add aria-label="${t(lang, 'addOne', { name })}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg></button>`;
  return el;
}

function render(addedId?: string) {
  const count = units();
  const sum = price(total());

  for (const row of $$<HTMLElement>('[data-item]')) {
    const id = row.dataset.item!;
    const n = cart.get(id) ?? 0;
    const qty = $<HTMLElement>('.qty', row);
    qty.dataset.qty = String(n);
    $<HTMLElement>('[data-count]', row).textContent = String(n);
    row.classList.toggle('is-in', n > 0);
    if (id === addedId) {
      row.classList.remove('is-bump');
      void row.offsetWidth;
      row.classList.add('is-bump');
    }
  }

  // The signature line: one station per unit, ending at the green terminus.
  const end = $<HTMLElement>('.track-end', track);
  const prev = $$('.track-dot', track).length;
  track.replaceChildren();
  const shown = Math.min(count, MAX_DOTS);
  for (let i = 0; i < shown; i++) {
    const dot = document.createElement('span');
    dot.className = 'track-dot';
    if (addedId && i >= prev) dot.classList.add('is-new');
    track.append(dot);
  }
  if (count > MAX_DOTS) {
    const more = document.createElement('span');
    more.className = 'track-more';
    more.textContent = `+${count - MAX_DOTS}`;
    track.append(more);
  }
  track.append(end);
  track.toggleAttribute('data-empty', count === 0);

  $<HTMLElement>('[data-count-label]').textContent = count ? itemCount(lang, count) : t(lang, 'empty');
  for (const el of $$<HTMLElement>('[data-total]')) el.textContent = sum;

  lines.replaceChildren(
    ...[...cart].map(([id, n]) => {
      const li = document.createElement('li');
      li.dataset.line = id;
      const nm = document.createElement('span');
      nm.className = 'l-name';
      nm.textContent = items[id].name[lang];
      const pr = document.createElement('span');
      pr.className = 'l-price';
      pr.textContent = price(items[id].price * n);
      li.append(nm, qtyControl(id, n), pr);
      return li;
    }),
  );
  $<HTMLElement>('[data-empty]').hidden = count > 0;
  foot.hidden = count === 0 || !sent.hidden;
  dock.toggleAttribute('data-has', count > 0);
  updateMeta();
}

function updateMeta() {
  const opt = pickupSelect.selectedOptions[0];
  metaText.textContent = `${opt ? opt.text : ''} · ${payLabel(currentPay())}`;
}

// ── Quantity buttons (menu and order lines) ──────────────

document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('[data-add], [data-remove]');
  if (!btn) return;
  const id = btn.closest<HTMLElement>('[data-item], [data-line]')!;
  const itemId = id.dataset.item ?? id.dataset.line!;
  const removing = btn.hasAttribute('data-remove');
  change(itemId, removing ? -1 : 1);
  // Keep focus on a control that still exists after the re-render.
  if (id.dataset.item) {
    const n = cart.get(itemId) ?? 0;
    const next = n ? $$<HTMLButtonElement>(removing ? '[data-remove]' : '.qty-btn[data-add]', id)[0] : $<HTMLButtonElement>('.qty-add', id);
    next?.focus();
  } else {
    const row = lines.querySelector<HTMLElement>(`[data-line="${itemId}"]`);
    (row ? $<HTMLButtonElement>(removing ? '[data-remove]' : '[data-add]', row) : nameInput).focus();
  }
});

// ── Dock open / close (phones) ───────────────────────────

function setOpen(open: boolean) {
  if (desktop.matches) open = true;
  dock.dataset.state = open ? 'open' : 'collapsed';
  toggle.setAttribute('aria-expanded', String(open));
  scrim.hidden = !open || desktop.matches;
  document.documentElement.style.overflow = open && !desktop.matches ? 'hidden' : '';
}

toggle.addEventListener('click', () => {
  if (!desktop.matches) setOpen(dock.dataset.state !== 'open');
});
scrim.addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dock.dataset.state === 'open' && !desktop.matches) {
    setOpen(false);
    toggle.focus();
  }
});
desktop.addEventListener('change', () => {
  toggle.tabIndex = desktop.matches ? -1 : 0;
  setOpen(false);
});
toggle.tabIndex = desktop.matches ? -1 : 0;

// ── Opening hours and pickup slots (Tbilisi time) ────────

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (min: number) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

function tbilisiNow(): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tbilisi',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get('hour') * 60 + get('minute');
}

function setupHours() {
  const open = toMin(body.dataset.open!);
  const close = toMin(body.dataset.close!);
  const prep = Number(body.dataset.prep);
  const now = tbilisiNow();
  const isOpen = now >= open && now < close - prep;
  const status = $<HTMLElement>('[data-status]');
  body.toggleAttribute('data-closed', !isOpen);
  status.textContent = isOpen ? status.dataset.openText! : status.dataset.closedText!.replace('{t}', body.dataset.open!);

  const select = pickupSelect;
  const keep = select.value;
  const first = isOpen ? Math.ceil((now + prep) / 15) * 15 : open + prep;
  const options: HTMLOptionElement[] = [];
  if (isOpen) options.push(new Option(select.dataset.asap!, 'asap'));
  for (let m = Math.ceil(first / 15) * 15; m <= close; m += 15) options.push(new Option(fmt(m), fmt(m)));
  select.replaceChildren(...options);
  if (options.some((o) => o.value === keep)) select.value = keep;
  updateMeta();
}


// ── Payment and bank details ─────────────────────────────

const bank = $<HTMLElement>('[data-bank]');
const payInputs = $$<HTMLInputElement>('input[name="pay"]');
const payLabel = (v: string) => t(lang, v === 'bog' ? 'payBog' : v === 'tbc' ? 'payTbc' : 'payPickup');
const currentPay = () => payInputs.find((i) => i.checked)?.value ?? 'pickup';

function showBank() {
  const pay = currentPay();
  bank.hidden = pay === 'pickup';
  for (const acc of $$<HTMLElement>('[data-bank-acc]', bank)) acc.hidden = acc.dataset.bankAcc !== pay;
}

for (const input of payInputs) input.addEventListener('change', () => {
  showBank();
  saveCustomer();
  updateMeta();
});
pickupSelect.addEventListener('change', updateMeta);
$<HTMLButtonElement>('[data-meta]').addEventListener('click', () => setOpen(true));

document.addEventListener('click', async (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('[data-copy]');
  if (!btn) return;
  const label = $<HTMLElement>('span', btn);
  const original = label.textContent;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy!);
    label.textContent = btn.dataset.copied!;
    btn.classList.add('is-done');
    setTimeout(() => {
      label.textContent = original;
      btn.classList.remove('is-done');
    }, 2000);
  } catch {
    // Clipboard blocked: select the IBAN so it can be copied by hand.
    const iban = btn.parentElement!.querySelector('.bank-iban')!;
    getSelection()?.selectAllChildren(iban);
  }
});

// ── Remembered customer ──────────────────────────────────

function saveCustomer() {
  store.set(CUSTOMER_KEY, { name: nameInput.value.trim(), pay: currentPay() });
}

const customer = store.get<{ name?: string; pay?: string }>(CUSTOMER_KEY, {});
if (customer.name) nameInput.value = customer.name;
const savedPay = payInputs.find((i) => i.value === customer.pay);
if (savedPay) savedPay.checked = true;
showBank();

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) setNameError(false);
});
nameInput.addEventListener('change', saveCustomer);

function setNameError(on: boolean) {
  nameInput.setAttribute('aria-invalid', String(on));
  nameHint.textContent = on ? nameHint.dataset.error! : nameHint.dataset.hint!;
  nameHint.classList.toggle('is-error', on);
}

// ── Send on WhatsApp ─────────────────────────────────────

function message(): string {
  const data = new FormData(form);
  const pickup = String(data.get('pickup'));
  const note = String(data.get('note') ?? '').trim();
  const out = [t(lang, 'msgHello'), ''];
  for (const [id, n] of cart) {
    const item = items[id];
    // Staff read Georgian: add it beside the customer's language.
    const ka = lang === 'ka' ? '' : ` (${item.name.ka})`;
    out.push(`${n} × ${item.name[lang]}${ka} — ${price(item.price * n)}`);
  }
  out.push('', `${t(lang, 'msgTotal')}: ${price(total())}`);
  out.push(`${t(lang, 'msgName')}: ${nameInput.value.trim()}`);
  out.push(`${t(lang, 'msgPickup')}: ${pickup === 'asap' ? t(lang, 'asap') : pickup}`);
  out.push(`${t(lang, 'msgPayment')}: ${payLabel(currentPay())}`);
  if (note) out.push(`${t(lang, 'msgNote')}: ${note}`);
  return out.join('\n');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!units()) {
    setOpen(true);
    formError.textContent = formError.dataset.emptyError!;
    return;
  }
  if (!nameInput.value.trim()) {
    setOpen(true);
    setNameError(true);
    nameInput.focus();
    return;
  }
  saveCustomer();
  const url = `https://wa.me/${body.dataset.wa}?text=${encodeURIComponent(message())}`;
  const win = window.open(url, '_blank', 'noopener');
  if (!win) location.href = url;

  const acc = currentPay() === 'pickup' ? null : bank.cloneNode(true) as HTMLElement;
  const sentBank = $<HTMLElement>('[data-sent-bank]');
  sentBank.replaceChildren();
  if (acc) {
    acc.hidden = false;
    acc.removeAttribute('data-bank');
    sentBank.append(acc);
  }
  form.hidden = true;
  sent.hidden = false;
  foot.hidden = true;
  setOpen(true);
  sent.focus();
});

$<HTMLButtonElement>('[data-back]').addEventListener('click', () => {
  sent.hidden = true;
  form.hidden = false;
  foot.hidden = units() === 0;
  nameInput.focus();
});

$<HTMLButtonElement>('[data-new]').addEventListener('click', () => {
  cart.clear();
  store.set(CART_KEY, {});
  form.reset();
  nameInput.value = store.get<{ name?: string }>(CUSTOMER_KEY, {}).name ?? '';
  sent.hidden = true;
  form.hidden = false;
  showBank();
  render();
  setOpen(false);
  scrollTo({ top: 0 });
});

// ── Category pills follow the scroll ─────────────────────

const pills = $$<HTMLAnchorElement>('.cats a');
const spy = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const p of pills) {
        const on = p.hash === `#${entry.target.id}`;
        p.toggleAttribute('aria-current', on);
        if (on) p.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    }
  },
  { rootMargin: '-80px 0px -70% 0px' },
);
for (const section of $$('.line-section')) spy.observe(section);

setupHours();
setInterval(setupHours, 60_000);
render();
setOpen(false);
