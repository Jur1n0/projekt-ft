import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TripDetailView from '../views/TripDetailView.vue'
import TripItineraryView from '../views/TripItineraryView.vue'
import TipView from '../views/TipView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Parent cesta pre detail výletu
      path: '/trip/:id',
      name: 'trip-detail',
      component: TripDetailView,
      props: true,
      children: [
        {
          path: 'itinerary',
          name: 'trip-itinerary',
          component: TripItineraryView,
          props: true
        }
      ]
    },
    {
      path: '/tips',
      name: 'tips',
      component: TipView
    }
  ]
})

export default router
