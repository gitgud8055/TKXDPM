export class SessionManager {
  private user: Map<string, string>;
  private client: Map<string, string>;
  constructor() {
    this.user = new Map();
    this.client = new Map();
  }
  public getByClient(clientId: string) {
    const userId = this.client.get(clientId);
    if (!userId) {
      throw new Error("User not logged in");
    }
    return userId;
  }

  public getByUserId(userId: string) {
    const clientId = this.user.get(userId);
    if (!clientId) {
      throw new Error("User not logged in");
    }
    return clientId;
  }
  public add(clientId: string, userId: string) {
    this.user.set(userId, clientId);
    this.client.set(clientId, userId);
  }
  public remove(clientId: string) {
    const userId = this.getByClient(clientId);
    if (!userId) {
      throw new Error("User not logged in");
    }
    this.user.delete(userId);
    this.client.delete(clientId);
  }
}
