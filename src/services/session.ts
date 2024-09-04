class SessionService {
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string, defaultValue?: string): string | undefined {
    const val = localStorage.getItem(key);
    return val ? val : defaultValue;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export const sessionService = new SessionService();
