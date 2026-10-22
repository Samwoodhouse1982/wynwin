// Remembers who has registered on this device, so returning visitors skip the
// onboarding step. Read it with useSyncExternalStore (see TrainingHub), which
// keeps server and client renders consistent.

const CHANGE_EVENT = 'training:registration-changed';

export interface StoredRegistration {
  name: string;
  practice: string;
  role: string;
  email?: string;
  registeredAt: string;
  /** false if the details never reached the server (e.g. a failed save). */
  synced: boolean;
}

export const storageKey = (clientId: string) => `training:${clientId}:registration`;

export function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function readRaw(key: string): string {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

export function saveLocal(key: string, value: StoredRegistration) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or blocked storage: the hub keeps a copy in memory instead.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearLocal(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to clear.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function parseStored(raw: string | null): StoredRegistration | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<StoredRegistration>;
    if (typeof v.name === 'string' && typeof v.practice === 'string' && typeof v.role === 'string') {
      return {
        name: v.name,
        practice: v.practice,
        role: v.role,
        email: v.email,
        registeredAt: v.registeredAt ?? '',
        synced: v.synced !== false,
      };
    }
  } catch {
    // Corrupt value: treat as not registered.
  }
  return null;
}
