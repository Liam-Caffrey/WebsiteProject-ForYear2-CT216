<template>
  <form autocomplete="off">
    <div class = "autocomplete" style="width: 300px;">
      <input id = "myInput" type = "text" name = "myPlayer" placeholder="Enter a player's name"/>
    </div>
  </form>
</template>

<script>
</script>

<style scoped>
.autocomplete{
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.autocomplete-items{
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete-items div:hover{
  background-color: #e9e9e9;
}
.autocomplete-active{
  background-color: dodgerblue !important;
  color: #ffffff;
}
#myInput{
  width: 100%;
}
</style>