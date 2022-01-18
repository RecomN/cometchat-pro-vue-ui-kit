import { CometChat } from "@cometchat-pro/chat";

import * as enums from "../../../util/enums.js";

export class CallAlertManager {
  callListenerId = "incoming_call_" + new Date().getTime();

  attachListeners(callback) {
    CometChat.addCallListener(
      this.callListenerId,
      new CometChat.CallListener({
        onIncomingCallReceived: (call) => {
          callback(enums.INCOMING_CALL_RECEIVED, call);
          console.log(`Call Received ${call}`);
          console.log(call)
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
