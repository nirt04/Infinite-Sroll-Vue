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
    bufferSize() {
      return this.containerHeight * 3;
    },
    virtualScrollList() {
      // const curIdx

      const itemsToPush = [...this.RAW_LIST].slice(
        this.firstItemIdx,
        this.lastItemIdx
      );
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
      containerScrollHeight: null,
      itemHeight: 48,
    };
  },
  methods: {
    storeNewEventData({ target }) {
      this.containerHeight = target.clientHeight;
      this.containerScrollHeight = target.scrollHeight - target.clientHeight;
      this.scrollPos = target.scrollTop;
      this.scrolledPrcentage = (this.scrollPos / this.containerHeight).toFixed( 2 );
    },

    virtualScrollHandler(event) {
      this.storeNewEventData(event);
      console.log(this.scrollPos);
      debugger;
      const bufferDiff = 
      if (this.scrollPos > this.bufferSize / 3) {



        const heightDiffFromBuffer = this.containerScrollHeight - this.bufferSize;
        const itemsLengthToPush = Math.floor( heightDiffFromBuffer / this.itemHeight );
        //   for (let i = 0; i < itemsLengthToPush.length; i++) {
        //      this.

        //   }
        console.log("heightDiffFromBuffer", heightDiffFromBuffer);
      }
      //   console.log(
      //     "hello virtual scroll handler",
      //     scrollPos,
      //     containerHeight,
      //     scrolledPrcentage
      //   );
    },
  },
};
