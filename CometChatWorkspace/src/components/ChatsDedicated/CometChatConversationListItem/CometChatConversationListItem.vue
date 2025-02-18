<template>
  <div 
    class="chat__item--hover" 
    :style="styles.list" 
    @click="itemClickHandler"
    @mouseenter="handleMouseHover(true)"
    @mouseleave="handleMouseHover(false)"
  >
    <div :style="styles.thumbnail">
      <comet-chat-avatar
        border-width="1px"
        corner-radius="18px"
        :image="getAvatar()"
        :border-color="theme.borderColor.primary"
      />
      <comet-chat-user-presence
        border-width="1px"
        corner-radius="50%"
        :border-color="theme.borderColor.primary"
        :status="conversation.conversationWith.status"
        v-if="conversation.conversationType === 'user'"
      />
    </div>
    <div :style="styles.detail">
      <div :style="styles.row">
        <div
          :style="styles.name"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ conversation.conversationWith.name }}
        </div>
        <span
          :style="styles.lastMsgTime"
          class="item__details__timestamp"
          :class="{ 'hidden' : isHovering }"
          v-if="conversation.lastMessage"
          >
            <comet-chat-read-receipt
              :receiptOnly="true"
              :theme="theme"
              :message="conversation.lastMessage"
              v-if="showReceipt"
            />
            {{ getLastMessageTime() }}
          </span
        >
      </div>
      <div :style="styles.row" class="last-msg-item">
        <div
          :style="styles.lastMsg"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ getLastMessage() }}
        </div>
        <!-- <comet-chat-badge-count
          :theme="theme"
          :count="conversation.unreadMessageCount"
        /> -->
        <sejasa-badge-counter
          v-show="!!conversation.unreadMessageCount"
          :count="conversation.unreadMessageCount"
        />
      </div>
      <div v-if="isHovering">
        <cometchat-conversation-list-actions
          :theme="theme"
          :conversation="conversation"
        />
      </div>
    </div>
  </div>
</template>
<script>
import dateFormat from "dateformat";
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck, tooltip } from "../../../mixins/";
import * as enums from "../../../util/enums.js";

import {
  CometChatAvatar,
  CometChatBadgeCount,
  CometChatUserPresence,
} from "../../Shared/";
import cometchatConversationListActions from "../CometChatConversationListActions/index.vue";

import * as style from "./style";
import SejasaBadgeCounter from '../../CometChatUIDedicated/components/SejasaBadgeCounter.vue';
import CometChatReadReceipt from "../../MessagesDedicated/CometChatReadReceipt/CometChatReadReceipt.vue";

/**
 * The conversation item for conversation list.
 *
 * @displayName CometChatConversationListItem
 */
