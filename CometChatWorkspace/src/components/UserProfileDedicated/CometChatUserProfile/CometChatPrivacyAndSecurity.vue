<template>
  <div class="wrapper">
    <div class="nav-list">
      <div
        class="list-text"
        :class="{ 'is-open': showUser }"
        @click="showUser = !showUser"
      >
        <h3>Blocked Users</h3>
        <div v-if="!loading">{{ userList.length }} {{ userList.length > 1 ? 'Users' : 'User' }}</div>
        <div v-else>Loading...</div>
      </div>

      <div class="user-list-wrapper" v-show="showUser">
        <div
          class="list"
          v-for="(user, index) in userList"
          :key="index"
        >
          {{ user.name }}
          <button @click="onUnblock(user.uid)">Unblock</button>
        </div>
        <div v-if="!loading && !userList.length">
          No Block Users
        </div>
      </div>
    </div>

    <div class="unblock-modal" v-if="showUnblockModal">
      <div class="card-modal">
        <div class="card-text">Unblock user?</div>
        <div class="card-action">
          <button
            class="cancel-btn"
            @click="showUnblockModal = false"
          >
            Cancel
          </button>
          &nbsp;
          <button
            class="confirm-btn"
            :disabled="loading"
            @click="onUnblockConfirm"
          >
            {{ loading ? '...' : 'Unblock' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import { theme } from "../../../resources/theme";
import * as style from "./style";

export default {
  computed: {
    styles() {
      return {
        userInfoScreen: style.userInfoScreenStyle(this.themeValue),
        optionName: style.optionNameStyle(),
      };
    },
    themeValue() {
      return Object.assign({}, theme, this.theme);
    }
  },
  data() {
    return {
      userList: [],
      showUser: false,
      loading: true,
      showUnblockModal: false,
      selectedUid: null
    }
  },
  created() {
    this.getListOfBlockedUser()
  },
  methods: {
    async getListOfBlockedUser() {
      let blockedUsersRequest = new CometChat.BlockedUsersRequestBuilder()
        .setLimit(100)
        .build();

      const userList = await blockedUsersRequest.fetchNext()
      this.userList = userList.filter(item => item.blockedByMe)
      this.loading = false
    },
    onUnblock(uid) {
      this.selectedUid = uid
      this.showUnblockModal = true
    },
    async onUnblockConfirm() {
      try {
        this.loading = true
        await CometChat.unblockUsers([this.selectedUid])
        this.getListOfBlockedUser()
      } catch (error) {
        // do nothing
      }
      this.loading = false
      this.showUnblockModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
$hover-bg: #E6E6E6;
$pink-color: #D7226D;

.nav-list {
  .is-open {
    background: $hover-bg;
  }
  border-bottom: 1px solid rgb(234, 234, 234);
  .list-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    &:hover {
      cursor: pointer;
      background: $hover-bg;
    }
  }
  .user-list-wrapper {
    max-height: 215px;
    overflow-y: auto;
    width: 100%;
    padding: 15px 20px;

    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      button {
        color: $pink-color;
        border: none;
        background: rgb(244, 244, 244);
        padding: 6px 8px;
        border-radius: 4px;
      }
      &:hover {
        cursor: pointer;
        background: $hover-bg;
      }
    }
  }
  h3 {
    font-weight: 600;
    font-size: 15px;
    margin: 0;
  }
  &:hover {
    cursor: pointer;
  }
}

// Unblock Modal
.unblock-modal {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  .card-modal {
    padding: 15px;
    text-align: center;
    width: 95%;
    background: white;
    border-radius: 6px;

    .card-action {
      margin-top: 10px;
      button {
        border: 1px solid dodgerblue;
        padding: 8px 12px;
        border-radius: 5px;
      }
      .confirm-btn {
        background: dodgerblue;
        color: white;
      }
      .cancel-btn {
        color: black;
        background: rgb(239, 239, 239);
      }
    }
  }
}
</style>