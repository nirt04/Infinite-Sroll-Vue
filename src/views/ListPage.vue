<template>
  <div>
    <list-container :list="arrayToRender">
      <infinite-loading @infinite="infiniteHandler" />
    </list-container>
  </div>
</template>
<script>
/* eslint-disable */

import InfiniteLoading from "vue-infinite-loading";
import ListContainer from "./components/list-container.vue";

export default {
  computed: {
    itemsCount() {
      return this.ROW_LIST.length / this.arrayPagesNum;
    },
  },

  methods: {
    getLastItemIndex(pageNum, arrayPagesNum, array) {
      return pageNum < 2 ? 0 : (pageNum - 1) * (array.length / arrayPagesNum);
    },

    getItems(itemsCount, page) {
      return [...this.ROW_LIST].splice( this.getLastItemIndex(page, this.arrayPagesNum, this.ROW_LIST), itemsCount );
    },

    infiniteHandler($state) {
      const that = this;
      setTimeout(() => {
        const newItems = this.getItems(that.itemsCount, that.page++);
        if (newItems.length > 0) {
          // If we have new items to push, we push and delcare loaded
          that.arrayToRender.push(...newItems);
          $state.loaded();
        } else {
          // If there are no items to push we declare complete and infinite scroll will stop being emited
          $state.complete();
        }
      }, 300);
    },
  },

  data() {
    return {
      page: 1,
      arrayPagesNum: 5,
      arrayToRender: [],
      ROW_LIST: new Array(1000)
        .fill(null)
        .map((item, index) => `item - ${index + 1}`),
    };
  },

  components: { ListContainer, InfiniteLoading },
};
</script>