export default {
  name: "CometChatConversationListItem",
  mixins: [tooltip, propertyCheck, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatBadgeCount,
    CometChatUserPresence,
    cometchatConversationListActions,
    SejasaBadgeCounter,
    CometChatReadReceipt
  },
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * @ignore
     */
    config: { ...DEFAULT_OBJECT_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * Current conversation object.
     */
    conversation: { ...DEFAULT_OBJECT_PROP },
    /**
     * Selected conversation object.
     */
    selectedConversation: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      isHovering: false,
    }
  },
  computed: {
    showReceipt() {
      const { lastMessage } = this.conversation

      if (lastMessage) return lastMessage.category === 'message' && lastMessage.sender.uid === this.loggedInUser.uid && !lastMessage.deletedAt

      return false
    },
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        list: style.listItem(
          this.theme,
          this.conversation,
          this.selectedConversation
        ),
        row: style.itemRowStyle(),
        name: style.itemNameStyle(),
        detail: style.itemDetailStyle(),
        thumbnail: style.itemThumbnailStyle(),
        lastMsg: style.itemLastMsgStyle(this.theme),
        lastMsgTime: style.itemLastMsgTimeStyle(this.theme),
      };
    },
    messageRead() {
      return this.conversation.readAt
    },
  },
  methods: {
    /**
     * Handles item click
     */
    itemClickHandler() {
      this.emitEvent("click", {
        item: this.conversation.conversationWith,
        type: this.conversation.conversationType,
      });
    },
    handleMouseHover(toggleFlag) {
      if(toggleFlag && !this.isHovering) {
        this.isHovering = true;
      } else if(!toggleFlag && this.isHovering) {
        this.isHovering = false;
      }
    },
    /**
     * Gets SVG avatar
     */
    getAvatar() {
      let avatar;
      if (this.conversation.conversationType === "user") {
        avatar = this.conversation.conversationWith.avatar;
      } else if (this.conversation.conversationType === "group") {
        avatar = this.conversation.conversationWith.icon;
      }
      return avatar;
    },
    /**
     * Gets last message time
     */
    getLastMessageTime() {
      if (!this.conversation) {
        return false;
      }

      if (this.hasProperty(this.conversation, "lastMessage") === false) {
        return false;
      }

      if (this.hasProperty(this.conversation.lastMessage, "sentAt") === false) {
        return false;
      }

      let timestamp = null;

      const messageTimestamp = new Date(
        this.conversation.lastMessage.sentAt * 1000
      );
      const currentTimestamp = Date.now();

      const diffTimestamp = currentTimestamp - messageTimestamp;

      if (diffTimestamp < 24 * 60 * 60 * 1000) {
        timestamp = dateFormat(messageTimestamp, "shortTime");
      } else if (diffTimestamp < 48 * 60 * 60 * 1000) {
        timestamp = COMETCHAT_CONSTANTS.YESTERDAY;
      } else if (diffTimestamp < 7 * 24 * 60 * 60 * 1000) {
        timestamp = dateFormat(messageTimestamp, "dddd");
      } else {
        timestamp = dateFormat(messageTimestamp, "dd/mm/yyyy");
      }

      return timestamp;
    },
    getLastMessage() {
      if (!this.conversation.lastMessage) return "";

      const lastMessage = this.conversation.lastMessage;

      let message = null;
      if (this.hasProperty(lastMessage, "deletedAt")) {
        message =
          this.loggedInUser.uid === lastMessage.sender.uid
            ? COMETCHAT_CONSTANTS.YOU_DELETED_THIS_MESSAGE
            : COMETCHAT_CONSTANTS.THIS_MESSAGE_DELETED;
      } else {
        switch (lastMessage.category) {
          case "message":
            message = this.getMessage(lastMessage);
            break;
          case "call":
            message = this.getCallMessage(lastMessage);
            break;
          case "action":
            message = lastMessage.message;
            break;
          case "custom":
            message = this.getCustomMessage(lastMessage);
            break;
          default:
            break;
        }
      }
      return message;
    },
    getMessage(lastMessage) {
      let message = "";
      switch (lastMessage.type) {
        case CometChat.MESSAGE_TYPE.TEXT:
          message = lastMessage.text;
          break;
        case CometChat.MESSAGE_TYPE.MEDIA:
          message = COMETCHAT_CONSTANTS.MEDIA_MESSAGE;
          break;
        case CometChat.MESSAGE_TYPE.IMAGE:
          message = COMETCHAT_CONSTANTS.MESSAGE_IMAGE;
          break;
        case CometChat.MESSAGE_TYPE.FILE:
          message = COMETCHAT_CONSTANTS.MESSAGE_FILE;
          break;
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = COMETCHAT_CONSTANTS.MESSAGE_VIDEO;
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = COMETCHAT_CONSTANTS.MESSAGE_AUDIO;
          break;
        case CometChat.MESSAGE_TYPE.CUSTOM:
          message = COMETCHAT_CONSTANTS.CUSTOM_MESSAGE;
          break;
        default:
          break;
      }

      return message;
    },
    getCallMessage(lastMessage) {
      let message = "";
      const type = lastMessage.type;

      switch (type) {
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = COMETCHAT_CONSTANTS.VIDEO_CALL;
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = COMETCHAT_CONSTANTS.AUDIO_CALL;
          break;
        default:
          break;
      }

      return message;
    },
    getCustomMessage(lastMessage) {
      let message = "";
      switch (lastMessage.type) {
        case enums.CUSTOM_TYPE_POLL:
          message = COMETCHAT_CONSTANTS.CUSTOM_MESSAGE_POLL;
          break;
        case enums.CUSTOM_TYPE_STICKER:
          message = COMETCHAT_CONSTANTS.CUSTOM_MESSAGE_STICKER;
          break;
        case enums.CUSTOM_TYPE_DOCUMENT:
          message = COMETCHAT_CONSTANTS.CUSTOM_MESSAGE_DOCUMENT;
          break;
        default:
          break;
      }

      return message;
    },
  },
};
</script>
<style scoped lang="scss">
.chat__item--hover {
  padding-bottom: 0px !important;
  &:hover {
    background-color: var(--chat-item-bg-color-hover);
    .last-msg-item {
      border-bottom: 1px solid transparent !important;
    }
  }
}

.last-msg-item {
  padding-bottom: 10px !important;
  border-bottom: 1px solid rgba(20, 20, 20, 0.1) !important;
}

.item__details__timestamp {
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.hidden {
  opacity: 0;
}
</style>