const memoryWindow = new Map<string, number[]>();

export function rateLimitByIp(ip: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = memoryWindow.get(ip) ?? [];
  const valid = existing.filter((time) => now - time < windowMs);

  if (valid.length >= limit) return false;

  valid.push(now);
  memoryWindow.set(ip, valid);
  return true;
}
