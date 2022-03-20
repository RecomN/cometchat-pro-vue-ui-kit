<template>
  <div :style="styles.userInfoScreen" class="cometchat__user__info">
    <div :style="styles.header" style="background: #d7226d; text-align: center">
      <div class="wrap-title-and-button">
        <!-- button close/times -->
        <span @click="closeCustom" class="span-close">
          <!-- <i class="fa fa-times" style="color:#fff"></i> -->
          <img
            class="top-icon"
            src="../../Chats/CometChatConversationList/resources/close-white-icon-2x.png"
            alt="close icon"
          />
        </span>
        <!-- header title -->
        <h4 :style="styles.headerTitle">{{ STRINGS.MORE }}</h4>
        <!-- <h4 style="color:white;" :style="styles.headerTitle">{{ STRINGS.CHATS }}</h4> -->
      </div>
    </div>
    <div :style="styles.detail">
      <div :style="styles.thumbnail">
        <comet-chat-avatar
          v-if="isUser"
          border-width="1px"
          corner-radius="50%"
          border-color="#CCC"
          :image="user.avatar"
        />
      </div>
      <div :style="styles.userDetail">
        <div :style="styles.userName">
          {{ user.name }}
        </div>
        <p :style="styles.userStatus">{{ STRINGS.ONLINE }}</p>
      </div>
    </div>
    <div :style="styles.options">
      <!-- <div :style="styles.optionTitle">{{ STRINGS.PREFERENCES }}</div> -->
      <div :style="styles.optionTitle">preferensi</div>
      <!--
      <div :style="styles.optionList">
        <div 
          @click="toNotifications"
          :style="styles.option.notification" 
          class="info__item--hover">-->
      <!-- <div :style="styles.optionName">{{ STRINGS.NOTIFICATIONS }}</div> -->
      <!--<div :style="styles.optionName">Notifikasi</div>
          <div :style="styles.optionBorder"></div>
        </div>-->
      <div
        @click="toPrivacySecurity"
        :style="styles.option.privacy"
        class="info__item--hover"
      >
        <!-- <div :style="styles.optionName">
            {{ STRINGS.PRIVACY_AND_SECURITY }}
          </div> -->
        <div :style="styles.optionName">Privasi dan Keamanan</div>
        <div :style="styles.optionBorder"></div>
      </div>
      <!--
        <div 
          @click="toChats"
          :style="styles.option.chat" 
          class="info__item--hover">
          <div :style="styles.optionName">{{ STRINGS.CHATS }}</div>
          <div :style="styles.optionBorder"></div>
        </div>
      </div>
      <div :style="styles.optionTitle">{{ STRINGS.OTHER }}</div>
      <div :style="styles.optionList">
        <div :style="styles.option.help" class="info__item--hover">-->
      <!-- <div :style="styles.optionName">{{ STRINGS.HELP }}</div> --><!--
          <div :style="styles.optionName">Bantuan</div>
          <div :style="styles.optionBorder"></div>
        </div>
        <div :style="styles.option.report" class="info__item--hover">-->
      <!-- <div :style="styles.optionName">{{ STRINGS.REPORT_PROBLEM }}</div> -->
      <!--<div :style="styles.optionName">Laporkan Masalah</div>
          <div :style="styles.optionBorder"></div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { CometChatManager } from "../../../util/controller";
import { SvgAvatar } from "../../../util/svgavatar";

import { theme } from "../../../resources/theme";

import * as style from "./style";

import { CometChatAvatar } from "../../Shared/";

import notificationIcon from "./resources/notification-black-icon.svg";
import privacyIcon from "./resources/privacy-black-icon.svg";
import reportIcon from "./resources/report-black-icon.svg";
import chatIcon from "./resources/chat-black-icon.svg";
import helpIcon from "./resources/help-black-icon.svg";

/**
 * Displays user information.
 *
 * @displayName CometChatUserProfile
 */
export default {
  name: "CometChatUserProfile",
  components: {
    CometChatAvatar,
  },
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        detail: style.detailStyle(),
        options: style.optionsStyle(),
        userName: style.userNameStyle(),
        thumbnail: style.thumbnailStyle(),
        userDetail: style.userDetailStyle(),
        optionName: style.optionNameStyle(),
        optionList: style.optionListStyle(),
        headerTitle: style.headerTitleStyle(),
        header: style.headerStyle(this.themeValue),
        userStatus: style.userStatusStyle(this.themeValue),
        optionTitle: style.optionTitleStyle(this.themeValue),
        optionBorder: style.optionBorderStyle(this.themeValue),
        userInfoScreen: style.userInfoScreenStyle(this.themeValue),
        option: {
          notification: style.optionStyle(notificationIcon),
          privacy: style.optionStyle(privacyIcon),
          report: style.optionStyle(reportIcon),
          chat: style.optionStyle(chatIcon),
          help: style.optionStyle(helpIcon),
        },
      };
    },
    /**
     * Theme computed using default theme and theme coming from prop.
     */
    themeValue() {
      return Object.assign({}, theme, this.theme);
    },
    /**
     * Whether it is user or not.
     */
    isUser() {
      return Object.keys(this.user).length;
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
  methods: {
    closeCustom() {
      // alert('close custom');
      this.$store.dispatch("setIsOpen", false);
    },

    // to notifications section
    toNotifications() {
      this.$store.dispatch("setShowNotifications", true);
      // hide the navbar footer when notifications is show/clicked
      this.$store.dispatch("setShowFooterNavbar", false);
    },

    // to privacy section
    toPrivacySecurity() {
      this.$store.dispatch("setShowPrivacy", true);
      // hide the navbar footer when notifications is show/clicked
      this.$store.dispatch("setShowFooterNavbar", false);
    },

    // to chats section
    toChats() {
      this.$store.dispatch("setShowChats", true);
      // hide the navbar footer when notifications is show/clicked
      this.$store.dispatch("setShowFooterNavbar", false);
    },

    /**
     * Sets SVG avatar
     */
    setAvatar(user) {
      if (!user.getAvatar()) {
        const uid = user.getUid();
        const char = user.getName().charAt(0).toUpperCase();
        user.setAvatar(SvgAvatar.getAvatar(uid, char));
      }
    },
  },
  beforeMount() {
    (async () => {
      try {
        const user = await new CometChatManager().getLoggedInUser();

        this.setAvatar(user);
        this.user = user;
      } catch (error) {
        this.logError("[CometChatUnified] getLoggedInUser error", error);
      }
    })();
  },
};
</script>
<style scoped>
.top-icon {
  width: 26px;
  height: auto;
  cursor: pointer;
  object-fit: cover;
  background-size: cover;
}
.span-close {
  cursor: pointer;
  font-size: 24px;
  color: #fff;
  position: absolute;
  left: 0;
}
.wrap-title-and-button {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  justify-content: space-around;
}
.cometchat__user__info {
  box-sizing: border-box;
  font-family: var(--cometchat-user-info-font-family);
}
.info__item--hover:hover {
  background-color: var(--info-item-bg-color-hover) !important;
}
</style>