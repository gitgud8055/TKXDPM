export declare namespace WS {
  export interface To {
    TEST: Params.test;
    CREATE_GROUP: Params.createGroup;
    UPDATE_GROUP: Params.updateGroup;
    DELETE_GROUP: Params.deleteGroup;
  }

  export interface From {
    TEST: {};
  }

  export namespace Params {
    export interface test {
      message: string;
    }
    export interface createGroup {
      groupName: string;
      groupAvatar: string;
    }
    export interface updateGroup {
      groupId: string;
      groupName: string;
      groupAvatar: string;
    }
    export interface deleteGroup {
      groupId: string;
    }
  }
}
