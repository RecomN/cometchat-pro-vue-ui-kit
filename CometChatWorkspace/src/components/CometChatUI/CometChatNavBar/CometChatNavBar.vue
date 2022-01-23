<template>
  <div class="cometchat__unified__navbar">

    <template v-if="tab === 'contacts'">
      <!-- <comet-chat-user-list
        :item="item"
        :type="type"
        :theme="theme"
        :enable-close-menu="enableCloseMenu"
        @action="actionHandler"
      /> -->
      
      <!-- show user detail (**change the height to 90% to show the cometchat footer)-->
      <div style="height: 100%;" class="wrap-user-detail" v-if="userDetail">
        <!-- header -->
        <div class="header-user-detail" style="width:320px;height:64px;background:#D7226D;display:flex;align-items:center;padding: 16px;position:relative;">
          <!-- left arrow -->
          <div @click="toUserDetail" class="left-arrow-icon" style="cursor:pointer">
            <img class="left-arrow-img" style="width:25px;height:auto;" src="./resources/arrow-left-2x.png" alt="">
          </div>
          <!-- Details -->
          <div class="title-detail" style="color:#fff;font-weight: 600;font-size: 20px;line-height: 26px;position:absolute;left:37%;">Details</div>
        </div><!-- header -->
        <!-- body user detail-->
        <div style="padding: 16px;" class="body-user-detail">
          <!-- top -->
          <div class="top" style="display:flex;align-items:center;justify-content:space-between;">
            <!-- image and name,status -->
            <div class="wrap-image-and-name" style="display:flex;align-items:center;">
              <!-- img circle -->
              <img 
                :src="userDetail.avatar" 
                alt="avatar user" 
                class="img-avatar" 
                style="width:38px;height:38px;border-radius:9999px;">

              <!-- name and online status -->
              <div class="name-and-status" style="padding-left:10px">
                <div class="username" style="font-weight: 600;font-size: 15px;line-height: 22px;">
                  {{ userDetail.name }}
                </div>
                <div class="status-user" style="font-weight: normal;font-size: 12px;line-height: 20px;letter-spacing: -0.1px;color: rgba(20, 20, 20, 0.6);">
                  {{ userDetail.status }}
                </div>
              </div><!-- name and online status -->
            </div><!-- image and name,status -->

            <!-- red phone icon -->
            <img 
              @click="callUser(userDetail.uid)"
              class="phone-red" 
              style="width:25px;height:auto;cursor:pointer;" 
              src="./resources/phone-red-2x.png" 
              alt="">
          </div><!-- top -->

          <!-- date -->
          <div class="date" style="font-weight: 500;font-size: 12px;line-height: 20px;letter-spacing: -0.1px;text-transform: uppercase;color: rgba(20, 20, 20, 0.5);padding: 12px 0px;">
            {{ new Date(userDetail.lastActiveAt * 1000).toUTCString() }}
          </div><!-- date -->

          <!-- wrap incoming voice call -->
          <div 
            class="wrap-incoming-text-icon" 
            style="border-bottom:1px solid rgba(20, 20, 20, 0.1);padding:4px 0px 4px 0px;">
            <!-- flex-incoming-icon-->
            <div class="flex-incoming-icon" style="display:flex;align-items:center;justify-content:space-between;">
              <!-- left -->
              <div class="left-side" style="display:flex;align-items:center;">
                <!-- incoming icon -->
                <div class="incoming-icon" style="margin:4px">
                  <img style="width: 16px;height: auto;" class="img-incoming" src="./resources/incoming-icon-2x.png" alt="">
                </div>
                <!-- Incoming Vocie Call -->
                <div class="incoming-voice-call" style="font-weight: 600;font-size: 13px;line-height: 18px;letter-spacing: -0.1px;color: #464646;">
                  Incoming Voice Call
                </div>
              </div><!-- left -->
              
              <!-- incoming time -->
              <div style="font-weight: normal;font-size: 12px;line-height: 18px;text-align: right;letter-spacing: -0.1px;color: #141414;mix-blend-mode: normal;opacity: 0.4;" class="incoming-time">
                5:11 PM
              </div>
            </div><!-- flex-incoming-icon-->

            <!-- duration -->
            <div style="font-weight: normal;font-size: 13px;line-height: 18pxletter-spacing: -0.1px;color: rgba(20, 20, 20, 0.6);" class="duration">
              3m 49s
            </div>
          </div><!-- wrap incoming voice call -->

          <!-- wrap outgoing video call -->
          <div 
            class="wrap-incoming-text-icon" 
            style="border-bottom:1px solid rgba(20, 20, 20, 0.1);padding:4px 0px 4px 0px;">
            <!-- flex-incoming-icon-->
            <div class="flex-incoming-icon" style="display:flex;align-items:center;justify-content:space-between;">
              <!-- left -->
              <div class="left-side" style="display:flex;align-items:center;">
                <!-- outgoing icon -->
                <div class="incoming-icon" style="margin:4px">
                  <img style="width: 16px;height: auto;" class="img-incoming" src="./resources/outgoing-icon-2x.png" alt="">
                </div>
                <!-- Incoming Vocie Call -->
                <div class="incoming-voice-call" style="font-weight: 600;font-size: 13px;line-height: 18px;letter-spacing: -0.1px;color: #464646;">
                  Incoming Voice Call
                </div>
              </div><!-- left -->
              
              <!-- incoming time -->
              <div style="font-weight: normal;font-size: 12px;line-height: 18px;text-align: right;letter-spacing: -0.1px;color: #141414;mix-blend-mode: normal;opacity: 0.4;" class="incoming-time">
                5:11 PM
              </div>
            </div><!-- flex-incoming-icon-->

            <!-- duration -->
            <div style="font-weight: normal;font-size: 13px;line-height: 18pxletter-spacing: -0.1px;color: rgba(20, 20, 20, 0.6);" class="duration">
              3m 49s
            </div>
          </div><!-- wrap outgoing video call -->

          <!-- actions text-->
          <div style="font-weight: 500;font-size: 12px;line-height: 20px;letter-spacing: -0.1px;text-transform: uppercase;color: rgba(20, 20, 20, 0.5);margin-top: 20px;margin-bottom: 8px;" class="actions-text">
            Actions
          </div>

          <!-- send message link -->
          <div style="font-weight: 600;font-size: 15px;line-height: 20px;letter-spacing: -0.1px;color: rgb(51, 153, 255);padding: 10px 0px;border-bottom: 1px solid rgba(20, 20, 20, 0.1);" class="send-message-link">
            Send Message
          </div><!-- send message link -->

          <!-- View in Contacts link -->
          <div style="font-weight: 600;font-size: 15px;line-height: 20px;letter-spacing: -0.1px;color: rgb(51, 153, 255);padding: 10px 0px;border-bottom: 1px solid rgba(20, 20, 20, 0.1);" class="send-message-link">
            View in Contacts
          </div><!-- View in Contacts link -->

          <!-- Privacy & Support -->
          <div style="font-weight: 500;font-size: 12px;line-height: 20px;letter-spacing: -0.1px;text-transform: uppercase;color: rgba(20, 20, 20, 0.5);padding: 18px 0px;" class="privacy-support">
            Privacy & Support
          </div><!-- Privacy & Support -->

          <!-- Block User -->
          <div style="font-weight: 600;font-size: 15px;line-height: 20px;letter-spacing: -0.1px;color: #FF3B30;padding-top:10px" class="block-user">
            Block User
          </div><!-- Block User -->

        </div><!-- body user detail-->
      </div><!-- show user detail (**change the height to 90% to show the cometchat footer)-->

      <comet-chat-user-list-custom
        v-else
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
              @click="changeTab('contacts')"
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

    <!-- NAVBAR FOOTER -->
    <div v-if="showFooterNavbar" :style="styles.footer" class="sidebar__footer">
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

