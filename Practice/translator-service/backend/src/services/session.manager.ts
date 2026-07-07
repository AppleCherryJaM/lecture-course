import crypto from 'crypto';

interface SessionData {
  userId: number;
  expiresAt: number;
}

export class SessionManager {
  private static sessions = new Map<string, SessionData>();

  public static createSession(userId: number): string {
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    this.sessions.set(token, { userId, expiresAt });
    return token;
  }

  public static getUserId(token: string): number | null {
    const session = this.sessions.get(token);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }
    return session.userId;
  }

  public static destroySession(token: string): void {
    this.sessions.delete(token);
  }
}
