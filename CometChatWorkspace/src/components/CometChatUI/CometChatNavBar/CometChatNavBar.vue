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
      <div class="wrap-user-detail" v-if="userDetail">
        <!-- header -->
        <div class="header-user-detail">
          <!-- left arrow -->
          <div @click="toUserDetail" class="left-arrow-icon">
            <img
              class="left-arrow-img"
              src="./resources/arrow-left-2x.png"
              alt=""
            />
          </div>
          <!-- Details -->
          <div class="title-detail">Details</div>
        </div>
        <!-- header -->
        <!-- body user detail-->
        <div class="body-notifikasi">
          <!-- top -->
          <div class="top-user-detail">
            <!-- image and name,status -->
            <div class="flex-items">
              <!-- img circle -->
              <img
                :src="userDetail.avatar"
                alt="avatar user"
                class="img-avatar"
              />

              <!-- name and online status -->
              <div class="name-and-status">
                <div class="username">
                  {{ userDetail.name }}
                </div>
                <div class="status-user">
                  {{ userDetail.status }}
                </div>
              </div>
              <!-- name and online status -->
            </div>
            <!-- image and name,status -->

            <!-- red phone icon @click="emitAction('audioCall')" -->
            <img
              @click="callUser(userDetail.uid)"
              class="phone-red-icon"
              src="./resources/phone-red-2x.png"
              alt=""
            />
          </div>
          <!-- top -->

          <!-- date -->
          <div class="date-user-detail">
            {{ new Date(userDetail.lastActiveAt * 1000).toUTCString() }}
          </div>
          <!-- date -->

          <!-- wrap incoming voice call -->
          <div class="wrap-incoming-text-icon">
            <!-- flex-incoming-icon-->
            <div class="top-user-detail">
              <!-- left -->
              <div class="flex-items">
                <!-- incoming icon -->
                <div class="incoming-icon">
                  <img
                    class="img-incoming"
                    src="./resources/incoming-icon-2x.png"
                    alt=""
                  />
                </div>
                <!-- Incoming Vocie Call -->
                <div class="incoming-voice-call">Incoming Voice Call</div>
              </div>
              <!-- left -->

              <!-- incoming time -->
              <div class="incoming-time">5:11 PM</div>
            </div>
            <!-- flex-incoming-icon-->

            <!-- duration -->
            <div class="duration">3m 49s</div>
          </div>
          <!-- wrap incoming voice call -->

          <!-- wrap outgoing video call -->
          <div class="wrap-incoming-text-icon">
            <!-- flex-incoming-icon-->
            <div class="flex-incoming-icon">
              <!-- left -->
              <div class="flex-items">
                <!-- outgoing icon -->
                <div class="incoming-icon">
                  <img
                    class="img-incoming"
                    src="./resources/outgoing-icon-2x.png"
                    alt=""
                  />
                </div>
                <!-- Incoming Vocie Call -->
                <div class="incoming-voice-call">Outgoing Video Call</div>
              </div>
              <!-- left -->

              <!-- incoming time -->
              <div class="incoming-time">5:11 PM</div>
            </div>
            <!-- flex-incoming-icon-->

            <!-- duration -->
            <div class="duration">3m 49s</div>
          </div>
          <!-- wrap outgoing video call -->

          <!-- actions text-->
          <div class="actions-text">Actions</div>

          <!-- send message link -->
          <div class="send-message-link">Send Message</div>
          <!-- send message link -->

          <!-- View in Contacts link -->
          <div class="send-message-link">View in Contacts</div>
          <!-- View in Contacts link -->

          <!-- Privacy & Support -->
          <div class="privacy-support">Privacy & Support</div>

          <!-- Block User -->
          <div
            class="block-user"
            @click="emitAction(item.blockedByMe ? 'unblockUser' : 'blockUser')"
          >
            <!-- Block User -->
            {{ item.blockedByMe ? "Unblock User" : "Block User" }}
          </div>
          <!-- Block User -->
        </div>
        <!-- body user detail-->
      </div>
      <!-- show user detail (**change the height to 90% to show the cometchat footer)-->

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
              alt="close icon"
            />
            <!-- text -->
            <div class="text-call">Call</div>
            <!-- phone icon -->
            <img
              @click="changeTab('contacts')"
              class="top-icon"
              src="./resources/phone-plus-white-icon-2x.png"
              alt="phone icon"
            />
          </div>
          <!-- top content (close icon, text, phone icon)-->
          <!-- switch button (all, missed) call-->
          <div class="switch-button-call">
            <!-- all -->
            <button
              @click="onShowAllCall"
              :class="{
                'btn-call-active': isShowAllCall,
                'btn-call-inactive': isShowMissedCall,
              }"
              class="all-btn"
            >
              All
            </button>
            <!-- missed -->
            <button
              @click="onShowMissedCall"
              :class="{
                'btn-call-active': isShowMissedCall,
                'btn-call-inactive': isShowAllCall,
              }"
              class="miss-btn"
            >
              Missed
            </button>
          </div>
          <!-- switch button (all, missed) call-->
        </div>
        <!-- calls header -->

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
          </div>
          <!-- calls message -->
        </div>
        <!-- calls body -->
      </div>
      <!-- calls wraper -->
    </template>

    <template v-else-if="tab === 'info'">
      <!-- hide this when clicked on notifications -->
      <comet-chat-user-profile
        v-if="showMoreSection"
        :theme="theme"
        @action="actionHandler"
      />

      <!-- showNotifications -->
      <div v-if="showNotifications" class="notifications">
        <!-- header -->
        <div class="header-user-detail">
          <!-- left arrow -->
          <div @click="toShowMore" class="left-arrow-icon">
            <img
              class="left-arrow-img"
              src="./resources/arrow-left-2x.png"
              alt=""
            />
          </div>

          <!-- Notifikasi -->
          <div class="title-detail">Notifikasi</div>
        </div>
        <!-- body notifikasi-->
        <div class="body-notifikasi">
          <!-- Show Notifications -->
          <div class="show-notifikasi">
            <div class="text-notif">Show Notifications</div>
            <div class="checkbox-notif" @click="checkedNotif = !checkedNotif">
              <input
                :checked="checkedNotif"
                class="checkbox-input"
                type="checkbox"
                name=""
                id=""
              />
            </div>
          </div>
          <!-- Show Preview -->
          <div class="show-notifikasi">
            <div class="text-notif">Show Preview</div>
            <div
              class="checkbox-notif"
              @click="checkedPreview = !checkedPreview"
            >
              <input
                :checked="checkedPreview"
                class="checkbox-input"
                type="checkbox"
                name=""
                id=""
              />
            </div>
          </div>
          <!-- desc Preview message text inside new message notifications-->
          <div class="desc-notif">
            Preview message text inside new message notifications.
          </div>
          <!-- More -->
          <div class="more-class">More</div>
          <!-- Reset Notification Settings -->
          <div class="reset-notif">Reset Notification Settings</div>
          <!-- Reset all notification settings, including custom notification settings for your chats. -->
          <div class="reset-all">
            Reset all notification settings, including custom notification
            settings for your chats.
          </div>
        </div>
      </div>

      <!-- show privacy -->
      <div v-if="showPrivacy" class="privacy-security">
        <!-- header -->
        <div class="header-user-detail">
          <!-- left arrow -->
          <div @click="toShowMore" class="left-arrow-icon">
            <img
              class="left-arrow-img"
              src="./resources/arrow-left-2x.png"
              alt=""
            />
          </div>
          <!-- Privasi dan Keamanan -->
          <div class="title-detail-privacy">Privasi dan Keamanan</div>
        </div>
        <!-- body privacy security-->
        <div class="body-notifikasi">
          <!-- Blocked Users -->
          <div
            class="show-notifikasi-privacy"
            :class="{
              'flex-to-col': isShowUserBlocked,
              'flex-to-row': !isShowUserBlocked,
            }"
          >
            <div class="text-notif">Blocked Users</div>
            <div
              title="click to show/hide"
              @click="showBlockedUserList"
              class="blocked-users-count"
              style="cursor: pointer"
            >
              {{ blockedUser }} {{ blockedUser <= 1 ? "user" : "users" }}
            </div>
            <!-- show user blocked list -->
            <div
              v-if="isShowUserBlocked"
              class="show-user-blocked-list"
              style="
                width: 100%;
                max-height: 200px;
                overflow: auto;
                padding: 0px 8px 12px 8px;
              "
            >
              <div
                v-for="(user, index) in blockedUserList"
                :key="index"
                class="user-list"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  color: rgba(20, 20, 20, 0.5);
                  font-weight: 500;
                  padding-top: 8px;
                "
              >
                <div class="user-name">
                  {{ user.name }}
                </div>
                <div
                  @click="onUnblockUser(user.uid)"
                  class="unblock"
                  style="
                    color: #d7226d;
                    cursor: default;
                    background: #f2f2f2;
                    border-radius: 4px;
                    padding: 1px 6px;
                    font-weight: 600;
                  "
                >
                  Unblock
                </div>
              </div>
            </div>
          </div>

          <!-- Privacy -->
          <!--<div class="privacy-text">Privacy</div>-->

          <!-- Groups --><!--
          <div class="show-notifikasi">            
            <div class="text-notif">Groups</div>
            <div class="group-calls">Everybody</div>
          </div>-->

          <!-- Calls --><!--
          <div class="show-notifikasi">            
            <div class="text-notif">Calls</div>
            <div class="group-calls">Everybody</div>
          </div>-->
        </div>
      </div>

      <!-- show chats -->
      <div v-if="showChats" class="notif-chats">
        <!-- header -->
        <div class="header-user-detail">
          <!-- left arrow -->
          <div @click="toShowMore" class="left-arrow-icon">
            <img
              class="left-arrow-img"
              src="./resources/arrow-left-2x.png"
              alt=""
            />
          </div>
          <!-- Chats -->
          <div class="title-detail">Chats</div>
        </div>
        <!-- body privacy security-->
        <div class="body-notifikasi">
          <!-- Clear All Chats -->
          <div class="show-notifikasi">
            <div class="text-notif-red">Clear All Chats</div>
          </div>

          <!-- Delete All Chats -->
          <div class="show-notifikasi">
            <div class="text-notif-red">Delete All Chats</div>
          </div>
        </div>
      </div>
    </template>

    <!-- call screen custom -->
    <!-- <div 
          :class="{'show-custom-screen': calling, 'hide-custom-screen' : !calling}" class="custom-screen" 
          id="callScreen"></div> -->
    <div
      :class="[calling ? 'show-custom-screen' : 'hide-custom-screen']"
      class="custom-screen"
      id="callScreen"
    ></div>

    <!-- NAVBAR FOOTER -->
    <div v-if="showFooterNavbar" :style="styles.footer" class="sidebar__footer">
      <div :style="styles.navbar" class="footer__navbar">
        <!-- phone icon -->
        <!-- <div :style="styles.item" @click="changeTab('calls')">
          <span :style="styles.phoneIcon"></span>
        </div> -->

        <!-- chats icon -->
        <div
          style="position: relative"
          :style="styles.item"
          @click="changeTab('conversations')"
        >
          <!-- unread msg count -->
          <span v-if="unreadMsgFromUsers" class="circle-unread-msg-from-users">
            {{ unreadMsgFromUsers }}
          </span>
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
import { mapGetters } from "vuex";

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
    CometChatUserListCustom,
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
      this.tab === "contacts"
        ? this.$store.dispatch("setShowFooterNavbar", false)
        : this.$store.dispatch("setShowFooterNavbar", true);
      this.getCountUnreadMessagesFromAllUsers();
      // this.getCountUnreadMessagesFromAllGroups();
    },
    showPrivacy() {
      this.showPrivacy == true ? this.getBlockedUser() : "";
    },
  },
  computed: {
    ...mapGetters({
      userDetail: "getUserDetail",
      showFooterNavbar: "getShowFooterNavbar",
      showMoreSection: "getShowMoreSection",
      showNotifications: "getShowNotifications",
      showPrivacy: "getShowPrivacy",
      showChats: "getShowChats",
      calling: "getCallingStatus",
      unreadMsgFromUsers: "getUnreadMessages",
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
      checkedNotif: true,
      checkedPreview: true,
      blockedUser: null,
      isShowUserBlocked: false,
      blockedUserList: "",
      // unreadMsgFromUsers: null,
      // unreadMsgFromGroups: null,
    };
  },
  created() {
    this.getCountUnreadMessagesFromAllUsers();
    //   this.getCountUnreadMessagesFromAllGroups();
  },
  methods: {
    // dd edited
    // get unread msg from users
    getCountUnreadMessagesFromAllUsers() {
      CometChat.getUnreadMessageCountForAllUsers().then(
        (array) => {
          if (
            Object.keys(array)[0] == "app_system" ||
            Object.keys(array).length <= 1
          ) {
            console.log("array object length is ", Object.keys(array).length);
            this.$store.dispatch("setUnreadMessages", null);
          } else {
            this.$store.dispatch("setUnreadMessages", Object.values(array)[0]);
          }
        },
        (error) => {
          console.log("Error in getting message count from users", error);
        }
      );
    },

    // get unread msg from groups
    // getCountUnreadMessagesFromAllGroups() {
    //   CometChat.getUnreadMessageCountForAllGroups().then(
    //     array => {
    //       this.unreadMsgFromGroups = array;
    //       console.log("Message count fetched from groups", array);
    //     }, error => {
    //       console.log("Error in getting message count from groups", error);
    //     }
    //   );
    // },

    // unblock user
    onUnblockUser(userId) {
      const usersList = [userId];
      CometChat.unblockUsers(usersList).then(
        (list) => {
          this.getBlockedUser();
          console.log("users list unblocked", { list });
        },
        (error) => {
          console.log("unblocking user fails with error", error);
        }
      );
    },

    // show user list blocked
    showBlockedUserList() {
      this.isShowUserBlocked = !this.isShowUserBlocked;
    },

    // get show blocked user
    getBlockedUser() {
      const limit = 30;
      const blockedUsersRequest = new CometChat.BlockedUsersRequestBuilder()
        .setLimit(limit)
        .build();
      blockedUsersRequest.fetchNext().then(
        (userList) => {
          this.blockedUserList = userList;
          this.blockedUser = userList.length;
          console.log("Daftar user yg diblokir:", userList);
        },
        (error) => {
          console.log("Blocked user list fetching failed with error:", error);
        }
      );
    },

    // to show more section
    toShowMore() {
      this.$store.dispatch("setShowMoreSection", true);
      this.$store.dispatch("setShowFooterNavbar", true);
    },

    // call screen custom
    callScreenCustom(setSessionID) {
      let sessionID = setSessionID + Math.random() * setSessionID;
      // let audioOnly = true;
      // let defaultLayout = true;
      console.log("session id", sessionID);
      // let mode = CometChat.CALL_MODE.DEFAULT;
      // let mode = CometChat.CALL_MODE.SPOTLIGHT;
      let mode = CometChat.CALL_MODE.SINGLE;
      // let mode = CometChat.CALL_MODE.GRID;

      let callSettings = new CometChat.CallSettingsBuilder()
        .setSessionID(sessionID)
        .setIsAudioOnlyCall(true)
        .showEndCallButton(true)
        .enableDefaultLayout(true)
        .showMuteAudioButton(true)
        .showScreenShareButton(true)
        .showPauseVideoButton(true)
        // .setCustomCSS(this.customCSS) //custom css
        .setMode(mode)
        .build();
      CometChat.startCall(
        callSettings,
        document.getElementById("callScreen"),
        new CometChat.OngoingCallListener({
          onUserListUpdated: (userList) => {
            console.log("user list:", userList);
          },
          onCallEnded: (call) => {
            console.log("Call ended:", call);
            this.$store.dispatch("setCallingStatus", false);
          },
          onError: (error) => {
            console.log("Error :", error);
            this.$store.dispatch("setCallingStatus", false);
          },
          onMediaDeviceListUpdated: (deviceList) => {
            console.log("Device List:", deviceList);
          },
          onUserMuted: (userMuted, userMutedBy) => {
            // This event will work in JS SDK v3.0.2-beta1 & later.
            console.log("Listener => onUserMuted:", userMuted, userMutedBy);
          },
          onScreenShareStarted: () => {
            // This event will work in JS SDK v3.0.3 & later.
            console.log("Screen sharing started.");
          },
          onScreenShareStopped: () => {
            // This event will work in JS SDK v3.0.3 & later.
            console.log("Screen sharing stopped.");
          },
        })
      );
    },

    // call user
    callUser(userId) {
      this.$store.dispatch("setCallingStatus", true);
      // let receiverID = "UID";
      let callType = CometChat.CALL_TYPE.AUDIO;
      let receiverType = CometChat.RECEIVER_TYPE.USER;

      let call = new CometChat.Call(userId, callType, receiverType);

      CometChat.initiateCall(call).then(
        (outGoingCall) => {
          console.log("Call initiated successfully:", outGoingCall);
        },
        (error) => {
          this.$store.dispatch("setCallingStatus", false);
          console.log("Call initialization failed with exception:", error);
        }
      );
      // call screen
      this.callScreenCustom(userId);
    },

    // set userDetail to be null and get back to previous page
    toUserDetail() {
      this.$store.dispatch("setUserDetailToNull");
    },

    // show users
    onPhoneClick() {
      let limit = 10;
      let usersRequest = new CometChat.UsersRequestBuilder()
        .setLimit(limit)
        .build();

      usersRequest.fetchNext().then(
        (userList) => {
          this.users = userList;
          console.log("User list received:", userList);
        },
        (error) => {
          this.users = error;
          console.log("User list fetching failed with error:", error);
        }
      );
    },

    // show all call history
    onShowAllCall() {
      console.log("show all call");
      this.isShowAllCall = true;
      this.isShowMissedCall = false;
    },

    // show missed call
    onShowMissedCall() {
      console.log("show missed call");
      this.isShowMissedCall = true;
      this.isShowAllCall = false;
    },

    // close cometchat
    closeCustom() {
      // alert('close custom');
      this.$store.dispatch("setIsOpen", false);
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
.circle-unread-msg-from-users {
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #34b5d1;
  color: #fff;
  position: absolute;
  right: 8px;
  /* left: 28px; */
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}
.custom-screen {
  width: 320px;
  top: 0;
}
.hide-custom-screen {
  position: relative;
  height: 0;
  left: 0;
  transition: ease-in-out;
  transition-duration: 1000ms;
}
.show-custom-screen {
  position: absolute;
  height: 100%;
  left: -334px;
  transition: ease-in-out;
  transition-duration: 1000ms;
}

.side-bar-tile-list {
  display: none;
}
.wrap-user-detail {
  height: 100%;
}
.header-user-detail {
  width: 320px;
  height: 64px;
  background: #d7226d;
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;
}
.top-user-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left-arrow-icon {
  cursor: pointer;
}
.left-arrow-img {
  width: 25px;
  height: auto;
}
.title-detail {
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  position: absolute;
  left: 37%;
}
.title-detail-privacy {
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  position: absolute;
  left: 20%;
}
.body-notifikasi {
  padding: 16px;
}
.show-notifikasi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(20, 20, 20, 0.1);
  padding: 14px 0px;
}
.flex-to-col {
  flex-direction: column;
}
.flex-to-row {
  flex-direction: row;
}
.show-notifikasi-privacy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(20, 20, 20, 0.1);
  /* padding: 14px 0px; */
  padding-bottom: 12px;
  margin-bottom: 30px;
}
.text-notif {
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.1px;
  color: #141414;
}
.flex-items {
  display: flex;
  align-items: center;
}
.img-avatar {
  width: 38px;
  height: 38px;
  border-radius: 9999px;
}
.name-and-status {
  padding-left: 10px;
}
.username {
  padding-left: 10px;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
}
.status-user {
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: rgba(20, 20, 20, 0.6);
  padding-left: 10px;
}
.phone-red-icon {
  width: 25px;
  height: auto;
  cursor: pointer;
}
.date-user-detail {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.5);
  padding: 12px 0px;
}
.wrap-incoming-text-icon {
  border-bottom: 1px solid rgba(20, 20, 20, 0.1);
  padding: 4px 0px 4px 0px;
}
.incoming-icon {
  margin: 4px;
}
.img-incoming {
  width: 16px;
  height: auto;
}
.incoming-voice-call {
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.1px;
  color: #464646;
}
.incoming-time {
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  letter-spacing: -0.1px;
  color: #141414;
  mix-blend-mode: normal;
  opacity: 0.4;
}
.duration {
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.1px;
  color: rgba(20, 20, 20, 0.6);
}
.flex-incoming-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions-text {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.5);
  margin-top: 20px;
  margin-bottom: 8px;
}
.send-message-link {
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: rgb(51, 153, 255);
  padding: 10px 0px;
  border-bottom: 1px solid rgba(20, 20, 20, 0.1);
}
.privacy-support {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.5);
  padding: 18px 0px;
}
.block-user {
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #ff3b30;
  padding-top: 10px;
}
.desc-notif {
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.1px;
  color: rgba(20, 20, 20, 0.6);
  padding-top: 12px;
  padding-bottom: 40px;
}
.more-class {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.5);
  padding-bottom: 18px;
}
.reset-notif {
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #ff3b30;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(20, 20, 20, 0.1);
}
.reset-all {
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.1px;
  color: rgba(20, 20, 20, 0.6);
  padding-top: 12px;
}
.blocked-users-count {
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  text-align: right;
  letter-spacing: -0.1px;
  color: #141414;
  mix-blend-mode: normal;
  opacity: 0.7;
}
.privacy-text {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.5);
  padding-bottom: 17px;
}
.text-notif-red {
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #ff3b30;
}

/* custom checkbox */
INPUT[type="checkbox"]:focus {
  outline: 1px solid rgba(0, 0, 0, 0.2);
}
INPUT[type="checkbox"] {
  background-color: #ddd;
  border-radius: 2px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  top: 5px;
  border-radius: 4px;
}
INPUT[type="checkbox"]:checked {
  background-color: #4db6e4;
  background: #4db6e4 url("./resources/mark-white.png") 4px 4px no-repeat;
}
/* custom checkbox */

.calls-wraper {
  width: 320px;
  height: 90%;
  display: flex;
  flex-direction: column;
}
.calls-header {
  background: #d7226d;
  width: 100%;
  height: 114px;
  min-height: 114px;
  backdrop-filter: blur(59.8022px);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: #1d1d1d;
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
} /* custom scroll bar */

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