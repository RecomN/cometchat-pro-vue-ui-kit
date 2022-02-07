<template>
  <div :style="styles.userDetail" class="cometchat__detailpane">
    <div :style="styles.header">
      <div
        :style="styles.headerClose"
        class="cometchat__header__close"
        @click="emitAction('closeDetailClicked')"
      ></div>
      <!-- wrap close icon and text -->
      <div class="wrap-icon-and-text">
        <!-- close the details -->
        <span class="close-details" @click="emitAction('closeDetailClicked')">
          <img src="./resources/close-white-2x.png" alt="">
        </span>
        <p class="text-details">details</p>
      </div>
      <!-- <h4 :style="styles.headerTitle">{{ STRINGS.DETAILS }}</h4> -->
    </div>

    <!-- Notifications -->
    <div class="wrap-notifications">
      <div class="notifications-text">Notifications</div>
      <div class="checkboxs" @click="checkedNotifications = !checkedNotifications">
        <input
          :checked="checkedNotifications" 
          class="chckbox" 
          style="max-width:20px;" 
          type="checkbox" 
          name="" id="">
      </div>
    </div>

    <!-- AKSI -->
    <div class="wrap-aksi" style="padding:16px;">
      <!-- aksi title -->
      <div class="aksi-title">
        Aksi
      </div>

      <!-- Cari di Percakapan -->
      <div @click="cariDiPercakapan" class="percakapan">
        Cari di Percakapan
      </div>

      <!-- Buat Grup -->
      <div @click="buatGrup" class="buat-grup">
        Buat Grup
      </div>
    </div>

    <div :style="styles.section" class="cometchat__detailpane__section">
      <div
        :style="styles.privacySection"
        class="cometchat__detailpane__section__privacy"
      >
        <!-- <h6 :style="styles.sectionHeader">{{ STRINGS.OPTIONS }}</h6> -->
        <h6 :style="styles.sectionHeader">Privacy & Support</h6>
        <div :style="styles.sectionContent">
          <div
            :style="styles.contentItem"
            class="cometchat__detailpane__content__item"
          >
            <!-- clear chat -->
            <div @click="clearChat" class="clear-chat">
              Clear Chat
            </div>
            <!-- block user -->
            <div
              style="margin:16px 0px;"
              :style="styles.itemLink"
              @click="
                emitAction(item.blockedByMe ? 'unblockUser' : 'blockUser')
              "
            >
              {{ item.blockedByMe ? STRINGS.UNBLOCK_USER : STRINGS.BLOCK_USER }}
            </div>
            <!-- report -->
            <div @click="reportUser" class="clear-chat">
              Report
            </div>
          </div>
        </div>
      </div>
      <comet-chat-shared-media-view
        :item="item"
        :type="type"
        :theme="theme"
        container-height="50px"
      />
    </div>
  </div>
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { propertyCheck, cometChatCommon } from "../../../mixins/";

import { CometChatSharedMediaView } from "../../Shared";

import navigateIcon from "./resources/navigate.png";

import * as style from "./style";

/**
 * Displays details for the user of current chat.
 *
 * @displayName CometChatUserDetails
 */
export default {
  name: "CometChatUserDetails",
  mixins: [propertyCheck, cometChatCommon],
  components: { CometChatSharedMediaView },
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
     */
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        section: style.sectionStyle(),
        header: style.headerStyle(this.theme),
        contentItem: style.contentItemStyle(),
        headerTitle: style.headerTitleStyle(),
        sectionContent: style.sectionContentStyle(),
        userDetail: style.userDetailStyle(this.theme),
        itemLink: style.itemLinkStyle(true, this.theme),
        headerClose: style.headerCloseStyle(navigateIcon),
        sectionHeader: style.sectionHeaderStyle(this.theme),
        privacySection: style.privacySectionStyle(this.theme),
      };
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
  data() {
    return {
      checkedNotifications: true,
    }
  },
  methods: {
    clearChat() {
      alert('clear chat method is not created yet')
    },
    reportUser() {
      alert('report method is not created yet')
    },
    cariDiPercakapan() {
      console.log('cari di percakapan')
    },
    buatGrup() {
      console.log('buat grup')
    }
  }
};
</script>
<style scoped>
/* dd-edited */
.clear-chat {
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #FF3B30;
}
.buat-grup {
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #4DB6E4;
  cursor: pointer;
}
.percakapan {
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: #4DB6E4;
  padding-bottom: 16px;
  cursor: pointer;
}
.aksi-title {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.5);
  margin-bottom:9px;
}
.notifications-text {
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.1px;
  color: #141414;
}
.wrap-notifications {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}
/* custom checkbox w-16-h-16*/
INPUT[type=checkbox]:focus
{
  outline: 1px solid rgba(0, 0, 0, 0.2);
}
INPUT[type=checkbox]
{
  background-color: #DDD;
  border-radius: 2px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
  top: 0;
  border-radius:4px;
}
INPUT[type=checkbox]:checked
{
  background-color: #4DB6E4;
  background: #4DB6E4 url("./resources/mark-white.png") 2px 2px no-repeat;
}/* custom checkbox */

.wrap-icon-and-text {
  display: flex;
  position: relative;
  width: 100%;
}
.text-details {
  position: absolute;
  left: 35%;
  font-weight: 600;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  text-transform: capitalize;
  font-size: 20px;
}
.close-details {
  cursor: pointer;
  width: 24px;
  height: auto;
}
.cometchat__detailpane * {
  box-sizing: border-box;
  font-family: var(--detailpane-font-family);
}
.cometchat__detailpane__section:not(:last-of-type) {
  margin-bottom: 16px;
}
.cometchat__detailpane__section__privacy > div {
  color: var(--privacy-color-red);
  font-weight: 600;
  cursor: pointer;
  font-size: 12px;
}
.cometchat__detailpane__content__item:not(:first-of-type):not(:last-of-type) {
  padding: 6px 0px;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__header__close {
    display: block !important;
  }
}
</style>