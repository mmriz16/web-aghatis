// SSR-safe localStorage stub to prevent runtime errors when some libraries
// access localStorage during server rendering. Only applies on the server.

if (typeof window === 'undefined') {
  const store = new Map<string, string>();

  const localStorageStub = {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    get length() {
      return store.size;
    },
  } as unknown as Storage;

  // Force override any broken polyfill
  (globalThis as any).localStorage = localStorageStub;
}