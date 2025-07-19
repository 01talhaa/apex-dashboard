<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" v-if="isOpen" @click.self="close">
    <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative">
          <h2 class="text-2xl font-bold mb-2">🔔 Notification Settings</h2>
          <p class="text-blue-100">Customize your notification experience</p>
        </div>
        <button
          @click="close"
          class="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-8 overflow-y-auto max-h-[calc(90vh-120px)]">
        <!-- General Settings -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            ⚙️ General Settings
          </h3>
          
          <!-- Sound Toggle -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <div class="font-medium text-gray-900">Sound Effects</div>
              <div class="text-sm text-gray-600">Play sounds when notifications appear</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="localSettings.soundEnabled" 
                class="sr-only peer"
                @change="updateSettings"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <!-- Animation Toggle -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <div class="font-medium text-gray-900">Animations</div>
              <div class="text-sm text-gray-600">Enable smooth animations and transitions</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="localSettings.animationEnabled" 
                class="sr-only peer"
                @change="updateSettings"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <!-- Max Notifications -->
          <div class="p-4 bg-gray-50 rounded-2xl">
            <div class="flex items-center justify-between mb-3">
              <div>
                <div class="font-medium text-gray-900">Maximum Notifications</div>
                <div class="text-sm text-gray-600">Number of notifications to show at once</div>
              </div>
              <span class="text-lg font-bold text-blue-600">{{ localSettings.maxNotifications }}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              v-model="localSettings.maxNotifications"
              @input="updateSettings"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            >
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>

        <!-- Position Settings -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📍 Position
          </h3>
          
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="position in positions"
              :key="position.value"
              @click="setPosition(position.value)"
              :class="[
                'p-4 rounded-2xl border-2 transition-all duration-200 text-center',
                localSettings.position === position.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
              ]"
            >
              <div class="text-2xl mb-2">{{ position.icon }}</div>
              <div class="text-sm font-medium">{{ position.label }}</div>
            </button>
          </div>
        </div>

        <!-- Test Notifications -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🧪 Test Notifications
          </h3>
          
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="test in testNotifications"
              :key="test.type"
              @click="showTestNotification(test.type)"
              :class="[
                'p-4 rounded-2xl border-2 transition-all duration-200 text-center hover:scale-105',
                getTestButtonClass(test.type)
              ]"
            >
              <div class="text-2xl mb-2">{{ test.icon }}</div>
              <div class="text-sm font-medium">{{ test.label }}</div>
            </button>
          </div>
        </div>

        <!-- Statistics -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📊 Statistics
          </h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-2xl">
              <div class="text-green-700 font-semibold">Active Notifications</div>
              <div class="text-2xl font-bold text-green-800">{{ notificationStore.notificationCount }}</div>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-2xl">
              <div class="text-blue-700 font-semibold">Urgent Alerts</div>
              <div class="text-2xl font-bold text-blue-800">{{ notificationStore.urgentCount }}</div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🔧 Actions
          </h3>
          
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="clearAllNotifications"
              class="p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl font-medium transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              @click="resetSettings"
              class="p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl font-medium transition-colors duration-200"
            >
              Reset Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useNotificationStore } from '@/stores/useNotificationStore'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const notificationStore = useNotificationStore()

const localSettings = reactive({
  soundEnabled: notificationStore.soundEnabled,
  animationEnabled: notificationStore.animationEnabled,
  maxNotifications: notificationStore.maxNotifications,
  position: notificationStore.position
})

const positions = [
  { value: 'top-left', label: 'Top Left', icon: '↖️' },
  { value: 'top-center', label: 'Top Center', icon: '⬆️' },
  { value: 'top-right', label: 'Top Right', icon: '↗️' },
  { value: 'bottom-left', label: 'Bottom Left', icon: '↙️' },
  { value: 'bottom-center', label: 'Bottom Center', icon: '⬇️' },
  { value: 'bottom-right', label: 'Bottom Right', icon: '↘️' },
]

const testNotifications = [
  { type: 'success', label: 'Success', icon: '✅' },
  { type: 'error', label: 'Error', icon: '❌' },
  { type: 'warning', label: 'Warning', icon: '⚠️' },
  { type: 'info', label: 'Info', icon: 'ℹ️' },
]

const close = () => {
  emit('close')
}

const updateSettings = () => {
  notificationStore.soundEnabled = localSettings.soundEnabled
  notificationStore.animationEnabled = localSettings.animationEnabled
  notificationStore.setMaxNotifications(localSettings.maxNotifications)
}

const setPosition = (position: typeof localSettings.position) => {
  localSettings.position = position
  notificationStore.setPosition(position)
}

const getTestButtonClass = (type: string) => {
  const classes = {
    success: 'border-green-200 bg-green-50 text-green-700 hover:border-green-300',
    error: 'border-red-200 bg-red-50 text-red-700 hover:border-red-300',
    warning: 'border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300',
    info: 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300',
  }
  return classes[type as keyof typeof classes] || classes.info
}

const showTestNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
  const messages = {
    success: 'This is a test success notification! Everything is working perfectly. 🎉',
    error: 'This is a test error notification. Something went wrong, but it\'s just a test! 🔧',
    warning: 'This is a test warning notification. Please pay attention to this message. ⚡',
    info: 'This is a test info notification. Here\'s some useful information for you. 💡',
  }
  
  notificationStore[type](messages[type], undefined, {
    playSound: true,
    priority: type === 'error' ? 'high' : 'normal'
  })
}

const clearAllNotifications = () => {
  notificationStore.clearAll()
  notificationStore.success('All notifications cleared! 🧹')
}

const resetSettings = () => {
  localSettings.soundEnabled = true
  localSettings.animationEnabled = true
  localSettings.maxNotifications = 6
  localSettings.position = 'top-right'
  updateSettings()
  setPosition('top-right')
  notificationStore.info('Settings reset to defaults! ⚙️')
}
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
