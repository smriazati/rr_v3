<template>
  <div :class="name" class="toc">
    <nav>
      <h1>Table of Contents</h1>
      <ul>
        <li>
          <nuxt-link to="/intro">Introduction</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/intro/stories">Introduction Stories</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/intro/stories/1">Introduction: Meet Luba Chumot</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/intro/stories/2">Introduction: Meet Yosef Zilberberg</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/intro/stories/3">Introduction: Meet Miriam Schwartzman</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/occupation">Occupation</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/occupation/talkback">Occupation Talkback</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/resistance">Resistance</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/resistance/talkback">Resistance Talkback</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/aftermath">Aftermath</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/aftermath/stories">Aftermath Stories</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/aftermath/stories/1">Aftermath: Laura Oberlender</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/aftermath/stories/2">Aftermath: Yosef Zilberberg</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/aftermath/stories/3">Aftermath: Miriam Schwartzman</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/conclusion">Conclusion</nuxt-link>
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

