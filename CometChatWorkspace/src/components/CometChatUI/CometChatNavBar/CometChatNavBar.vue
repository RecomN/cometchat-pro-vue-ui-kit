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
    
    <template v-else-if="tab === 'calls'">
      <!-- <comet-chat-group-list
        :item="item"
        :type="type"
        :theme="theme"
        :group-to-leave="groupToLeave"
        :group-to-delete="groupToDelete"
        :group-to-update="groupToUpdate"
        :enable-close-menu="enableCloseMenu"
        @action="actionHandler"
      /> -->

      <!-- dd-edited -->
      <!-- calls wraper -->
      <div class="calls-wraper">
        <!-- calls header -->
        <div class="calls-header">
          <!-- top content (close icon, text, phone icon)-->
          <div class="top-wraper">
            <!-- close icon-->
            <img 
              @click="closeCustom" 
              class="top-icon" 
              src="./resources/close-white-icon-2x.png" 
              alt="close icon">
            <!-- text -->
            <div class="text-call">Call</div>
            <!-- phone icon -->
            <img 
              @click="onPhoneClick"
              class="top-icon" 
              src="./resources/phone-plus-white-icon-2x.png" 
              alt="phone icon">
          </div><!-- top content (close icon, text, phone icon)-->
          <!-- switch button (all, missed) call-->
          <div class="switch-button-call">
            <!-- all -->
            <button 
              @click="onShowAllCall"
              :class="{ 'btn-call-active': isShowAllCall, 'btn-call-inactive': isShowMissedCall }"
              class="all-btn">All</button>
            <!-- missed -->
            <button 
              @click="onShowMissedCall"
              :class="{ 'btn-call-active': isShowMissedCall, 'btn-call-inactive': isShowAllCall }"
              class="miss-btn">Missed</button>
          </div><!-- switch button (all, missed) call-->
        </div><!-- calls header -->

        <!-- calls body -->
        <div class="calls-body">
          <div v-if="users">
            <ul>
              <li v-for="(user, index) in users" :key="index">
                {{ user }}
              </li>
            </ul>
          </div>

          <!-- ===== if there is no call ========= -->
          <!-- calls message wraper-->
          <div v-else class="calls-message-wraper">
            <!-- title -->
            <p class="title-text-message">Belum Ada Call</p>
            <!-- desc -->
            <p class="description-text-message">
              Kamu belum mempunyai riwayat call dengan penyedia jasa kami.
            </p>
          </div><!-- calls message -->
        </div><!-- calls body -->
      </div><!-- calls wraper -->

    </template>

    <template v-else-if="tab === 'info'">
      <comet-chat-user-profile :theme="theme" @action="actionHandler" />
    </template>

    <div :style="styles.footer" class="sidebar__footer">
      <div :style="styles.navbar" class="footer__navbar">

        <!-- phone icon -->
        <div :style="styles.item" @click="changeTab('calls')">
          <span :style="styles.phoneIcon"></span>
        </div>

        <!-- chats icon -->
        <div :style="styles.item" @click="changeTab('conversations')">
          <span :style="styles.chatsIcon"></span>
        </div>

        <!-- <div :style="styles.item" @click="changeTab('contacts')">
          <span :style="styles.contactIcon"></span>
        </div> -->

        <!-- <div :style="styles.item" @click="changeTab('groups')">
          <span :style="styles.groupIcon"></span>
        </div> -->

        <!-- more(dot) icon -->
        <div :style="styles.item" @click="changeTab('info')">
          <span :style="styles.moreIcon"></span>
        </div>
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

import { CometChatConversationList } from "../../Chats/";
import { CometChatUserProfile } from "../../UserProfile/";
// import { CometChatGroupList } from "../../Groups";
import { CometChatUserList } from "../../Users";

// import contactGreyIcon from "./resources/contacts-grey.png";
// import contactBlueIcon from "./resources/contacts-blue.png";

// import moreGreyIcon from "./resources/userInfo-grey.png";
// import moreBlueIcon from "./resources/userInfo-blue.png";

// -------new style-----------
import moreGreyIcon from "./resources/new-user-info-grey-2x.png";
import moreRedIcon from "./resources/new-user-info-red-2x.png";

// import groupBlueIcon from "./resources/groups-blue.png";
// import groupGreyIcon from "./resources/groups-grey.png";

// import chatGreyIcon from "./resources/chats-grey.png";
// import chatBlueIcon from "./resources/chats-blue.png";

// -------new style-----------
import chatGreyIcon from "./resources/new-chats-grey-2x.png";
import chatRedIcon from "./resources/new-chats-red-2x.png";

// -------new style-----------
import phoneRedIcon from "./resources/new-phone-red-2x.png";
import phoneGreyIcon from "./resources/new-phone-grey-2x.png";


