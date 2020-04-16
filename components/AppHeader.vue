<template>
  <header class="header">
    <h1 class="title">
      <img src="@/static/logo.svg" alt=""><span>割り勘<small>くん</small></span>
    </h1>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 100px vw(40) 40px;
  transition: ease 0.5s;

  .is-success & {
    padding: 15px vw(40) 10px;
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: $color-red;
  line-height: 1;
  letter-spacing: 1px;
  text-align: center;
  font-size: 40px;
  transition: ease 0.5s;

  img {
    width: 40px;
    margin-right: 10px;
    transition: ease 0.5s;
  }

  small {
    font-size: 0.7em;
    margin-left: 0.1rem;
  }

  .is-success & {
    font-size: 20px;

    img {
      width: 26px;
      margin-right: 10px;
    }
  }
}
</style>
