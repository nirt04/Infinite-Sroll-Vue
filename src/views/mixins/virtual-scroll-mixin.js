/* eslint-disable */

/* 
We need postion absolute for the buffer so it wont fucked up with scrolling
We need to calc how much diff from scrolled top in order to chose how many to push to start and end
There a need for a constant items length so scoll wont jump

Order 
1) I will always push container * 3 = items
2) if scrollTop will over X items i will chose my first item index as calc of the scroll top and item height
3) my end item index will be calc of maxitems + my new first item index  
fdsdf
*/

export default {
  computed: {
    bufferStyle() {
      return {
        overflowY: "hidden",
        position: "absolute",
        top: `${this.scrollPos < 47700 ? this.scrollPos : 47700}px`,
      };
    },
    virtualScrollStyle() {
      return {
        overflowY: "hidden",
        height: "49238.300px",
        position: "relative",
        // top: `${this.scrollPos < 49238.300 ? this.scrollPos : 49238.300}px`,
      };
    },
    bufferSize() {
      return this.containerHeight * 3;
    },
    virtualScrollList() {
      const itemsLength = Math.floor( (this.containerHeight * 3) / this.itemHeight );
      const firstItemIdx = Math.floor(this.scrollPos / this.itemHeight) < this.RAW_LIST.length - itemsLength ? Math.floor(this.scrollPos / this.itemHeight) : this.RAW_LIST.length - itemsLength;
      const lastlastItemIdx = itemsLength + firstItemIdx;
      const itemsToPush = [...this.RAW_LIST].slice( firstItemIdx, lastlastItemIdx < this.RAW_LIST.length ? lastlastItemIdx : this.RAW_LIST.length );
      return itemsToPush;
    },
  },
  created() {
    this.firstItemIdx = 0;
    this.lastItemIdx = Math.floor(this.bufferSize / this.itemHeight);
  },
  mounted() {
    console.log("hello from mixin!", this.virtualScrollHandler);
  },
  data() {
    return {
      firstItemIdx: null,
      lastItemIdx: null,
      scrollPos: 0,
      scrolledPrcentage: 0,
      containerHeight: 500,
      // containerScrollHeight: null,
      itemHeight: 48,
    };
  },
  methods: {
    storeNewEventData({ target }) {
      debugger;
      this.containerHeight = target.clientHeight;
      // this.containerScrollHeight = target.scrollHeight - target.clientHeight;
      // if (this.scrollPos >= 48000) {
      //   this.scrollPos = 48000;
      //   return;
      // }

      this.scrollPos = target.scrollTop;
      this.scrolledPrcentage = (this.scrollPos / this.containerHeight).toFixed(
        2
      );
    },

    virtualScrollHandler(event) {
      this.storeNewEventData(event);
    },
  },
};