import * as style from "./style";

// dd-edited
import { CometChat } from "@cometchat-pro/chat";


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
    CometChatUserProfile,
    // CometChatGroupList,
    CometChatUserList,
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
     * Computed styles for the component.
     */
    styles() {
      return {
        item: style.itemStyle(),
        footer: style.footerStyle(),
        navbar: style.navbarStyle(),
        phoneIcon: style.itemLinkStyle(
          phoneGreyIcon,
          phoneRedIcon,
          this.isCallHistoryActive
        ),
        chatsIcon: style.itemLinkStyle(
          chatGreyIcon,
          chatRedIcon,
          this.isChatsTabActive
        ),
        // contactIcon: style.itemLinkStyle(
        //   contactGreyIcon,
        //   contactBlueIcon,
        //   this.isContactsTabActive
        // ),
        // groupIcon: style.itemLinkStyle(
        //   groupGreyIcon,
        //   groupBlueIcon,
        //   this.isGroupsTabActive,
        //   true
        // ),
        moreIcon: style.itemLinkStyle(
          moreGreyIcon,
          moreRedIcon,
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
  data() {
    return {
      isShowAllCall: true,
      isShowMissedCall: false,
      users: null
    }
  },
  methods: {
    // dd edited
    // show users
    onPhoneClick() {
      let limit = 10;
      let usersRequest = new CometChat.UsersRequestBuilder()
                          .setLimit(limit)
                          .build();

      usersRequest.fetchNext().then(
        userList => {
          this.users = userList;
          console.log("User list received:", userList);
        }, error => {
          this.users = error;
          console.log("User list fetching failed with error:", error);
        }
      );
    },

    // show all call history
    onShowAllCall() {
      console.log('show all call');
      this.isShowAllCall = true;
      this.isShowMissedCall = false;
    },

    // show missed call
    onShowMissedCall() {
      console.log('show missed call');
      this.isShowMissedCall = true;
      this.isShowAllCall = false;
    },

    // close cometchat
    closeCustom() {
      // alert('close custom');
      this.$store.dispatch('setIsOpen', false)
    },

    /**
     * Emits change tab event
     */
    changeTab(tab) {
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
<style scoped>
/* dd-edited */
.calls-wraper {
  width:320px;
  height:90%;
  display:flex;
  flex-direction:column;
}
.calls-header {
  background:#D7226D;
  width:100%;
  height:114px;
  min-height: 114px;
  backdrop-filter:blur(59.8022px);
  display:flex;
  flex-direction:column;
  align-items:center;
}
.switch-button-call {
  width: 288px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  margin-top: 4px;
  padding: 0px 2px 0px 2px;
}
.btn-call-active {
  background: #fff;
  border-radius: 7px;
  box-shadow: 0px 3px 8px rgb(20 20 20 / 12%), 0px 3px 1px rgb(20 20 20 / 4%);
}
.btn-call-inactive {
  background: transparent;
  border-radius: 0px;
  box-shadow: none;
}
.all-btn {
  /* background: #fff; */
  height: 28px;
  /* border-radius: 7px; */
  border: none;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  width: 50%;
  /* box-shadow: 0px 3px 8px rgb(20 20 20 / 12%), 0px 3px 1px rgb(20 20 20 / 4%); */
}
.miss-btn {
  /* background: transparent; */
  height: 28px;
  /* border-radius: 7px; */
  border: none;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  width: 50%;
  /* box-shadow: 0px 3px 8px rgb(20 20 20 / 12%), 0px 3px 1px rgb(20 20 20 / 4%); */
}
.text-call {
  font-size: 20px;
  color: #fff;
  font-weight: 600;
  line-height: 26px;
  text-align: center;
}
.top-icon {
  width: 26px;
  height: auto;
  cursor: pointer;
  object-fit: cover;
  background-size: cover;
}
.top-wraper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
}
.calls-body {
  background: #fff;
  width: 100%;
  overflow-y: scroll;
  overflow-x: clip;
  padding: 4px 18px 4px 18px;
}
.calls-message-wraper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 0;
}
.description-text-message {
  color: rgb(70, 70, 70);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  padding: 10px 40px 0 40px;
  text-align: center;
}
.title-text-message {
  font-weight: 600;
  color: #1D1D1D;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
}
/* custom scroll bar */
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #ddd;
  width: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}/* custom scroll bar */


.cometchat__unified__navbar {
  height: 100%;
  /* width: 280px; */
  width: 100%;
}
.cometchat__unified__navbar .chats__wrapper,
.cometchat__unified__navbar .groups__wrapper,
.cometchat__unified__navbar .contacts__wrapper {
  height: calc(100% - 50px) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__unified__navbar {
    width: 100% !important;
  }
}
</style>