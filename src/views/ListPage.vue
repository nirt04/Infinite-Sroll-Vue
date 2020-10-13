<template>
  <div>
    <list-container :list="arrayToRender">
      <infinite-loading @infinite="infiniteHandler" />
    </list-container>
  </div>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
import ListContainer from "./components/list-container.vue";

export default {
  /* eslint-disable */

  methods: {
    getItems(itemsCount, page) {
      const curItemIndex = page === 1 ? 0 : (page - 1) * (this.ROW_LIST.length / 5);
      debugger;
      return [...this.ROW_LIST].splice(curItemIndex, itemsCount);
    },
    infiniteHandler($state) {
      const that = this;
      const itemsCount = this.ROW_LIST.length / 5;
      setTimeout(() => {
        const newItems = this.getItems(itemsCount, that.page++);

        if (newItems.length > 0) {
          that.arrayToRender.push(...newItems);
          // that.page = that.page + 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 300);
    },
  },
  data() {
    return {
      page: 1,
      arrayToRender: [],
      ROW_LIST: new Array(1000)
        .fill(null)
        .map((item, index) => `item - ${index + 1}`),
    };
  },
  components: { ListContainer, InfiniteLoading },
};
</script>
