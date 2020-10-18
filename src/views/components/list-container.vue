<template>
  <v-list class="list-container-cmp" max-width="350px">
    <div class="buffer" :style="$attrs.bufferStyle">
      <v-list-item-group>
        <template v-for="(item, i) in list">
          <v-list-item :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="'divider' + i" />
        </template>
        <slot />
      </v-list-item-group>
    </div>
  </v-list>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.buffer {
  // min-height: 500px;
  min-width: 200px;
}
.list-container-cmp {
  margin: 40px auto;
  overflow-y: auto;
}
</style>
