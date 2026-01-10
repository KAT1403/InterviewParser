interface Tokens {
  access_token: string | null;
}

export function getTokens(): Tokens {
  const access_token = localStorage.getItem('access_token');
  return { access_token };
}

export function setTokens(token: string): void {
  localStorage.setItem('access_token', `Bearer ${token}`);
}

export function clearTokens(): void {
  localStorage.removeItem('access_token');
}