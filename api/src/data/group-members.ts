import { Entity } from "@gitgud/types";
import groupMember from "./models/group-member";
import { Wrapper } from "./wrapper";

export class GroupMembers extends Wrapper {
  public get(id: string) {
    return groupMember.findById(id);
  }
  public getByUserId(userId: string) {
    return groupMember.find({ user: userId });
  }
  public getByGroupId(groupId: string[]) {
    return groupMember.find({ group: { $in: groupId } });
  }
  public getDetailByGroupId(groupId: string[]) {
    return groupMember
      .find({ group: { $in: groupId } })
      .populate("user", "username avatar");
  }
  public getInvidual(userId: string, groupId: string) {
    return groupMember.findOne({ user: userId, group: groupId });
  }
  public delete(id: string) {
    return groupMember.findByIdAndDelete(id);
  }
  public deleteByGroupId(groupId: string) {
    return groupMember.deleteMany({ group: groupId });
  }
  public deleteByUserId(userId: string) {
    return groupMember.deleteMany({ user: userId });
  }
  public create(options: Partial<Entity.GroupMember>) {
    return groupMember.create(options);
  }
}
