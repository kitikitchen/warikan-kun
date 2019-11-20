<template>
  <header class="title">
    <h1>割り勘<span>くん</span></h1>
  </header>
</template>

<style scoped lang="scss">
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 600;
  font-size: 20px;
  color: #35495e;
  letter-spacing: 1px;

  span {
    font-size: 0.7em;
  }

  // @include breakpoint-up(sm) {
  //   background: turquoise;
  //   &::after {
  //     content: "：SM";
  //   }
  // }
  // @include breakpoint-up(md) {
  //   background: violet;
  //   &::after {
  //     content: "：MD";
  //   }
  // }
  // @include breakpoint-up(lg) {
  //   background: wheat;
  //   &::after {
  //     content: "：LG";
  //   }
  // }
}
</style>
