export const setToken = (token: string, ttlSeconds = 86400) => {
  const expiry = Date.now() + ttlSeconds * 1000; // 1 day in ms
  localStorage.setItem("surekeysToken", JSON.stringify({ token, expiry }));

  setTimeout(() => {
    localStorage.removeItem("surekeysToken");
  }, ttlSeconds * 1000);
};

export const getToken = (): string | null => {
  const stored = localStorage.getItem("surekeysToken");
  if (!stored) return null;

  try {
    const { token, expiry } = JSON.parse(stored);
    if (Date.now() > expiry) {
      localStorage.removeItem("surekeysToken");
      return null;
    }
    return token;
  } catch {
    localStorage.removeItem("surekeysToken");
    return null;
  }
};

export const clearToken = () => {
  localStorage.removeItem("surekeysToken");
};
