<template>
  <header class="header">
    <h1 class="title"><img src="@/static/logo.svg" alt=""><span>割り勘<span class="small">くん</span></span></h1>
  </header>
</template>

<style scoped lang="scss">
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  color: $color-red;
  line-height: 1;
  letter-spacing: 1px;
  text-align: center;
  font-size: 36px;

  img {
    width: 44px;
    margin-right: 10px;
  }

  .small {
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
