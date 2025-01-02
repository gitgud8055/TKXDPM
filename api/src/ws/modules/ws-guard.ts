export class WSGuard {
  public decodeToken(token: string) {
    return deps.User.decodeToken(token);
  }
  public async canModify(userId: string, ownerId: string | string[]) {
    const user = await deps.User.get(userId);
    if (!user) throw new Error("Not authorized");
    const cant =
      typeof ownerId === "string"
        ? ownerId !== userId
        : !ownerId.includes(userId);
    if (user?.role !== "admin" && cant) throw new Error("Not authorized");
  }
  public async userInGroup(userId: string, groupId: string) {
    const user = await deps.User.get(userId);
    const member = await deps.GroupMembers.getInvidual(userId, groupId);
    if (!user || !member) throw new Error("Not authorized");
  }
  public async userNotInGroup(userId: string, groupId: string) {
    const user = await deps.User.get(userId);
    const member = await deps.GroupMembers.getInvidual(userId, groupId);
    if (!user || member) throw new Error("User already exists");
  }
  public async isAdmin(userId: string) {
    const user = await deps.User.get(userId);
    if (!user || user?.role !== "admin") throw new Error("Not authorized");
  }
}
