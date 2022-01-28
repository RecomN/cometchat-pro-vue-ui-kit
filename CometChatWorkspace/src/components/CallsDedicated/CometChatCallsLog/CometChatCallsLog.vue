<template>
  <div class="calls-log-wrapper">
    <div class="sejasa-calls-log-header">
      <h4>Calls</h4>
      <div class="tabs-wrapper">
        <div
          @click="changeTab('all')"
          :class="`tab ${tab === 'all' && 'active'}`"
        >All</div>
        <div
          @click="changeTab('missed')"
          :class="`tab ${tab === 'missed' && 'active'}`"
        >Missed</div>
      </div>
    </div>

    <section class="scroll-wrapper">
      <section class="all-section">
        <div class="list" v-for="i in 15" :key="i">
          <div class="avatar">
            I
          </div>
          <div class="content">
            <div class="left-content">
              <h5>Ibrahimovic</h5>
              <div>Incoming Audio</div>
            </div>
            <div class="right-content">
              15:00 AM
            </div>
          </div>
        </div>
      </section>
    </section>

  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 'all'
  }),
  methods: {
    changeTab(tabName) {
      this.tab = tabName
    }
  }
}
</script>

<style scoped lang="scss">
.calls-log-wrapper {
  height: calc(100% - 80px) !important;

  .sejasa-calls-log-header {
    padding: 20px;
    width: 100%;
    background-color: #D7226D;
    h4 {
      color: white;
    }

    .tabs-wrapper {
      display: flex;
      background-color: rgba(255, 255, 255, 0.7);
      justify-content: center;
      align-items: center;
      border-radius: 7px;
      padding: 2px;
      .tab {
        transition: 0.3s;
        padding: 2px;
        flex: 1;
        text-align: center;
        font-weight: 500;
        font-size: 13px;
        &.active {
          background: #fff;
          border-radius: 7px;
          box-shadow: 0px 3px 8px rgba(20, 20, 20, 0.12), 0px 3px 1px rgba(20, 20, 20, 0.04);
        }
        &:hover {
          cursor: pointer;
        }
        &:active {
          opacity: 0.6;
        }
      }
    }
  }

  .scroll-wrapper {
    height: calc(100% - 116px);
    overflow-y: auto;

    .all-section {
      .list {
        display: flex;
        align-items: center;
        padding: 0 15px;

        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 20px;
          border-radius: 50%;
          width: 37px;
          height: 37px;
          background-color: rgb(202, 202, 202);
          margin-left: 5px;
        }

        .content {
          flex: 1;
          padding: 14px 0;
          border-bottom: 1px solid #1414141A;
          display: flex;
          align-items: center;

          .left-content {
            flex: 1;
            line-height: 18px;
          }
          .right-content {
            padding: 0 5px;
          }

          h5 {
            margin-bottom: 0px;
            text-transform: none;
            font-size: 15px;
          }
        }
      }
    }
  }

}
</style>