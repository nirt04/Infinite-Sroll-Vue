<template>
  <div
    @scroll="virtualScrollHandler"
    style="height: 500px; overflow-y: scroll; position: relative"
  >
    <list-container
      :bufferStyle="bufferStyle"
      :style="{ ...virtualScrollStyle }"
      :list="virtualScrollList"
      ref="list-container"
      class="list-container"
    >
      <infinite-loading @infinite="infiniteHandler" />
    </list-container>
  </div>
</template>
<script>
/* eslint-disable */
import InfiniteLoading from "vue-infinite-loading";
import ListContainer from "./components/list-container.vue";
import virtualScrollMixin from "./mixins/virtual-scroll-mixin";
export default {
  mounted() {
    console.log(this.virtualScrollHandler);
  },
  mixins: [virtualScrollMixin],
  computed: {
    itemsCount() {
      return this.RAW_LIST.length / this.maxPages;
    },
  },

  methods: {
    getLastRenderedIndex(pageNum, maxPages, array) {
      return pageNum < 2 ? 0 : (pageNum - 1) * (array.length / maxPages);
    },

    getItems(itemsCount, page) {
      const lastIndex = this.getLastRenderedIndex(
        page,
        this.maxPages,
        this.RAW_LIST
      );
      return [...this.RAW_LIST].splice(lastIndex, itemsCount);
    },

    infiniteHandler($state) {
      setTimeout(() => {
        const newItems = this.getItems(this.itemsCount, this.page++);
        if (newItems.length > 0) {
          // If we have new items to push, we push and delcare loaded
          this.list.push(...newItems);
          debugger;
          // TO DO get container up
          document
            .querySelector(".list-container")
            .scrollBy(0, -(newItems.length * 48));

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
      maxPages: 5,
      list: [],
      RAW_LIST: new Array(1000)
        .fill(null)
        .map((item, index) => `item - ${index + 1}`),
    };
  },

  components: { ListContainer, InfiniteLoading },
};
</script>
