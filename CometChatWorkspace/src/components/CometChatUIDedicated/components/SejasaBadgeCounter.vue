<template>
  <span class="sejasa-counter-badge">{{ count }}</span>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
.sejasa-counter-badge {
  background: #34B5D1;
  color: white;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  line-height: 1;
  padding: 3px 2px;
  text-align: center;
  min-width: 17px;
  font-weight: 600;
}
</style>