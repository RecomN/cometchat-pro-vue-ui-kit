<template>
  <div class="cometchat__unified__navbar">
    <template v-if="tab === 'contacts'">
      <comet-chat-user-list
        :item="item"
        :type="type"
        :theme="theme"
        :enable-close-menu="enableCloseMenu"
        @action="actionHandler"
      />
    </template>
    <template v-else-if="tab === 'calls'">
      <comet-chat-calls-log-dedicated />
    </template>
    <template v-else-if="tab === 'conversations'">
      <comet-chat-conversation-list
        :item="item"
        :type="type"
        :theme="theme"
        :last-message="lastMessage"
        :group-to-leave="groupToLeave"
        :group-to-delete="groupToDelete"
        :group-to-update="groupToUpdate"
        :enable-close-menu="enableCloseMenu"
        :message-to-mark-read="messageToMarkRead"
        @action="actionHandler"
      />
    </template>
    <template v-else-if="tab === 'groups'">
      <comet-chat-group-list
        :item="item"
        :type="type"
        :theme="theme"
        :group-to-leave="groupToLeave"
        :group-to-delete="groupToDelete"
        :group-to-update="groupToUpdate"
        :enable-close-menu="enableCloseMenu"
        @action="actionHandler"
      />
    </template>
    <template v-else-if="tab === 'info'">
      <div class="info-tab-wrapper">
        <comet-chat-user-profile-dedicated :theme="theme" @action="actionHandler" />
      </div>
    </template>
    <div class="sejasa-footer">
      <div :style="styles.navbar" class="footer__navbar">
        <!-- <div class="sejasa-tab" :style="styles.item" @click="changeTab('calls')">
          <span :style="styles.phoneIcon"></span>
        </div> -->
        <div class="sejasa-tab" :style="styles.item" @click="changeTab('conversations')">
          <sejasa-badge-counter
            v-show="this.tab === 'conversations' && allUnreadMessages"
            class="nav-badge"
            :count="allUnreadMessages" />
          <span :style="styles.chatsIcon"></span>
        </div>
        <div class="sejasa-tab" :style="styles.item" @click="changeTab('info')">
          <span :style="styles.moreIcon"></span>
        </div>
        <!-- <div :style="styles.item" @click="changeTab('contacts')">
          <span :style="styles.contactIcon"></span>
        </div> -->
        <!-- <div :style="styles.item" @click="changeTab('groups')">
          <span :style="styles.groupIcon"></span>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon } from "../../../mixins/";

import { CometChatConversationList } from "../../ChatsDedicated/";
import { CometChatUserProfileDedicated } from "../../UserProfileDedicated/";
import { CometChatGroupList } from "../../Groups";
import { CometChatUserList } from "../../Users";
import { CometChatCallsLogDedicated } from "../../CallsDedicated/"
import sejasaBadgeCounter from "../components/SejasaBadgeCounter.vue"

import contactGreyIcon from "./resources/contacts-grey.png";
import contactBlueIcon from "./resources/contacts-blue.png";
import groupBlueIcon from "./resources/groups-blue.png";
import groupGreyIcon from "./resources/groups-grey.png";

import newChatRedIcon from './resources/new-chats-red-2x.png'
import newChatGreyIcon from './resources/new-chats-grey-2x.png'
import newPhoneRedIcon from './resources/new-phone-red-2x.png'
import newPhoneGreyIcon from './resources/new-phone-grey-2x.png'
import newUserInfoRedIcon from './resources/new-user-info-red-2x.png'
import newUserInfoGreyIcon from './resources/new-user-info-grey-2x.png'

import * as style from "./style";

/**
 * Navigation bar for switching tabs in CometChatUI.
 *
 * @displayName CometChatNavBar
 */
export default {
  name: "CometChatNavBar",
  mixins: [cometChatCommon],
  components: {
    CometChatConversationList,
    CometChatUserProfileDedicated,
    CometChatGroupList,
    CometChatUserList,
    CometChatCallsLogDedicated,
    sejasaBadgeCounter
  },
  props: {
    /**
     * Current active tab.
     * @values conversations, contacts, groups, info
     */
    tab: { ...DEFAULT_STRING_PROP },
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
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Last message in message list.
     */
    lastMessage: { ...DEFAULT_OBJECT_PROP },
    /**
     * The group selected to leave.
     */
    groupToLeave: { ...DEFAULT_OBJECT_PROP },
    /**
     * The group selected to update.
     */
    groupToUpdate: { ...DEFAULT_OBJECT_PROP },
    /**
     * The group selected to delete.
     */
    groupToDelete: { ...DEFAULT_OBJECT_PROP },
    /**
     * Shows/hides the close menu button.
     */
    enableCloseMenu: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * Message marked to read.
     */
    messageToMarkRead: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Unread messages from vuex
     */
    allUnreadMessages() {
      return this.$store.state.unreadMessages
    },
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        item: style.itemStyle(),
        footer: style.footerStyle(),
        navbar: style.navbarStyle(),
        phoneIcon: style.itemLinkStyle(
          newPhoneGreyIcon,
          newPhoneRedIcon,
          this.isCallHistoryActive
        ),
        chatsIcon: style.itemLinkStyle(
          newChatGreyIcon,
          newChatRedIcon,
          this.isChatsTabActive
        ),
        contactIcon: style.itemLinkStyle(
          contactGreyIcon,
          contactBlueIcon,
          this.isContactsTabActive
        ),
        groupIcon: style.itemLinkStyle(
          groupGreyIcon,
          groupBlueIcon,
          this.isGroupsTabActive,
          true
        ),
        moreIcon: style.itemLinkStyle(
          newUserInfoGreyIcon,
          newUserInfoRedIcon,
          this.isMoreTabActive
        ),
      };
    },
    /**
     * Whether chats tab is active.
     */
    isCallHistoryActive() {
      return this.tab === "calls";
    },
    isChatsTabActive() {
      return this.tab === "conversations";
    },
    /**
     * Whether users tab is active.
     */
    isContactsTabActive() {
      return this.tab === "contacts";
    },
    /**
     * Whether groups tab is active.
     */
    isGroupsTabActive() {
      return this.tab === "groups";
    },
    /**
     * Whether info tab is active.
     */
    isMoreTabActive() {
      return this.tab === "info";
    },
  },
  methods: {
    /**
     * Emits change tab event
     */
    changeTab(tab) {
      if (tab === 'conversations') {
        window.history.replaceState(null, '.', '.')
      }

      this.emitAction("tabChanged", { tab });
    },
    /**
     * Handles emitted action events
     */
    actionHandler({ action, ...rest }) {
      this.emitAction(action, { ...rest });
    },
  },
};
</script>
<style scoped lang="scss">
.cometchat__unified__navbar {
  height: 100%;
  width: 360px !important;
}
.cometchat__unified__navbar .chats__wrapper,
.cometchat__unified__navbar .groups__wrapper,
.cometchat__unified__navbar .contacts__wrapper {
  height: calc(100% - 74px) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__unified__navbar {
    width: 100% !important;
  }
}

/* SEJASA STYLE */
.sejasa-tab {
  position: relative;

  .nav-badge {
    position: absolute;
    top: 4px;
    right: 4px;
  }
}
.sejasa-footer {
  border-top: 1px solid #E7E7F0;
  padding-top: 20px;
}

.info-tab-wrapper {
  position: relative;
  height: calc(100% - 74px) !important;
}
</style>