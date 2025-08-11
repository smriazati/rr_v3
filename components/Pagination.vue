<template>
  <nav ref="pagination" class="pagination" :class="{ 'back-btn': back }">
    <div class="tree-icon">
      <img src="/icons/tree.svg" alt="" />
    </div>
    <NuxtLink :to="{ path: link, query: route.query }" class="wrapper">
      <h3 class="subheadline">
        <span v-if="back">
          <LocalizationString :string="backLabel" align="center" />
        </span>
        <span v-else>
          <LocalizationString :string="nextLabel" align="center" />
        </span>
      </h3>
      <span class="cta">
        <LocalizationString :string="message" />
        <SystemIcon type="arrow" color="light" :width="25" />
      </span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { LocalizedString } from '~/types/sanity';


// Props
const props = defineProps<{
  message: LocalizedString,
  link: string
  back?: boolean
}>()



const query = `*[_type == "settings"]{
  "prev": siteNavLabels.prev,
  "next": siteNavLabels.next
}[0]`

const { data: labels } = useSanityQuery<any>(query)

const backLabel = computed(() => labels.value?.prev)
const nextLabel = computed(() => labels.value?.next)

// console.log('Back label raw:', labels.value?.prev);




const route = useRoute()
</script>

<style scoped lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;
@use "sass:color";

@keyframes slideIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes arrowBounce {
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(15px);
  }
}

@keyframes arrowBounceFlipped {
  from {
    transform: translateX(0px) rotate(180deg);
  }

  to {
    transform: translateX(-15px) rotate(180deg);
  }
}

.pagination {
  overflow: hidden;
  position: fixed;
  z-index: 130;
  animation: slideIn 0.8s ease-in forwards;
  bottom: 100px;
  right: 30px;
  color: #fff;
  text-align: center;
  background: $gray;
  transition: 0.3s ease all;

  @media (min-width: $collapse-bp) {
    border-radius: 5px;
    background: $forest;
  }


  .tree-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    text-align: left;

    img {
      margin-right: auto;
      height: 100%;
      object-fit: contain;
      object-position: left center;
      position: absolute;
      left: -17px;
      filter: grayscale(1);

      @media (max-width: $collapse-bp) {
        left: -40px;
        filter: grayscale(1) invert(1);
      }
    }
  }

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
    z-index: 5;
    height: 100%;
  }

  h3 {
    color: #fff;
    margin-bottom: 10px;
  }

  a {
    background: $gray;
    transition: 0.3s ease background;
    min-width: 300px;
    min-height: 10vh;
    max-height: 15vh;

    @media (max-width: $collapse-bp) {
      background: rgba($forest, 0.8);
    }

    &:hover {
      background: rgba($white, 0.8);
      color: $gray;

      * {
        color: $gray;
      }

      .icon-arrow {
        filter: grayscale(1) invert(0);
      }
    }



    @media (max-height: 800px) {
      max-height: 300px;
    }

    *:hover {
      text-decoration: none;
    }

    .cta {
      display: flex;
      justify-content: center;
      font-size: 22px;
      line-height: 24px;

      >.icon {
        margin-left: 15px;
        width: 30px;
        animation: arrowBounce 0.9s ease-in alternate infinite;
      }
    }
  }

  &.back-btn {
    right: unset;

    @media (min-width: $collapse-bp) {
      left: 30px;
    }


    .tree-icon {
      left: unset;
      right: 0;

      img {
        left: unset;
        right: -47px;
      }
    }

    @media (max-width: $collapse-bp) {
      background: color.adjust($forest, $lightness: -20%);


      a {
        background: color.change(color.adjust($forest, $lightness: -20%),
            $alpha: 0.3);
      }

      .tree-icon {
        opacity: 0.3;
      }
    }

    .cta {
      flex-direction: row-reverse;

      >.icon {
        margin-right: 15px;
        margin-left: unset;
        animation: arrowBounceFlipped 0.9s ease-in alternate infinite;
      }
    }
  }
}

// .pagination mobile positions
@media (max-width: $collapse-bp) {

  .occupation .pagination,
  .resistance .pagination {
    position: fixed;
  }

  .pagination {
    display: flex;
    position: relative;
    align-items: center;
    bottom: 0px !important;
    left: 0;
    width: 100%;

    .wrapper {
      margin: 0 auto;
      padding: 30px;
    }
  }
}

nav.pagination:hover {
  background: $white;

  .icon.light {
    filter: invert(0);
  }
}

@media (max-width: $collapse-bp) {
  div.pagination {
    align-items: stretch;

    nav.pagination {
      min-height: 100%;

      .wrapper {
        min-height: 100%;
      }
    }
  }
}
</style>