// cometchat user list custom
import { CometChatUserListCustom } from "../../Users";

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

//dd-edited 
import { mapGetters } from 'vuex'


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
    CometChatUserListCustom
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
  watch: {
    tab() {
      (this.tab === 'contacts') ? this.$store.dispatch('setShowFooterNavbar', false) : this.$store.dispatch('setShowFooterNavbar', true);
    }
  },
  computed: {
    ...mapGetters({
      userDetail: 'getUserDetail',
      showFooterNavbar: 'getShowFooterNavbar'
    }),
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
      users: null,
    }
  },
  methods: {
    // dd edited
    // call user
    callUser(userId) {
      // let receiverID = "UID";
      let callType = CometChat.CALL_TYPE.AUDIO;
      let receiverType = CometChat.RECEIVER_TYPE.USER;

      let call = new CometChat.Call(userId, callType, receiverType);

      CometChat.initiateCall(call).then(
        outGoingCall => {
          console.log("Call initiated successfully:", outGoingCall);
        }, error => {
          console.log("Call initialization failed with exception:", error);
        }
      );
    },

    // set userDetail to be null and get back to previous page
    toUserDetail() {
      this.$store.dispatch('setUserDetailToNull');
    },

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
/* hide the user detail */
/* .hide-the-user-detail {
  display:none;
} */
/* show the user detail */
/* .show-the-user-detail {
  display:block;
} */
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