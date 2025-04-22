import { useAuthStore } from '@/store/modules/auth'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  authStore.initializeAuth()
})
