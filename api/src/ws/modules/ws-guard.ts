export class WSGuard {
  public decodeToken(token: string) {
    return deps.User.decodeToken(token);
  }
  public async canModify(userId: string, ownerId: string) {
    const user = await deps.User.get(userId);
    if (!user) throw new Error("Not authorized");
    if (user?.role !== "admin" && user?._id.toString() !== ownerId)
      throw new Error("Not authorized");
  }
  public async userInGroup(userId: string, groupId: string) {
    const user = await deps.User.get(userId);
    if (!user || !user?.groups.map((x) => x.toString()).includes(groupId))
      throw new Error("Not authorized");
  }
  public async isAdmin(userId: string) {
    const user = await deps.User.get(userId);
    if (!user || user?.role !== "admin") throw new Error("Not authorized");
  }
}
