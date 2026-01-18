<script lang="ts">
import { useTripStore } from '../stores/trip'
import BudgetSummary from '../components/BudgetSummary.vue'
import BaseInput from '../components/BaseInput.vue'

export default {
  name: 'TripDetailView',
  components: { BudgetSummary, BaseInput },
  props: ['id'],
  data() {
    return {
      isEditingBudget: false,
      tempBudget: 0,
      showMemoryForm: false,
      memoriesText: ''
    }
  },
  computed: {
    trip() {
      return useTripStore().getTripById(this.id)
    }
  },
  methods: {
    startEditBudget() {
      this.tempBudget = this.trip.budget
      this.isEditingBudget = true
    },
    saveBudget() {
      useTripStore().updateTripBudget(Number(this.id), this.tempBudget)
      this.isEditingBudget = false
    },
    openCompleteModal() {
      this.memoriesText = this.trip.memories || ''
      this.showMemoryForm = true
    },
    saveCompletion() {
      if (this.memoriesText.trim() === '') {
        alert('Prosím, napíšte aspoň krátku spomienku alebo mená ľudí.')
        return
      }
      useTripStore().updateTripStatus(Number(this.id), true, this.memoriesText)
      this.showMemoryForm = false
      // Po uložení presmerujeme do histórie, kde výlet po novom patrí
      this.$router.push('/history')
    },
    revertTrip() {
      const confirmMsg = 'Naozaj chcete vrátiť tento výlet medzi plánované? Všetky zapísané spomienky a označenie o ukončení sa nenávratne zmažú.'
      if (confirm(confirmMsg)) {
        useTripStore().updateTripStatus(Number(this.id), false, '')
      }
    }
  }
}
</script>

<template>
  <div v-if="trip" class="detail-layout">
    <header class="detail-header">
      <h1>{{ trip.title }}</h1>
      <router-link to="/" class="back-link">
        ← Späť na zoznam
      </router-link>
    </header>

    <div v-if="trip.completed" class="completion-banner">
      <div class="banner-text">
        <span class="icon">🎉</span>
        <div>
          <strong>Tento výlet je už v tvojej histórii</strong>
          <p>Uložené spomienky nájdeš v detaile nižšie.</p>
        </div>
      </div>
      <button @click="revertTrip" class="btn-revert">Vrátiť medzi plánované</button>
    </div>

    <div class="detail-hero">
      <div class="hero-image-container">
        <img :src="trip.image" :alt="trip.title" class="hero-img">
      </div>

      <div class="hero-content">
        <div v-if="!isEditingBudget" class="budget-display">
          <BudgetSummary :totalBudget="trip.budget" :itinerary="trip.itinerary" />
          <button class="btn-edit-small" @click="startEditBudget">Upraviť rozpočet</button>
        </div>
        <div v-else class="budget-edit">
          <BaseInput v-model.number="tempBudget" type="number" label="Nový rozpočet" />
          <button class="btn-save" @click="saveBudget">Uložiť</button>
        </div>

        <div class="trip-actions">
          <button v-if="!trip.completed" @click="openCompleteModal" class="btn-complete">
            ✅ Ukončiť výlet a zapísať spomienky
          </button>

          <div v-if="trip.completed && trip.memories" class="memories-box">
            <h4>Moje spomienky a ľudia:</h4>
            <p>{{ trip.memories }}</p>
          </div>
        </div>

        <nav class="sub-navigation-links">
          <router-link :to="'/trip/' + id + '/itinerary'" class="nav-btn">
            Zobraziť itinerár
          </router-link>
          <router-link :to="'/trip/' + id + '/gallery'" class="nav-btn secondary">
            Zobraziť galériu
          </router-link>
        </nav>
      </div>
    </div>

    <div v-if="showMemoryForm" class="modal-overlay">
      <div class="modal-window">
        <h3>Uzatvorenie výletu: {{ trip.title }}</h3>
        <p>Napíš krátku spomienku, na čo nechceš zabudnúť alebo s kým si tam bol/a:</p>
        <textarea
          v-model="memoriesText"
          placeholder="Napr.: Úžasný výlet so spolužiakmi. Najviac sa nám páčil výhľad z veže a miestne trhy..."
          class="memory-textarea"
        ></textarea>
        <div class="modal-buttons">
          <button @click="saveCompletion" class="btn-submit-modal">Uložiť do histórie</button>
          <button @click="showMemoryForm = false" class="btn-cancel-modal">Zrušiť</button>
        </div>
      </div>
    </div>

    <main class="detail-main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* HLAVNÉ ROZLOŽENIE A HLAVIČKA */
