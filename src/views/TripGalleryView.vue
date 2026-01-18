<script lang="ts">
import { useTripStore } from '../stores/trip'
import BaseInput from '../components/BaseInput.vue'

export default {
  name: 'TripGalleryView',
  components: { BaseInput },
  props: ['id'],
  data() {
    return {
      newPhoto: { url: '', date: '' },
    }
  },
  computed: {
    trip() {
      return useTripStore().getTripById(this.id)
    },
    groupedPhotos() {
      if (!this.trip?.photos) return {}

      return this.trip.photos.reduce((groups: any, photo) => {
        let displayDate = 'Bez dátumu'

        if (photo.date) {
          const [year, month, day] = photo.date.split('-')
          displayDate = `${day}.${month}.${year}`
        }

        if (!groups[displayDate]) {
          groups[displayDate] = []
        }
        groups[displayDate].push(photo)
        return groups
      }, {})
    },
  },
  methods: {
    savePhoto() {
      if (!this.newPhoto.url.trim() || !this.newPhoto.date) {
        alert('Prosím, vyplňte URL fotky aj dátum.')
        return
      }

      useTripStore().addPhoto(Number(this.id), {
        ...this.newPhoto,
        id: Date.now(),
      })

      this.newPhoto = { url: '', date: '' }
    },
    removePhoto(photoId: number) {
      if (confirm('Naozaj chcete vymazať túto fotku?')) {
        useTripStore().deletePhoto(Number(this.id), photoId)
      }
    },
    makeCover(url: string) {
      useTripStore().setCoverPhoto(Number(this.id), url)
    },
  },
}
</script>

<template>
  <div v-if="trip" class="trip-gallery">
    <div class="gallery-card">
      <h3>Galéria</h3>
      <div class="photo-form">
        <h3>Pridať novú fotku</h3>
        <BaseInput
          v-model="newPhoto.url"
          label="URL fotky *"
          placeholder="http://localhost:5173/images/barcelona/photo1.jpg"
        />
        <BaseInput v-model="newPhoto.date" type="date" label="Dátum *" />
        <button @click="savePhoto" class="btn-add">Uložiť fotku</button>
      </div>

      <div v-for="(photos, date) in groupedPhotos" :key="date" class="date-group">
        <h3 class="date-title">{{ date }}</h3>
        <div class="photo-grid">
          <div v-for="photo in photos" :key="photo.id" class="photo-item">
            <div
              class="image-wrapper"
              :class="{ 'is-cover': trip.image === photo.url }"
              @click="makeCover(photo.url)"
            >
              <img :src="photo.url" class="gallery-img" alt="photo"/>
              <div v-if="trip.image === photo.url" class="cover-badge">★</div>
              <button @click.stop="removePhoto(photo.id)" class="btn-delete-photo">✕</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  color: #42b983;
  font-size: 1.7rem;
  margin: 0;
  margin-bottom: 1rem;
}

.gallery-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.photo-form h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.3rem;
}

.photo-form {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}

.date-title {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 15px;
  border-bottom: none;
}

.image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  cursor: pointer;
  border-radius: 14px;
  border: 3px solid transparent;
  transition: all 0.2s;
}

.image-wrapper:hover {
  transform: scale(1.02);
}

.image-wrapper.is-cover {
  border-color: #42b983;
  box-shadow: 0 0 10px rgba(66, 185, 131, 0.4);
}

.cover-badge {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: #42b983;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.gallery-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  padding: 3px;
}

.btn-delete-photo {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 77, 77, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
  transition: transform 0.2s;
}

.btn-delete-photo:hover {
  transform: scale(1.1);
  background: #ff4d4d;
}

.btn-add {
  width: 100%;
  padding: 10px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 34, 34, 0.1);
}
</style>
