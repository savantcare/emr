<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  /*  font-size: 16px;
      Removing  font-size since we want Dr. Keeling to be able to change font-size in her borwser and the emr should adopt itself.
  */

  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}


.button--blue {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid rgb(0, 153, 255);
  color: rgba(0, 0, 255, 0.705);
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--blue:hover {
  color: #fff;
  background-color: rgb(0, 153, 255);
}

/* Now text inside the button willl change based on Dr. Keeling choice inside the browser settings 
The default value given by element.io is 14px

*/
.el-button {
  font-size: 1rem;
}
</style>
