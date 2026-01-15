<script lang="ts">
export default {
  name: 'App'
}
</script>

<template>
  <div id="app-container">
    <header class="main-nav">
      <div class="nav-content">
        <router-link to="/" class="logo">
          Travel<span>Buddy</span>
        </router-link>

        <nav class="nav-links">
          <router-link to="/" class="nav-link">Moje výlety</router-link>
          <router-link to="/tips" class="nav-link">Top tipy</router-link>
          <router-link to="/gallery" class="nav-link">Galéria</router-link>
        </nav>
      </div>
    </header>

    <main class="page-content">
      <router-view />
    </main>

    <footer class="main-footer">
      <p>&copy; 2024 TravelBuddy - tvoj pomocník na cestách</p>
    </footer>
  </div>
</template>

<style>
/* Globálne resety pre celý projekt */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f7f6;
  color: #2c3e50;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-nav {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
}

.logo span {
  color: #42b983;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #42b983;
}

/* Automatická trieda pre aktívny odkaz v menu */
.router-link-active:not(.logo) {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}

.page-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.main-footer {
  text-align: center;
  padding: 20px;
  background: #2c3e50;
  color: white;
  margin-top: 40px;
}
</style>
