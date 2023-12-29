<template>
  <div class="text-scroller" ref="textScroller">
    <div class="panel" v-for="(item, index) in panels" :key="index">
      <div class="text-wrapper light centered flex-col">
        <div class="wrapper">
          <p>
            <LocalizationString :string="item"></LocalizationString>
          </p>
          <div v-if="index === panels.length - 1" class="pagination-wrapper">
            <div v-if="pagination">
              <Pagination v-if="pagination?.next" :link="`/${route}/stories`" :message="pagination.next" />
            </div>
          </div>
        </div>

        <button class="flat up" v-if="index !== 0" @click="goToSection(index - 1)">
          <SystemIcon type="arrow" :width="20" color="light" class="icon icon-arrow-up" />
        </button>
        <button class="flat down" v-if="index < panelNum - 1" @click="goToSection(index + 1)">
          <SystemIcon type="arrow" :width="20" color="light" class="icon icon-arrow-down" />
        </button>


      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    panels: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object
    },
    route: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      scrollTween: null,
      activeSection: 0,
      currentSection: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setNewAnim();
      this.scrolledToEnd();
    })
  },
  watch: {
    activeSection() {
      if (this.activeSection === this.panelNum - 1) {
        this.$emit("scrolled-to-end");
      }
    },
  },
  computed: {
    panelNum() {
      return this.panels.length;
    },
  },
  beforeDestroy() {
    // console.log('before destroy scroller');
    const scrollTrigger = this.$ScrollTrigger;
    const gsap = this.$gsap;
    scrollTrigger.killAll();
    gsap.set("body", { height: "auto" });
  },
  methods: {
    goToSection(i) {
      const gsap = this.$gsap;
      this.setActiveSection(i);
      this.scrollTween = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 0.8,
        ease: "ease-in-out",
        onComplete: () => (this.scrollTween = null),
        overwrite: true,
      });
    },
    setActiveSection(i) {
      // console.log("activating section", i);
      this.activeSection = i;
      // console.log("triggered set active section", i);
    },
    scrolledToEnd() {
      const scrollTrigger = this.$ScrollTrigger;
      const gsap = this.$gsap;
      const ref = this.$refs.textScroller;
      let sections = gsap.utils.toArray(".panel");
      if (!ref || !scrollTrigger || !sections) {
        return
      }
      const endHeight = ((sections.length * innerHeight) - (innerHeight / 1.5)) + "px";

      scrollTrigger.create({
        start: "0px",
        end: `+=${endHeight} bottom`,
        onLeave: ({ progress, direction, isActive }) => {
          // console.log(progress, direction, isActive)
          this.$emit("scrolled-to-end");
        },
        // markers: true
      });
    },
    setNewAnim() {
      const gsap = this.$gsap;
      const scrollTrigger = this.$ScrollTrigger;
      let sections = gsap.utils.toArray(".panel");

      this.currentSection = sections[0];
      // console.log(sections)
      gsap.defaults({ overwrite: 'auto', duration: 0.3 });

      // stretch out the body height according to however many sections there are. 
      gsap.set("body", { height: (sections.length * innerHeight) + "px" });
      // console.log((sections.length * innerHeight) + "px")
      // create a ScrollTrigger for each section
      sections.forEach((section, i) => {
        scrollTrigger.create({
          // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
          start: () => (i - 0.5) * innerHeight,
          end: () => (i + 0.5) * innerHeight,
          // when a new section activates (from either direction), set the section accordinglyl.
          onToggle: self => self.isActive && this.setNewSection(section),
          toggleClass: { targets: section, className: "is-active" },

        });
      });


    },

    setNewSection(newSection) {
      const gsap = this.$gsap;

      if (newSection !== this.currentSection) {
        gsap.to(this.currentSection, { autoAlpha: 0 })
        gsap.to(newSection, { autoAlpha: 1 });
        this.currentSection = newSection;
      }
    },
    setTextScrollerAnim() {
      const gsap = this.$gsap;
      const ScrollTrigger = this.$ScrollTrigger;

      let panels = gsap.utils.toArray(".panel");
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: `top-=${window.innerWidth / 4} top`,
          end: `bottom top`,
          // markers: true,
          onToggle: (self) => {
            self.isActive && this.setActiveSection(i);
          },
          toggleClass: { targets: panel, className: "is-active" },
        });
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: auto;
}

.text-scroller .pagination {
  position: relative;
  bottom: unset;
  right: unset;
}


.text-scroller-wrapper {
  position: relative;
  z-index: 20;
}

.text-scroller {
  width: 100%;
  padding: 0 25px;

  .text-wrapper {
    max-width: 75ch;
  }

  button {
    span {
      display: flex;
    }
  }

  .panel {
    height: 100vh;
    padding: 0 15px;
    // position: sticky;
    // top: 0;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // background: rgba(10, 10, 10, 0.6);

    position: fixed;
    width: 100%;
    min-width: 100vw;
    height: 100%;
    top: 0;
    left: 0;


    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 5% 1fr 5%;

    .text-wrapper {
      grid-row: 2 / 3;
    }

    .pagination-wrapper {
      max-width: 300px;
      margin: 0 auto;
      margin-top: 15px;

      h3:not(.collapsed-mb) {
        margin-bottom: 15px;
      }
    }

    .text-wrapper {
      display: grid;
      grid-template-columns: 1;
      grid-template-rows: 1fr min-content 1fr;

      .up {
        grid-row: 1 / 2;
        align-self: end;
        justify-self: center;
      }

      >div {
        grid-row: 2 / 3;
      }
    }

    p {
      max-width: 60ch;
      margin: 0 auto;
    }



    .down {
      margin-top: 30px;
      grid-row: 3 / 4;
      align-self: start;
      justify-self: center;
    }

    p {
      @include pBigStyle();
      font-size: 28px;
      line-height: 32px;
      margin-bottom: 0;
      align-self: end;

      @media (max-width: $collapse-bp) {
        font-size: 18px;
        line-height: 24px;
      }
    }


    transition: 0.3s ease all;
    filter: blur(30px);
    opacity: 0;

    &.is-active {
      z-index: 999;
      opacity: 1;
      filter: blur(0px);
    }
  }

  .flex-col {
    button.up {
      order: 1;
      margin-bottom: 30px;
    }

    p {
      order: 2;
    }

    button.down {
      order: 3;
    }
  }
}
</style>