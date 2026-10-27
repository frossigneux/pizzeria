import raw from '../../content/settings.json';
import { check, text } from './validate';

// Settings live in content/settings.json so the pizzeria can edit them on GitHub.

const file = 'content/settings.json';
const s = raw as Record<string, any>;
const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/;

check(typeof s.name === 'string' && s.name.trim(), file, '"name" must be the pizzeria name in quotes');

const whatsapp = String(s.whatsapp ?? '').replace(/\D/g, '');
check(whatsapp.length >= 9, file, '"whatsapp" must be the full number with country code, e.g. "+995 555 12 34 56"');

check(hhmm.test(s.openingHours?.open) && hhmm.test(s.openingHours?.close), file, '"openingHours" must look like { "open": "11:00", "close": "23:00" } (24-hour clock)');
check(s.openingHours.open < s.openingHours.close, file, '"openingHours": "close" must be later than "open"');
check(Number.isInteger(s.prepMinutes) && s.prepMinutes > 0, file, '"prepMinutes" must be a whole number of minutes, e.g. 20');

for (const bank of ['bog', 'tbc'] as const) {
  const acc = s.bankAccounts?.[bank];
  check(acc && typeof acc.iban === 'string' && /^GE\d{2}[A-Z]{2}\d{16}$/.test(acc.iban.replace(/\s/g, '')), file, `"bankAccounts" → "${bank}" → "iban" must be a Georgian IBAN, e.g. "GE29 BG00 0000 0000 0000 00"`);
  check(typeof acc.holder === 'string' && acc.holder.trim(), file, `"bankAccounts" → "${bank}" → "holder" must be the account holder's name`);
}

export const config = {
  placeholder: s.showSampleLabels !== false,
  name: s.name.trim() as string,
  // Digits only, as https://wa.me/<number> expects.
  whatsapp,
  // Tbilisi time (UTC+4, no daylight saving).
  hours: { open: s.openingHours.open as string, close: s.openingHours.close as string },
  prepMinutes: s.prepMinutes as number,
  address: text(s.address, file, '"address"'),
  banks: {
    bog: { iban: s.bankAccounts.bog.iban.replace(/\s/g, '') as string, holder: s.bankAccounts.bog.holder as string },
    tbc: { iban: s.bankAccounts.tbc.iban.replace(/\s/g, '') as string, holder: s.bankAccounts.tbc.holder as string },
  },
};

export type BankId = keyof typeof config.banks;
