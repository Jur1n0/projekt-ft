<script>
export default {
  name: 'App'
}
</script>

<template>
  <header class="main-header">
    <nav class="container">
      <router-link to="/" class="logo">TravelBuddy ✈️</router-link>
      <div class="nav-links">
        <router-link to="/">Moje Výlety</router-link>
      </div>
    </nav>
  </header>

  <main class="container">
    <router-view />
  </main>
</template>

<style scoped>
.main-header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
  margin-bottom: 2rem;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
}
.nav-links a {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
}
.nav-links a.router-link-active {
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
}
</style>
