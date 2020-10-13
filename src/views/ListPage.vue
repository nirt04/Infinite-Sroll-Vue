<template>
  <div>
    <list-container :list="arrayToRender || []">
      <infinite-loading ref="InfiniteLoading" @infinite="infiniteHandler">
      </infinite-loading>
    </list-container>
  </div>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
import ListContainer from "./components/list-container.vue";

export default {
  methods: {
    getItems(itemCount, page) {
      const curItemIndex = page === 1 ? 0 : page * (this.ROW_LIST.length / 5);
      const itemsCountToGet = this.ROW_LIST.length / 5;
      return [...this.ROW_LIST].splice(curItemIndex, itemsCountToGet);
    },
    infiniteHandler($state) {
      const that = this;
      setTimeout(() => {
        const newItems = this.getItems(5, that.iter);
        if (newItems.length > 0) {
          that.arrayToRender.push(...newItems);
          that.iter = that.iter + 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 300);
    },
  },
  data() {
    return {
      iter: 1,
      arrayToRender: [],
      ROW_LIST: new Array(1000).fill(null).map((item, index) => `item - ${index + 1}`),
    };
  },
  components: { ListContainer, InfiniteLoading },
};
</script>
