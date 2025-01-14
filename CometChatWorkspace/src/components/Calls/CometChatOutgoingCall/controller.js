import { CometChat } from "@cometchat-pro/chat";

import * as enums from "../../../util/enums.js";

export class CallScreenManager {
  callListenerId = "callscreen_" + new Date().getTime();

  attachListeners(callback) {
    CometChat.addCallListener(
      this.callListenerId,
      new CometChat.CallListener({
        onOutgoingCallAccepted: (call) => {
          callback(enums.OUTGOING_CALL_ACCEPTED, call);
          console.log(`Call Accepted ${call}`);
          console.log(call)
        },
        onOutgoingCallRejected: (call) => {
          callback(enums.OUTGOING_CALL_REJECTED, call);
          console.log(`Call Rejected ${call}`);
          console.log(call)
          this.$store.dispatch('setCallingStatus', false);
        },
        onIncomingCallCancelled: (call) => {
          callback(enums.INCOMING_CALL_CANCELLED, call);
          console.log(`Call Cancelled ${call}`);
          console.log(call)
          this.$store.dispatch('setCallingStatus', false);
        },
      })
    );
  }

  removeListeners() {
    CometChat.removeCallListener(this.callListenerId);
  }
}
