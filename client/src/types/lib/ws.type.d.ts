export declare namespace WS {
    interface To {
        TEST: Params.test;
        CREATE_GROUP: Params.createGroup;
        UPDATE_GROUP: Params.updateGroup;
        DELETE_GROUP: Params.deleteGroup;
    }
    interface From {
        TEST: {};
    }
    namespace Params {
        interface test {
            message: string;
        }
        interface createGroup {
            groupName: string;
            groupAvatar: string;
        }
        interface updateGroup {
            groupId: string;
            groupName: string;
            groupAvatar: string;
        }
        interface deleteGroup {
            groupId: string;
        }
    }
}
