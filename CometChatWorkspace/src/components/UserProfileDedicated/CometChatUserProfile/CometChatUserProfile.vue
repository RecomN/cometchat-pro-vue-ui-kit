<template>
  <div :style="styles.userInfoScreen" class="cometchat__user__info">
    <div class="sejasa-user-info-header">
      <img
        class="back-btn"
        src="./resources/arrow-left.svg"
        alt="arrow icon"
        @click="tabActive = 'info'"
        v-if="tabActive === 'privacy'"
      >
      <h4>{{ tabActive === 'info' ? 'More' : 'Privasi dan Keamanan' }}</h4>
    </div>

    <div class="user-info-wrapper" v-if="tabActive === 'privacy'">
      <comet-chat-privacy-and-security />
    </div>

    <div class="user-info-wrapper" v-if="tabActive === 'info'">
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
          <div :style="styles.optionTitle">PREFERENSI</div>
          <div :style="styles.optionList">
            <!-- <div :style="styles.option.notification" class="info__item--hover">
              <img :src="require('./resources/bell.svg')">
              <div :style="styles.optionName">Notifikasi</div>
              <div :style="styles.optionBorder"></div>
            </div> -->
            <div :style="styles.option.privacy" class="info__item--hover" @click="toPrivacy">
              <img :src="require('./resources/guard.svg')">
              <div :style="styles.optionName">
                Privasi dan Keamanan
              </div>
              <div :style="styles.optionBorder"></div>
            </div>
            <!-- <div :style="styles.option.chat" class="info__item--hover">
              <img :src="require('./resources/message.svg')">
              <div :style="styles.optionName">Chats</div>
              <div :style="styles.optionBorder"></div>
            </div> -->
          </div>
          <!-- <div :style="styles.optionTitle">LAINNYA</div>
          <div :style="styles.optionList">
            <div :style="styles.option.help" class="info__item--hover">
              <img :src="require('./resources/help.svg')">
              <div :style="styles.optionName">Bantuan</div>
              <div :style="styles.optionBorder"></div>
            </div>
            <div :style="styles.option.report" class="info__item--hover">
              <img :src="require('./resources/warning.svg')">
              <div :style="styles.optionName">Laporkan Masalah</div>
              <div :style="styles.optionBorder"></div>
            </div>
          </div> -->
        </div>
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

import CometChatPrivacyAndSecurity from './CometChatPrivacyAndSecurity.vue'

/**
 * Displays user information.
 *
 * @displayName CometChatUserProfile
 */
export default {
  name: "CometChatUserProfile",
  components: {
    CometChatAvatar,
    CometChatPrivacyAndSecurity
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
      tabActive: 'info'
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
    async toPrivacy() {
      this.tabActive = 'privacy'
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
<style scoped lang="scss">
.user-info-wrapper {
  height: 100%;
}

.info__item--hover {
  color: #464646 !important;
  background: none !important;
  position: relative;
  &:hover {
    background-color: var(--info-item-bg-color-hover) !important;
  }

  img {
    position: absolute;
    left: 16px;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  }
}
.cometchat__user__info {
  box-sizing: border-box;
  font-family: var(--cometchat-user-info-font-family);
}
.sejasa-user-info-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #D7226D;
  .back-btn {
    margin-right: 7px;
    &:hover {
      cursor: pointer;
    }
  }
  h4 {
    margin-bottom: 0px !important;
    color: white;
  }
}
</style>