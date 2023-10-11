<template>
  <div :class="name" class="toc">
    <nav>
      <h1>Table of Contents</h1>
      <ul>
        <li>
          <nuxt-link to="/1">Introduction</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/1/stories">Introduction Stories</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/1/stories/1"
            >Introduction: Meet Luba Chumot</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/1/stories/2"
            >Introduction: Meet Yosef Zilberberg</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/1/stories/3"
            >Introduction: Meet Miriam Schwartzman</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/2">Occupation</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/2/talkback">Occupation Talkback</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/3">Resistance</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/3/talkback">Resistance Talkback</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/4">Aftermath</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/4/stories">Aftermath Stories</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/4/stories/1">Aftermath: Laura Oberlender</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/4/stories/2">Aftermath: Yosef Zilberberg</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/4/stories/3">Aftermath: Miriam Schwartzman</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/5">Conclusion</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "table-of-contents",
    };
  },
  head() {
    return {
      title: this.name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" "),
    };
  },
  layout: "admin",
};
</script>

<style lang="scss">
.toc {
  li {
    margin-bottom: 15px;
  }
  a:hover {
    text-decoration: underline;
  }
  h1 {
    margin-bottom: 30px;
  }
}
</style>

