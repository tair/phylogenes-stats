<template>
<div>    
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">Phylogenes Statistics</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/home">
              <a class="nav-link" >Home <span class="sr-only">(current)</span></a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/page1">
             <a class="nav-link" href="#">Page 1</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/page2">
              <a class="nav-link" href="#">Page 2</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/page3">
              <a class="nav-link" href="#">Page 3</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>  
  </div>
</template>

<script>
export default {
  name: 'navBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
