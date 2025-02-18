<template>
  <div :style="styles.root" class="sejasa-composer-wrapper">
    <transition name="slide">
      <div v-if="messageToBeEdited" :style="styles.previewContainer">
        <div :style="styles.previewHeading">
          <div :style="styles.previewText">{{ STRINGS.EDIT_MESSAGE }}</div>
          <span :style="styles.previewClose" @click="closeEditPreview"></span>
        </div>
        <div>{{ messageToBeEdited.text }}</div>
      </div>
    </transition>

    <transition name="slide">
      <comet-chat-smart-reply-preview
        :theme="theme"
        v-if="smartReplyOptions"
        :options="smartReplyOptions"
        @click="sendReplyMessage"
        @close="replyPreview = null"
      />
    </transition>

    <transition name="slide-big">
      <comet-chat-sticker-keyboard
        :theme="theme"
        v-if="showStickerPicker"
        @action="actionHandler"
      />
    </transition>

    <transition name="slide">
      <div v-if="isBlockedByMe" :style="styles.blockedBox">
        <p :style="styles.blockedBox.p">
          {{ STRINGS.BLOCKED_USER }}
        </p>
        <span :style="styles.blockedBox.span">
          {{ STRINGS.BLOCKED_DESCRIPTION }}
        </span>
      </div>
    </transition>

    <div>
      <div class="sejasa-input-message">
        <div class="sejasa-attachment-btn">
          <div class="composer__attachment_icon" @click="toggleFilePicker">
            <span :style="styles.attachmentIcon" class="attachment-btn">&nbsp;</span>
          </div>
          <div
            :style="styles.filePicker"
            :class="!showFilePicker && 'sejasa-filepicker'"
          >
            <div :style="styles.fileList">
              <label
                :for="componentId('videoUploaderRef')"
                class="composer__file__item"
                :title="STRINGS.ATTACH_VIDEO"
                :style="styles.videoFileItem"
              >
                <input
                  hidden
                  type="file"
                  accept="video/*"
                  :id="componentId('videoUploaderRef')"
                  @change="onVideoChange"
                />
              </label>
              <label
                :for="componentId('audioUploaderRef')"
                class="composer__file__item"
                :title="STRINGS.ATTACH_AUDIO"
                :style="styles.audioFileItem"
              >
                <input
                  hidden
                  type="file"
                  accept="audio/*"
                  :id="componentId('audioUploaderRef')"
                  @change="onAudioChange"
                />
              </label>
              <label
                :for="componentId('imageUploadRef')"
                class="composer__file__item"
                :title="STRINGS.ATTACH_IMAGE"
                :style="styles.imageFileItem"
              >
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  :id="componentId('imageUploadRef')"
                  :parentMessageId="parentMessageId"
                  @change="onImageChange"
                />
              </label>
              <label
                :for="componentId('fileUploaderRef')"
                class="composer__file__item"
                :title="STRINGS.ATTACH_FILE"
                :style="styles.docFileItem"
              >
                <input
                  type="file"
                  :id="componentId('fileUploaderRef')"
                  @change="onFileChange"
                />
              </label>
              <span
                class="composer__file__item"
                :style="styles.pollFileItem"
                :title="STRINGS.CREATE_POLL"
                @click="toggleCreatePoll"
              >
                &nbsp;
              </span>
            </div>
          </div>
        </div>
        <div class="compose-wrapper">
          <div
            dir="ltr"
            ref="messageInputRef"
            contenteditable="true"
            class="composer__input sejasa-custom-input"
            :style="styles.messageInput"
            :aria-disabled="messageSending"
            placeholder="Message"
            @blur="endTyping"
            @input="changeHandler"
            @click="updateSelection"
            @keypress="updateSelection"
            @keydown="sendMessageOnEnter"
          ></div>
          <div
            class="emoji-button"
            :title="STRINGS.EMOJI"
            :style="styles.composerIcon"
            @click="toggleEmojiPicker"
          >
            <img
              :alt="STRINGS.INSERT_EMOTICON"
              :style="styles.composerIcon.img"
              :src="icons[showEmojiPicker ? 'close' : 'emoji']"
            />
          </div>
        </div>
        <div :style="styles.stickyButton" ref="emojiPickerWrapperRef">
          <picker
            set="twitter"
            emoji="point_up"
            :data="emojiIndex"
            v-if="showEmojiPicker"
            :style="styles.emojiPicker"
            :title="STRINGS.PICK_YOUR_EMOJI"
            @select="emojiClicked"
          />
          <div
            v-if="canShowSend"
            :title="STRINGS.SEND_MESSAGE"
            :style="styles.composerIcon"
            @click="sendTextMessage"
          >
            <img
              :src="icons.send"
              :style="styles.composerIcon.img"
              :alt="STRINGS.SEND_MESSAGE"
            />
          </div>
        </div>
      </div>
      <div :style="styles.loader" class="composer__loader"></div>
    </div>
    <comet-chat-create-poll
      :item="item"
      :type="type"
      :theme="theme"
      :open="showCreatePoll"
      @close="toggleCreatePoll"
      @action="actionHandler"
    />
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import * as enums from "../../../util/enums";
import { propertyCheck, cometChatCommon } from "../../../mixins/";
import { getExtensionsDataFromMessage, getUnixTimestamp, ID } from "../../../util/common";