.detail-layout {
  max-width: 1000px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 2rem;
}

.back-link {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.back-link:hover {
  background-color: #42b983;
  transform: translateX(-5px);
}

/* BANNER PRE UKONČENÝ VÝLET */
.completion-banner {
  background: #e8f5e9;
  border-left: 5px solid #42b983;
  padding: 15px 25px;
  border-radius: 12px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.banner-text {
  display: flex;
  align-items: center;
  gap: 15px;
}

.banner-text .icon { font-size: 1.5rem; }
.banner-text strong { color: #1b5e20; display: block; }
.banner-text p { margin: 0; font-size: 0.85rem; color: #4caf50; }

.btn-revert {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  transition: opacity 0.2s;
}

.btn-revert:hover { opacity: 0.9; }

/* HERO SEKCIA (Karta s fotkou a info) */
.detail-hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  margin-bottom: 40px;
}

.hero-image-container {
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 15px;
  background-color: #f0f0f0;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ROZPOČET A ÚPRAVA */
.budget-display, .budget-edit {
  background: #fcfcfc;
  padding: 10px;
  border-radius: 12px;
}

.btn-edit-small, .btn-save {
  background: transparent;
  color: #6c757d;
  border: 1px solid #dee2e6;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  width: 100%;
  margin-top: 10px;
  transition: all 0.2s;
}

.btn-edit-small:hover {
  background: #f8f9fa;
  color: #2c3e50;
  border-color: #adb5bd;
}

.btn-save {
  background: #42b983;
  color: white;
  border: none;
}

/* AKČNÝ PANEL S TLAČIDLAMI */
.trip-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
}

/* Hlavné tlačidlo "Ukončiť" s gradientom */
.btn-complete {
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-complete:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.4);
}

/* Skupina navigačných tlačidiel */
.sub-navigation-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: #f1f3f5;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border: 1px solid #e9ecef;
}

.nav-btn:hover {
  background: #e9ecef;
  color: #42b983;
}

/* BOX SO SPOMIENKAMI */
.memories-box {
  background: #fff5f5;
  padding: 20px;
  border-radius: 15px;
  border-left: 5px solid #ff4d4d;
  box-shadow: inset 0 0 10px rgba(255, 77, 77, 0.05);
}

.memories-box h4 {
  margin: 0 0 8px 0;
  color: #ff4d4d;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.memories-box p {
  margin: 0;
  line-height: 1.6;
  color: #2c3e50;
  font-style: italic;
  white-space: pre-wrap;
}

/* MODÁLNE OKNO */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-window {
  background: white;
  padding: 35px;
  border-radius: 20px;
  width: 95%;
  max-width: 500px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.memory-textarea {
  width: 100%;
  height: 140px;
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.memory-textarea:focus {
  outline: none;
  border-color: #42b983;
}

.modal-buttons {
  display: flex;
  gap: 12px;
}

.btn-submit-modal {
  background: #42b983;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  flex: 2;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-submit-modal:hover { background: #3aa876; }

.btn-cancel-modal {
  background: #f1f3f5;
  border: none;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
  font-weight: 600;
}

/* RESPONZIVITA */
@media (max-width: 600px) {
  .sub-navigation-links {
    grid-template-columns: 1fr;
  }

  .hero-image-container {
    height: 250px;
  }
}
</style>
