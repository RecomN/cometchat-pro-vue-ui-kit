<template>
  <div :style="styles.section">
    <h6 :style="styles.sectionHeader">{{ STRINGS.SHARED_MEDIA }}</h6>
    <div :style="styles.sectionContent" data-id="sharedmedia">
      <div :style="styles.mediaBtn">
        <span
          class="sharedmedia__button"
          :style="styles.imageButton"
          @click="mediaClickHandler('image')"
        >
          {{ STRINGS.PHOTOS }}
        </span>
        <span
          class="sharedmedia__button"
          :style="styles.videoButton"
          @click="mediaClickHandler('video')"
        >
          {{ STRINGS.VIDEOS }}
        </span>
        <span
          class="sharedmedia__button"
          :style="styles.fileButton"
          @click="mediaClickHandler('file')"
        >
          {{ STRINGS.DOCUMENT }}
        </span>
      </div>
      <div
        ref="messageContainer"
        :style="styles.mediaItem"
        @scroll="scrollHandler"
      >
        <template v-if="loading">
          <div :style="styles.message">{{ STRINGS.LOADING_MESSSAGE }}</div>
        </template>
        <template v-if="messageList.length">
          <template v-for="(message, key) in messageList">
            <div
              :key="key"
              :id="message.id"
              :style="styles.imageItem"
              v-if="messageType === 'image' && message.data.url"
              @click="message.viewImage = true"
              class="hover-effect"
            >
              <img
                :style="styles.imageItem.image"
                :alt="STRINGS.MEDIA_ITEM"
                :src="message.data.url"
              />
              <div class="image-viewer" v-if="message.viewImage">
                <div class="close-btn" @click.stop="message.viewImage = false">
                  <span>&#x2715;</span>
                </div>
                <div class="image-wrapper">
                  <img
                    :alt="STRINGS.MEDIA_ITEM"
                    :src="message.data.url"
                  />
                </div>
              </div>
            </div>
            <div
              :key="key"
              :id="message.id"
              :style="styles.videoItem"
              class="video-wrapper"
              v-if="messageType === 'video' && message.data.url"
            >
              <video controls :style="styles.videoItem.video">
                <source :src="message.data.url" />
              </video>
            </div>
            <div
              :key="key"
              :id="message.id"
              :style="styles.fileItem"
              v-if="messageType === 'file' && message.data.attachments"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                class="sharedmedia__button__anchor"
                :style="styles.fileItem.anchor"
                :href="message.data.attachments[0].url"
                >{{ message.data.attachments[0].name }}</a
              >
            </div>
          </template>
        </template>
        <template v-else>
          <div v-if="!loading" :style="styles.message">
            {{ STRINGS.ERROR_NO_RECORDS }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<!--eslint-disable-->
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { CometChatManager } from "../../../util/controller";
import { SharedMediaManager } from "./controller";

import * as enums from "../../../util/enums.js";

import * as style from "./style";

import fileIcon from "./resources/file-blue.svg";

let sharedMediaManager;

/**
 * Shows a preview of media messages that is shared in chat.
 *
 * @displayName CometChatSharedMediaView
 */
export default {
  name: "CometChatSharedMediaView",
  props: {
    /**
     * Type of chat item.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * The selected chat item object.
     */
    type: { ...DEFAULT_STRING_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Height of the wrapper container.
     */
    containerHeight: { ...DEFAULT_STRING_PROP },
  },
  data() {
    return {
      messageType: "image",
      messageList: [],
      loading: false,
    };
  },
  watch: {
    /**
     * Refreshes the manager on message type change.
     */
    messageType: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.messageList = [];
          this.refreshManager();
        }
      },
    },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        mediaBtn: style.mediaBtnStyle(),
        mediaItem: style.mediaItemStyle(),
        message: style.messageStyle(this.theme),
        sectionContent: style.sectionContentStyle(),
        section: style.sectionStyle(this.containerHeight),
        sectionHeader: style.sectionHeaderStyle(this.theme),
        fileButton: style.buttonStyle(this.messageType, "file"),
        imageButton: style.buttonStyle(this.messageType, "image"),
        videoButton: style.buttonStyle(this.messageType, "video"),
        imageItem: style.itemStyle(this.messageType, this.theme, fileIcon),
        videoItem: style.itemStyle(this.messageType, this.theme, fileIcon),
        fileItem: style.itemStyle(this.messageType, this.theme, fileIcon),
      };
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
  methods: {
    /**
     * Handles listener events
     */
    messageUpdateHandler(key, message) {
      this.logInfo("CometChatSharedMediaView :messageUpdateHandler", {
        key,
        message,
      });
      switch (key) {
        case enums.MESSAGE_DELETED:
          this.messageDeleted(message);
          break;
        case enums.MEDIA_MESSAGE_RECEIVED:
          this.messageReceived(message);
          break;
        default:
          break;
      }
    },
    /**
     * Called when message is deleted
     */
    messageDeleted(deletedMessage) {
      const messageType = deletedMessage.data.type;

      if (
        this.type === "group" &&
        deletedMessage.getReceiverType() === "group" &&
        deletedMessage.getReceiver().guid === this.item.guid &&
        messageType === this.messageType
      ) {
        const messageList = [...this.messageList];
        const filteredMessages = messageList.filter(
          (message) => message.id !== deletedMessage.id
        );

        this.messageList = filteredMessages;
        this.scrollToBottom = false;
      }
    },
    /**
     * Called when message is recieved
     */
    messageReceived(message) {
      const messageType = message.data.type;

      if (
        this.type === "group" &&
        message.getReceiverType() === "group" &&
        message.getReceiver().guid === this.item.guid &&
        messageType === this.state.messageType
      ) {
        let messages = [...this.state.messageList];
        messages = messages.concat(message);

        this.messageList = messages;
        this.scrollToBottom = false;
      }
    },
    /**
     * Gets list of all messages
     */
    async getMessages(scrollToBottom = false) {
      if (this.loading) {
        return;
      }

      try {
        this.loading = true;
        const user = await new CometChatManager().getLoggedInUser();

        this.loggedInUser = user;

        if (!sharedMediaManager) {
          this.createManager();
          this.attachListenerToManager();
        }

        const messages = await sharedMediaManager.fetchPreviousMessages();

        const messageList = [...messages, ...this.messageList];
        this.messageList = messageList.map(list => ({
          ...list,
          viewImage: false
        }))

        if (scrollToBottom) {
          this.scrollToBottom();
        }
      } catch (error) {
        console.error(
          "[CometChatSharedMediaView] getMessages fetchPrevious error",
          error
        );
      } finally {
        this.loading = false;
      }
    },
    /**
     * Handles scroll in container
     */
    scrollHandler(e) {
      try {
        const top = Math.round(e.target.scrollTop) === 0;
        if (top && this.messageList.length) {
          this.getMessages();
        }
      } catch (error) {
        this.logError("Eroor in scroll", error);
      }
    },
    /**
     * Handles medai click
     */
    mediaClickHandler(type) {
      if (this.loading) {
        return;
      }

      this.messageType = type;
    },
    /**
     * Scrolls the list to bottom
     */
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.messageContainer) {
          this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
        }
      });
    },
    createManager() {
      sharedMediaManager = new SharedMediaManager(
        this.item,
        this.type,
        this.messageType
      );
    },
    removeManager() {
      if (sharedMediaManager) {
        sharedMediaManager.removeListeners();
        sharedMediaManager = null;
      }
    },
    attachListenerToManager() {
      sharedMediaManager.attachListeners(this.messageUpdateHandler);
    },
    refreshManager() {
      this.removeManager();
      this.createManager();

      this.getMessages(true);

      this.attachListenerToManager();
    },
  },
  beforeMount() {
    this.refreshManager();
  },
  beforeDestroy() {
    this.removeManager();
  },
  beforeUnmount() {
    this.removeManager();
  },
};
</script>
<style scoped>
.sharedmedia__button:last-of-type::before {
  display: none;
}
.sharedmedia__button::before {
  content: "";
  top: 6px;
  width: 2px;
  right: -2px;
  height: 16px;
  position: absolute;
  display: var(--button-before-display);
  background-color: rgba(20, 20, 20, 0.12);
}
.sharedmedia__button__anchor:hover,
.sharedmedia__button__anchor:visited {
  color: var(--file-hover-color);
}

.video-wrapper {
  width: 100%;
}

.image-viewer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 5px;
  padding-bottom: 20px;
  z-index: 1;
}

.image-viewer .close-btn {
  text-align: right;
  font-size: 20px;
}

.close-btn span {
    display: inline-block;
    background: #A5A5A5;
    width: 23px;
    height: 23px;
    color: white;
    border-radius: 100%;
    text-align: center;
}

.image-wrapper {
  padding: 20px;
  padding-top: 5px;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper img {
  border: 1px solid rgb(223, 218, 218);
  max-width: 100%;
  max-height: 100%;
}

.hover-effect:hover {
  cursor: pointer;
}
</style>