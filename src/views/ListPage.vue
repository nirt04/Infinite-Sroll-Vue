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
  methods: {
    
    getItems(itemsCount, page) {
      const itemIndex = page < 2 ? 0 : (page - 1) * (this.ROW_LIST.length / 5);
      return [...this.ROW_LIST].splice(itemIndex, itemsCount);
    },

    infiniteHandler($state) {
      const that = this;
      const itemsCount = this.ROW_LIST.length / 5;
      setTimeout(() => {
        const newItems = this.getItems(itemsCount, that.page++);
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
      arrayToRender: [],
      ROW_LIST: new Array(1000)
        .fill(null)
        .map((item, index) => `item - ${index + 1}`),
    };
  },
  components: { ListContainer, InfiniteLoading },
};
</script>
