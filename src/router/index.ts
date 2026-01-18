import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TripDetailView from '../views/TripDetailView.vue'
import TripItineraryView from '../views/TripItineraryView.vue'
import TipView from '../views/TipView.vue'
import GalleryView from '../views/GalleryView.vue'
import TripGalleryView from '../views/TripGalleryView.vue'
import StatsView from '@/views/StatsView.vue'
import HistoryView from '@/views/HistoryView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/trip/:id',
      name: 'trip-detail',
      component: TripDetailView,
      props: true,
      children: [
        {
          path: 'itinerary',
          name: 'trip-itinerary',
          component: TripItineraryView,
          props: true,
        },
        {
          path: 'gallery',
          name: 'trip-gallery',
          component: TripGalleryView,
          props: true,
        },
      ],
    },
    {
      path: '/tips',
      name: 'tips',
      component: TipView,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
    },
  ],
})

export default router