import CometChatCreatePoll from "../../Messages/Extensions/CometChatCreatePoll/CometChatCreatePoll";
import CometChatSmartReplyPreview from "../CometChatSmartReplyPreview/CometChatSmartReplyPreview";
import CometChatStickerKeyboard from "../CometChatStickerKeyboard/CometChatStickerKeyboard";

import { outgoingMessageAlert } from "../../../resources/audio/";

import closeIcon from "./resources/close.png";
import heartIcon from "./resources/heart.png";
import docIcon from "./resources/attachfile.png";
import pollIcon from "./resources/pollcreate.png";
import sendBlue from "./resources/sendmessage.png";
import audioIcon from "./resources/attachaudio.png";
import emojiIcon from "./resources/insertemoji.png";
import videoIcon from "./resources/attachvideo.png";
import imageIcon from "./resources/attachimage.png";
import roundedPlus from "./resources/rounded-plus.svg";
import stickerIcon from "./resources/insertsticker.png";

import * as style from "./style";
import CometChatManager from '../../../util/controller';
import { CometChatEvent } from '../../../util/CometChatEvent';

let sel, range;

/**
 * Used for composing all messages.
 *
 * @displayName CometChatMessageComposer
 */
export default {
  name: "CometChatMessageComposer",
  mixins: [propertyCheck, cometChatCommon],
  components: {
    Picker,
    CometChatCreatePoll,
    CometChatStickerKeyboard,
    CometChatSmartReplyPreview,
  },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * Type of chat item.
     */
    type: { ...DEFAULT_STRING_PROP },
    /**
     * Theme of the UI.
     */ theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The smart reply extension data.
     */
    smartReply: { ...DEFAULT_OBJECT_PROP },
    /**
     * The message selected to edit.
     */
    messageToEdit: { ...DEFAULT_OBJECT_PROP },
    /**
     * Id of parent for the given message.
     */
    parentMessageId: { ...DEFAULT_STRING_PROP },
    /**
     * Reaction name.
     */
    reaction: { ...DEFAULT_STRING_PROP, default: "heart" },
  },
  data() {
    return {
      isTyping: null,
      messageInput: "",
      messageType: "",
      replyPreview: null,
      showCreatePoll: false,
      messageSending: false,
      showFilePicker: false,
      showEmojiPicker: false,
      messageToBeEdited: null,
      showStickerPicker: false,
      emojiIndex: new EmojiIndex(data),
      loggedInUser: null,
      parentMessageIdData: this.parentMessageId
    };
  },
  watch: {
    /**
     * Focuses the input anytime the selected item changes.
     */
    item: {
      handler() {
        this.$nextTick(() => {
          if (this.$refs && this.$refs.messageInputRef) {
            this.$refs.messageInputRef.focus();
            this.updateSelection();
          }
        });
      },
      immediate: true,
    },
    /**
     * Updates the composer input value on selecting a message to edit.
     */
    messageToEdit: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.messageToBeEdited = newValue;

          if (newValue) {
            this.updateMessageTextDOM(newValue.text);
          } else {
            this.updateMessageTextDOM("");
          }
        }
      },
      deep: true,
    },
    /**
     * Updates local state on change.
     */
    smartReply: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.replyPreview = newValue;
        }
      },
      deep: true,
    },
    /**
     * Hides/Locks everything in composer, if blocked.
     */
    isBlockedByMe(newValue) {
      if (newValue) {
        this.showCreatePoll = false;
        this.showFilePicker = false;
        this.showEmojiPicker = false;
        this.showStickerPicker = false;
      }
    },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        filePicker: style.filePickerStyle(),
        emojiPicker: style.emojiPickerStyle(),
        previewText: style.previewTextStyle(),
        stickyButton: style.stickyButtonStyle(),
        composerInput: style.composerInputStyle(),
        root: style.chatComposerStyle(this.theme),
        previewHeading: style.previewHeadingStyle(),
        blockedBox: style.blockedBoxStyle(this.theme),
        inputInner: style.inputInnerStyle(this.theme),
        inputSticky: style.inputStickyStyle(this.theme),
        stickyAttachment: style.stickyAttachmentStyle(),
        previewClose: style.previewCloseStyle(closeIcon),
        fileList: style.fileListStyle(this.showFilePicker),
        docFileItem: style.fileItemStyle("doc", docIcon),
        pollFileItem: style.fileItemStyle("poll", pollIcon),
        videoFileItem: style.fileItemStyle("video", videoIcon),
        audioFileItem: style.fileItemStyle("audio", audioIcon),
        imageFileItem: style.fileItemStyle("image", imageIcon),
        composerIcon: style.composerIconStyle(this.isBlockedByMe),
        messageInput: style.messageInputStyle(this.isBlockedByMe),
        loader: style.loaderStyle(this.theme, this.messageSending),
        previewContainer: style.editPreviewContainerStyle(this.theme),
        attachmentIcon: style.attachmentIconStyle(
          roundedPlus,
          this.showFilePicker,
          this.isBlockedByMe
        ),
      };
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
    /**
     * Returns if user of selected item is blocked by current user.
     */
    isBlockedByMe() {
      return this.item.blockedByMe;
    },
    /**
     * Computed source of reaction icon.
     */
    reactionIconSrc() {
      return this.icons[enums.LIVE_REACTIONS[this.reaction]];
    },
    /**
     * Computes options from smart reply extension data.
     */
    smartReplyOptions() {
      let options = null;

      if (this.replyPreview) {
        const smartReplyObject = getExtensionsDataFromMessage(
          this.replyPreview,
          "smart-reply"
        );

        if (smartReplyObject) {
          options = [
            smartReplyObject["reply_positive"],
            smartReplyObject["reply_neutral"],
            smartReplyObject["reply_negative"],
          ];
        }
      }
      return options;
    },
    /**
     * Returns if send icon can be shown or not.
     */
    canShowSend() {
      return this.parentMessageId ? true : !!this.messageInput;
    },
    /**
     * Icons computed from file images.
     */
    icons() {
      return {
        send: sendBlue,
        close: closeIcon,
        emoji: emojiIcon,
        heart: heartIcon,
        sticker: stickerIcon,
      };
    },
  },
  methods: {
    componentId(ref) {
      let componentId = ref
      if(this.parentMessageId) {
        componentId += `-${this.parentMessageId}`
      }

      return componentId
    },
    /**
     * Handles emitted action events
     */
    actionHandler({ action, message, sticker }) {
      switch (action) {
        case "pollCreated":
          this.toggleCreatePoll();
          this.toggleFilePicker();

          //temporary check; custom data listener working for sender too
          if (this.type === "user") {
            this.emitAction("pollCreated", { messages: [message] });
          }

          break;
        case "sendSticker":
          this.sendSticker(sticker);
          break;
        case "closeSticker":
          this.toggleStickerPicker();
          break;
        default:
          break;
      }
    },
    /**
     * Toggles file picker
     */
    toggleFilePicker() {
      if (this.isBlockedByMe) return;

      this.showFilePicker = !this.showFilePicker;
    },
    /**
     * Toggles sticker picker
     */
    toggleStickerPicker() {
      if (this.isBlockedByMe) return;

      this.showStickerPicker = !this.showStickerPicker;
    },
    /**
     * Emits "clearEditPreview" action
     */
    closeEditPreview() {
      this.emitAction("clearEditPreview");
    },
    /**
     * Emits reaction events
     */
    sendReaction(event) {
      try {
        if (this.isBlockedByMe) return;

        const typingInterval = enums.LIVE_REACTION_TIMER;
        this.emitAction("sendReaction");
        this.sendMessage()

        if (event.persist) {
          event.persist();
        }

        setTimeout(() => {
          this.emitAction("stopReaction");
        }, typingInterval);
      } catch (error) {
        this.logError("Error sending reaction", error);
      }
    },
    /**
     * Send transient message
     */
    sendMessage() {
      //fetching the metadata type from constants
      const metadata = { type: enums.LIVE_REACTION_KEY, reaction: this.reaction };
      const receiverType = this.type === CometChat.ACTION_TYPE.TYPE_USER ? CometChat.ACTION_TYPE.TYPE_USER : CometChat.ACTION_TYPE.TYPE_GROUP;
      const receiverId = (this.type === CometChat.ACTION_TYPE.TYPE_USER) ? this.item.uid : this.item.guid;

      let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, metadata);
      CometChat.sendTransientMessage(transientMessage);
    },
    /**
     * Sends start typing indicator signal to server
     */
    startTyping(metadata, timer = 5000) {
      if (this.isTyping) {
        return false;
      }

      try {
        let { receiverId, receiverType } = this.getReceiverDetails();

        let typingNotification = new CometChat.TypingIndicator(
          receiverId,
          receiverType,
          metadata || undefined
        );
        CometChat.startTyping(typingNotification);

        this.isTyping = setTimeout(() => {
          clearTimeout(this.isTyping);
          this.isTyping = null;
        }, timer);
      } catch (error) {
        this.logError("Error sending typing indicator", error);
      }
    },
    /**
     * Sends end typing indicator signal to server
     */
    endTyping() {
      try {
        let { receiverId, receiverType } = this.getReceiverDetails();

        let typingNotification = new CometChat.TypingIndicator(
          receiverId,
          receiverType
        );
        CometChat.endTyping(typingNotification);
      } catch (error) {
        this.logError("Error sending typing indicator", error);
      }
    },
    /**
     * Handles change in input
     */
    changeHandler(event) {
      try {
        this.startTyping();

        const element = event.target;
        let input = element.textContent.trim();

        if (!input.length) {
          event.target.textContent = input;
        }

        this.setMessageInput(element);
      } catch (error) {
        this.logError("Error in change handler", error);
      }
    },
    /**
     * Handles emoji click
     */
    emojiClicked(emoji) {
      this.$nextTick(() => {
        try {
          if (this.$refs && this.$refs.messageInputRef) {
            const element = this.$refs.messageInputRef;
            element.focus();

            this.pasteHtmlAtCaret(emoji.native);

            this.setMessageInput(element);
          }
        } catch (error) {
          this.logError("Error in emoji click", error);
        }
      });
    },
    /**
     * Pastes given html at caret position
     */
    pasteHtmlAtCaret(html) {
      try {
        if (sel && range) {
          range.deleteContents();

          let el = document.createElement("div");
          el.innerHTML = html;
          let frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        } else if (document.selection && document.selection.type != "Control") {
          document.selection.createRange().pasteHTML(html);
        }
      } catch (error) {
        this.logError("Error pasting html to caret", error);
      }
    },
    /**
     * Updates caret selection object
     */
    updateSelection() {
      this.$nextTick(() => {
        try {
          if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
              range = sel.getRangeAt(0);
            }
          }
        } catch (error) {
          this.logError("Error updating selection", error);
        }
      });
    },
    /**
     * Sets message input
     */
    setMessageInput(element) {
      this.messageInput = element.innerText;
      this.messageType = "text";
    },
    /**
     * Calls send message on enter
     */
    sendMessageOnEnter(event) {
      try {
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault();

          this.updateMessageTextDOM("");
          this.sendTextMessage();
          return true;
        }
      } catch (error) {
        this.logError("Error sending message on enter", error);
      }
    },
    /**
     * Helper function to upload media files
     */
    uploadMedia(event, type) {
      try {
        const uploadedFile = event.target.files["0"];

        if (!uploadedFile) {
          return false;
        }

        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const newFile = new File(
              [reader.result],
              uploadedFile.name,
              uploadedFile
            );
            this.sendMediaMessage(newFile, type);
          },
          false
        );

        reader.readAsArrayBuffer(uploadedFile);
      } catch (error) {
        this.logError("Error uploading media", error);
      }
    },
    /**
     * Uploads on video chnage
     */
    onVideoChange(event) {
      if (this.isBlockedByMe) return;

      this.uploadMedia(event, "video");
    },
    /**
     * Uploads on audio chnage
     */
    onAudioChange(event) {
      if (this.isBlockedByMe) return;

      this.uploadMedia(event, "audio");
    },
    /**
     * Uploads on image chnage
     */ 
    onImageChange() {
      if (this.isBlockedByMe) return;

      this.uploadMedia(event, "image");
    },
    /**
     * Uploads on file chnage
     */ 
    onFileChange(event) {
      if (this.isBlockedByMe) return;

      this.uploadMedia(event, "file");
    },
    /**
     * Sends sticker
     */
    async sendSticker(sticker) {
      if (this.isBlockedByMe) return;

      try {
        const { receiverId, receiverType } = this.getReceiverDetails();

        const customData = {
          sticker_url: sticker.stickerUrl,
          sticker_name: sticker.stickerName,
        };
        const customType = enums.CUSTOM_TYPE_STICKER;

        const customMessage = new CometChat.CustomMessage(
          receiverId,
          receiverType,
          customType,
          customData
        );

        if (this.parentMessageId) {
          customMessage.setParentMessageId(this.parentMessageId);
        }

        customMessage.setSender(this.loggedInUser);
        customMessage.setReceiver(this.type);
        customMessage.setMetadata({ incrementUnreadCount: true });
        customMessage._composedAt = getUnixTimestamp();
        customMessage._id = ID();

        
        if(this.parentMessageId) {
          CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_COMPOSED"], { messages: [customMessage] });
        } else {
          CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_COMPOSED"], { messages: [customMessage] });
        }
        this.playAudio();
        
        CometChat.sendMessage(customMessage)
          .then(message => {
            const newMessageObj = { ...message, _id: customMessage._id };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_SENT"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_SENT"], { messages: [newMessageObj] });
            }
          })
          .catch(error => {
            const newMessageObj = { ...customMessage, error: error };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_SENT"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_SENT"], { messages: [newMessageObj] });
            }
        });
      } catch (error) {
        this.logError("custom message sending failed with error", error);
      }
    },
    /**
     * Sends any media message
     */
    async sendMediaMessage(messageInput, messageType) {
      if (this.isBlockedByMe) return;

      try {
        this.toggleFilePicker();
        
        this.endTyping();
        
        let receiverId;
        let receiverType = this.type;
        if (this.type === "user") {
          receiverId = this.item.uid;
        } else if (this.type === "group") {
          receiverId = this.item.guid;
        }

        let mediaMessage = new CometChat.MediaMessage(
          receiverId,
          messageInput,
          messageType,
          receiverType
        );

        if (this.parentMessageId) {
          mediaMessage.setParentMessageId(this.parentMessageId);
        }

        mediaMessage.setSender(this.loggedInUser);
        mediaMessage.setReceiver(this.type);
        mediaMessage.setType(messageType);
        mediaMessage.setMetadata({
          [enums.FILE_METADATA]: messageInput,
        });
        mediaMessage._composedAt = getUnixTimestamp();
        mediaMessage._id = ID();

        if(this.parentMessageId) {
          CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_COMPOSED"], { messages: [mediaMessage] });
        } else {
          CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_COMPOSED"], { messages: [mediaMessage] });
        }
        this.playAudio();
        
        CometChat.sendMessage(mediaMessage)
          .then(message => {
            const newMessageObj = { ...message, _id: mediaMessage._id };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_SENT"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_SENT"], { messages: [newMessageObj] });
            }
          })
          .catch(error => {
            const newMessageObj = { ...mediaMessage, error: error };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["ERROR_IN_SENDING_THREAD_MESSAGE"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["ERROR_IN_SENDING_MESSAGE"], { messages: [newMessageObj] });
            }
        });
      } catch (error) {
        this.logError("Message sending failed with error:", error);
      }
    },
    /**
     *
     */
    async sendReplyMessage(messageInput) {
      if (this.isBlockedByMe) return;

      this.replyPreview = null;

      try {
        let { receiverId, receiverType } = this.getReceiverDetails();

        let textMessage = new CometChat.TextMessage(
          receiverId,
          messageInput,
          receiverType
        );

        if (this.parentMessageId) {
          textMessage.setParentMessageId(this.parentMessageId);
        }

        textMessage.setSender(this.loggedInUser);
        textMessage.setReceiver(this.type);
        textMessage._composedAt = getUnixTimestamp();
        textMessage._id = ID();

        
        if(this.parentMessageId) {
          CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_COMPOSED"], { messages: [textMessage] });
        } else {
          CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_COMPOSED"], { messages: [textMessage] });
        }
        this.playAudio();
        this.replyPreview = null;

        CometChat.sendMessage(textMessage)
          .then(message => {
            const newMessageObj = { ...message, _id: textMessage._id };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_SENT"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_SENT"], { messages: [newMessageObj] });
            }
          })
          .catch(error => {
            const newMessageObj = { ...textMessage, error: error };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["ERROR_IN_SENDING_THREAD_MESSAGE"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["ERROR_IN_SENDING_MESSAGE"], { messages: [newMessageObj] });
            }
        });
      } catch (error) {
        this.logError("Message sending failed with error:", error);
      }
    },
    /**
     * Sends text message
     */
    async sendTextMessage() {
      if (this.isBlockedByMe) return;

      try {
        if (this.showEmojiPicker) {
          this.showEmojiPicker = false;
        }

        if (!this.messageInput.trim().length) {
          return false;
        }

        if (this.messageToBeEdited) {
          this.editMessage();
          return false;
        }

        let { receiverId, receiverType } = this.getReceiverDetails();

        let messageInput = this.messageInput.trim();
        let textMessage = new CometChat.TextMessage(
          receiverId,
          messageInput,
          receiverType
        );

        if (this.parentMessageId) {
          textMessage.setParentMessageId(this.parentMessageId);
        }
        textMessage.setSender(this.loggedInUser);
        textMessage.setReceiver(this.type);
        textMessage.setText(messageInput);
        textMessage._composedAt = getUnixTimestamp();
        textMessage._id = ID();

        this.endTyping();
        if(this.parentMessageId) {
          CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_COMPOSED"], { messages: [textMessage] });
        } else {
          CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_COMPOSED"], { messages: [textMessage] });
        }
        this.messageInput = "";
        this.updateMessageTextDOM("");
        this.playAudio();
        
        CometChat.sendMessage(textMessage)
          .then(message => {
            const newMessageObj = { ...message, _id: textMessage._id };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["THREAD_MESSAGE_SENT"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["MESSAGE_SENT"], { messages: [newMessageObj] });
            }
          })
          .catch(error => {
            const newMessageObj = { ...textMessage, error: error };
            if(this.parentMessageId) {
              CometChatEvent.triggerHandler(enums.EVENTS["ERROR_IN_SENDING_THREAD_MESSAGE"], { messages: [newMessageObj] });
            } else {
              CometChatEvent.triggerHandler(enums.EVENTS["ERROR_IN_SENDING_MESSAGE"], { messages: [newMessageObj] });
            }
        });
      } catch (error) {
        this.logError("Message sending failed with error:", error);
      }
    },
    /**
     * Edits message
     */
    async editMessage() {
      const messageToBeEdited = this.messageToBeEdited;

      try {
        let { receiverId, receiverType } = this.getReceiverDetails();

        let messageText = this.messageInput.trim();
        let textMessage = new CometChat.TextMessage(
          receiverId,
          messageText,
          receiverType
        );

        textMessage.setId(messageToBeEdited.id);

        this.endTyping();

        const message = await CometChat.editMessage(textMessage);
        this.playAudio();
        this.messageSending = false;

        this.closeEditPreview();

        this.emitAction("messageEdited", { message });
      } catch (error) {
        this.messageSending = false;
        this.logError("Message editing failed with error:", error);
      }
    },
    /**
     * Toggles create poll modal
     */
    toggleCreatePoll() {
      if (this.isBlockedByMe) return;

      this.showCreatePoll = !this.showCreatePoll;
    },
    /**
     * Toggles emoji picker
     */
    toggleEmojiPicker() {
      if (this.isBlockedByMe) return;

      this.showEmojiPicker = !this.showEmojiPicker;
    },
    /**
     * Updates text content of inout in DOM
     */
    updateMessageTextDOM(text = "") {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.messageInputRef) {
          this.$refs.messageInputRef.textContent = text;
        }
      });
    },
    /**
     * Gets receiver details
     */
    getReceiverDetails() {
      let receiverId;
      let receiverType;
      try {
        if (this.type === "user") {
          receiverId = this.item.uid;
          receiverType = CometChat.RECEIVER_TYPE.USER;
        } else if (this.type === "group") {
          receiverId = this.item.guid;
          receiverType = CometChat.RECEIVER_TYPE.GROUP;
        }

        return { receiverId, receiverType };
      } catch (error) {
        this.logError("Error fetching receiver details", error);
      }
    },
    /**
     * Plays composer message sound
     */
    playAudio() {
      if (this.canPlayAudio) {
        this.audio.currentTime = 0;
        this.audio.play();
      }
    },
  },
  async mounted() {
    this.audio = new Audio(outgoingMessageAlert);
    const user = await new CometChatManager().getLoggedInUser();
    this.loggedInUser = user
  },
};
</script>
<style scoped lang="scss">
.slide-enter-active {
  animation: slide 0.4s ease-out;
}
.slide-leave-active {
  animation: slide 0.4s ease-out reverse;
}
.slide-big-enter-active {
  animation: slide-big 0.4s ease-out;
}
.slide-big-leave-active {
  animation: slide-big 0.4s ease-out reverse;
}
.composer__input:empty::before {
  content: attr(placeholder);
  color: rgb(153, 153, 153);
  pointer-events: none;
  display: block;
}
.composer__attachment_icon {
  margin: "auto 0";
}
.composer__file__item {
  background-size: contain !important;
}
.composer__file__item > input {
  /* position: absolute;
  bottom: -50vh; */
  visibility: hidden;
  display: block;
  width: 0;
  height: 0;
}
.composer__loader {
  background: linear-gradient(
    -45deg,
    var(--loader-background-color-1),
    var(--loader-background-color-2)
  );
  background-size: 400% 400%;
  animation: gradient 0.5s ease infinite;
}
@keyframes slide {
  from {
    bottom: -60px;
  }
  to {
    bottom: 0px;
  }
}
@keyframes slide-big {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  35% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// SEJASA STYLE
.sejasa-composer-wrapper {
  min-height: 0px !important;
  border-top: 1px solid #E7E7F0;
  .compose-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;

    .emoji-button {
      position: absolute !important;
      right: 12px !important;
      bottom: 15px !important;
      z-index: 2;
    }
  }
  .sejasa-input-message {
    display: flex !important;
    align-items: center !important;
    .sejasa-attachment-btn {
      display: flex;
      padding-top: 10px;

      .sejasa-filepicker {
        width: 0px !important;
      }
      .attachment-btn {
        width: 18px !important;
        height: 18px !important;
        border-radius: 50% !important;
      }
    }
    .sejasa-custom-input {
      background: rgba(20, 20, 20, 0.04) !important;
      box-shadow: inset 0px 0px 0px 1px rgba(20, 20, 20, 0.04) !important;
      border-radius: 12px !important;
      padding: 12px 10px !important;
      font-size: 16px !important;
      min-height: auto !important;
    }
  }
}
</style>