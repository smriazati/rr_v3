<template>
  <div class="map-controls-wrapper">
    <nav class="map-options map-box" v-if="data.content">
      <h3>
        <LocalizationString :string="data.content.optionsTitle"></LocalizationString>
      </h3>
      <ul>
        <li class="hover-cursor" @click="showIntro">
          <span class="icon">
            <img class="icon icon-instructions icon-light" src="/icons/instructions.svg"
              alt="view instructions icon" /></span>
          <LocalizationString :string="data.content.instructionsLabel"></LocalizationString>
        </li>
        <li class="hover-cursor" id="recenterMap">
          <span class="icon">
            <img class="icon icon-recenter icon-light" src="/icons/recenter.svg" alt="recenter the map icon" /></span>
          <LocalizationString :string="data.content.recenterLabel"></LocalizationString>
        </li>
      </ul>
    </nav>
    <nav class="map-marker-list map-box">
      <h3 v-if="data.content">
        <LocalizationString :string="data.content.markersTitle"></LocalizationString>
      </h3>
      <ul v-if="markersSorted">
        <MapControlsMarkerListItem v-for="(item, index) in  markersSorted " :key="index" :item="item" :index="index">
        </MapControlsMarkerListItem>
      </ul>
    </nav>
  </div>
</template>

<script>

import { groq } from '@nuxtjs/sanity'
const query = groq`
{
  "content" : *[_type == "settings2"][0],
  "markers" : {
    "marker1": *[_id == "marker1"][0]{
      "title": content.title
    },
    "marker2": *[_id == "marker2"][0]{
      "title": content.title
    },
      "marker3": *[_id == "marker3"][0]{
      "title": content.title
    },
      "marker4": *[_id == "marker4"][0]{
      "title": content.title
    },
      "marker5": *[_id == "marker5"][0]{
      "title": content.title
    },
      "marker6": *[_id == "marker6"][0]{
      "title": content.title
    },
  }
}
`


export default {
  data: () => ({
    data: '',
    isExpanded: false,
  }),
  async fetch() {
    this.data = await this.$sanity.fetch(query)
  },
  fetchOnServer: false,
  props: {
    markersData: {
      type: Array,
    },
  },
  computed: {
    markersSorted() {
      if (!this.data) { return null }
      if (!this.data.markers) { return null }
      const orderedKeys = ["marker1", "marker2", "marker3", "marker4", "marker5", "marker6"]
      const sections = [];
      const sectionsToSort = this.data.markers;
      for (const key in sectionsToSort) {
        if (sectionsToSort.hasOwnProperty(key)) {
          if (key === orderedKeys[0]) {
            sections[0] = sectionsToSort[key];
          }
          if (key === orderedKeys[1]) {
            sections[1] = sectionsToSort[key];
          }
          if (key === orderedKeys[2]) {
            sections[2] = sectionsToSort[key];
          }
          if (key === orderedKeys[3]) {
            sections[3] = sectionsToSort[key];
          }
          if (key === orderedKeys[4]) {
            sections[4] = sectionsToSort[key];
          }
          if (key === orderedKeys[5]) {
            sections[5] = sectionsToSort[key];
          }
        }
      }
      return sections
    }
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
    showIntro() {
      this.$emit("show-intro");
    },
    showTimeline() {
      this.$emit("show-timeline");
    },
  },
};
</script>

<style lang="scss">
.map-controls-wrapper {
  top: 0;
  // padding: 80px 0px 40px 0;

  h3 {
    font-size: 18px;
    letter-spacing: 0.03em;
    background: black;
    padding: 10px 20px;
  }


  ul {
    background: #4d643f;
    margin-bottom: 15px;
    padding: 15px 20px;

    li {
      font-size: 18px;
      line-height: 22px;
    }
  }

  .map-marker-list ul li>span,
  .map-options ul li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .icon {
      flex: 0 0 35px;
      margin-right: 10px;
    }
  }
}

$marker-color-0: #54a131;
$marker-color-1: #70a131;
$marker-color-2: #8ca131;
$marker-color-3: #a19a31;
$marker-color-4: #a17e31;
$marker-color-5: #a16231;

.map-marker-list {
  #marker-0 {
    .icon {
      background-color: $marker-color-0;
    }
  }

  #marker-1 {
    .icon {
      background-color: $marker-color-1;
    }
  }

  #marker-2 {
    .icon {
      background-color: $marker-color-2;
    }
  }

  #marker-3 {
    .icon {
      background-color: $marker-color-3;
    }
  }

  #marker-4 {
    .icon {
      background-color: $marker-color-4;
    }
  }

  #marker-5 {
    .icon {
      background-color: $marker-color-5;
    }
  }

  li>* {
    .icon {
      width: 35px;
      height: 35px;
      transition: 0.3s ease all;
      -webkit-mask-image: url("./assets/icons/pin.svg");
      mask-image: url("./assets/icons/pin.svg");
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: contain;
      mask-size: contain;
      mask-position: center center;
    }

    &:not(.viewed-marker):hover {
      .icon {
        background-color: white;
      }
    }

    &.viewed-marker {
      .icon {
        background-color: $gray !important;
      }

      span span {
        text-decoration: line-through;
        color: $gray;
      }
    }
  }
}
</style>