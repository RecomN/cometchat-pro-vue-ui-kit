// import { CometChat } from "@cometchat-pro/chat";

// export class BlockedUserListManager {
//   blockedUsersRequest = null

//   constructor() {
//     this.blockedUsersRequest =
//       new CometChat.BlockedUsersRequest().BlockedUsersRequestBuilder()
//         .setLimit(30)
//         .setDirection(CometChat.BlockedUsersRequest.DIRECTION.BLOCKED_BY_ME)
//         .build();
//   }

//   getListOfBlockedUser() {
//     blockedUsersRequest.fetchNext().then(
//       (userList) => {
//         console.log("Blocked user list received:", userList);
//       },
//       (error) => {
//         console.log("Blocked user list fetching failed with error:", error);
//       }
//     );
//   }
// }