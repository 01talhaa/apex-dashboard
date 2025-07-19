<template>
  <div class="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full pointer-events-none">
    <TransitionGroup name="notification" tag="div" class="space-y-3">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'notification-card relative overflow-hidden',
          'bg-white/90 backdrop-blur-xl shadow-2xl',
          'rounded-2xl border border-white/20',
          'pointer-events-auto',
          'transform transition-all duration-500 ease-out',
          'hover:shadow-3xl hover:scale-[1.03] hover:-translate-y-1',
          'group cursor-pointer',
          getNotificationClass(notification.type)
        ]"
        @click="handleNotificationClick(notification)"
      >
        <!-- Animated background gradient -->
        <div :class="[
          'absolute inset-0 opacity-5 transition-opacity duration-500',
          'group-hover:opacity-10',
          getBackgroundGradientClass(notification.type)
        ]"></div>
        
        <!-- Glowing border effect -->
        <div :class="[
          'absolute inset-0 rounded-2xl transition-all duration-500',
          'opacity-0 group-hover:opacity-100',
          getBorderGlowClass(notification.type)
        ]"></div>
        
        <!-- Progress bar -->
        <div 
          v-if="notification.duration > 0"
          :class="[
            'absolute top-0 left-0 h-1 transition-all duration-100 ease-linear',
            'rounded-t-2xl',
            getProgressBarClass(notification.type)
          ]"
          :style="{ width: getProgressWidth(notification) }"
        ></div>
        
        <!-- Main content -->
        <div class="relative p-5">
          <div class="flex items-start space-x-4">
            <!-- Animated icon -->
            <div class="flex-shrink-0">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center',
                'transform transition-all duration-300',
                'group-hover:scale-110 group-hover:rotate-6',
                getIconBackgroundClass(notification.type)
              ]">
                <component 
                  :is="getIcon(notification.type)" 
                  :class="[
                    'w-5 h-5 transition-all duration-300',
                    'group-hover:scale-110',
                    getIconColorClass(notification.type)
                  ]" 
                />
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <p :class="[
                    'text-sm font-bold leading-5 mb-1',
                    'transition-colors duration-200',
                    getTextColorClass(notification.type)
                  ]">
                    {{ getNotificationTitle(notification.type) }}
                  </p>
                  <p class="text-sm text-gray-700 leading-relaxed font-medium">
                    {{ notification.message }}
                  </p>
                  
                  <!-- Actions -->
                  <div v-if="notification.actions && notification.actions.length > 0" 
                       class="mt-3 flex space-x-2">
                    <button
                      v-for="action in notification.actions"
                      :key="action.label"
                      @click.stop="action.action()"
                      :class="[
                        'px-3 py-1 text-xs font-semibold rounded-lg',
                        'transition-all duration-200',
                        'hover:shadow-md hover:scale-105',
                        action.style === 'primary' ? 
                          'bg-blue-500 text-white hover:bg-blue-600' : 
                          'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]"
                    >
                      {{ action.label }}
                    </button>
                  </div>
                </div>
                
                <!-- Close button -->
                <button
                  @click.stop="removeNotification(notification.id)"
                  class="ml-3 flex-shrink-0 p-1.5 rounded-xl hover:bg-black/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 group/close"
                >
                  <span class="sr-only">Close</span>
                  <svg class="w-4 h-4 text-gray-400 group-hover/close:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Floating particles effect -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div v-for="i in 3" :key="i" :class="[
            'absolute w-1 h-1 rounded-full opacity-20',
            'animate-float-' + i,
            getParticleClass(notification.type)
          ]" :style="getParticleStyle(i)"></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref, nextTick } from 'vue'
import { useNotificationStore } from '@/stores/useNotificationStore'

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)

// Progress tracking for auto-removal
const progressTimers = ref<Record<string, number>>({})

const removeNotification = (id: string) => {
  if (progressTimers.value[id]) {
    clearInterval(progressTimers.value[id])
    delete progressTimers.value[id]
  }
  notificationStore.removeNotification(id)
}

const handleNotificationClick = (notification: any) => {
  // If it's a persistent notification with actions, don't auto-close
  if (notification.persistent && notification.actions && notification.actions.length > 0) {
    return
  }
  
  // Otherwise, close on click
  removeNotification(notification.id)
}

const getNotificationClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'notification-success'
    case 'error':
      return 'notification-error'
    case 'warning':
      return 'notification-warning'
    case 'info':
      return 'notification-info'
    default:
      return 'notification-default'
  }
}

const getBackgroundGradientClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600'
    case 'error':
      return 'bg-gradient-to-br from-red-400 via-red-500 to-rose-600'
    case 'warning':
      return 'bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600'
    case 'info':
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600'
    default:
      return 'bg-gradient-to-br from-gray-400 via-gray-500 to-slate-600'
  }
}

const getBorderGlowClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'border-2 border-green-400/50 shadow-lg shadow-green-400/25'
    case 'error':
      return 'border-2 border-red-400/50 shadow-lg shadow-red-400/25'
    case 'warning':
      return 'border-2 border-amber-400/50 shadow-lg shadow-amber-400/25'
    case 'info':
      return 'border-2 border-blue-400/50 shadow-lg shadow-blue-400/25'
    default:
      return 'border-2 border-gray-400/50 shadow-lg shadow-gray-400/25'
  }
}

const getProgressBarClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/50'
    case 'error':
      return 'bg-gradient-to-r from-red-400 to-rose-500 shadow-lg shadow-red-400/50'
    case 'warning':
      return 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-400/50'
    case 'info':
      return 'bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-blue-400/50'
    default:
      return 'bg-gradient-to-r from-gray-400 to-slate-500 shadow-lg shadow-gray-400/50'
  }
}

const getIconBackgroundClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 shadow-lg shadow-green-200/50'
    case 'error':
      return 'bg-gradient-to-br from-red-50 to-rose-100 border-2 border-red-200 shadow-lg shadow-red-200/50'
    case 'warning':
      return 'bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200 shadow-lg shadow-amber-200/50'
    case 'info':
      return 'bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-lg shadow-blue-200/50'
    default:
      return 'bg-gradient-to-br from-gray-50 to-slate-100 border-2 border-gray-200 shadow-lg shadow-gray-200/50'
  }
}

const getIconColorClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-600'
    case 'error':
      return 'text-red-600'
    case 'warning':
      return 'text-amber-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-gray-600'
  }
}

const getTextColorClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-900'
    case 'error':
      return 'text-red-900'
    case 'warning':
      return 'text-amber-900'
    case 'info':
      return 'text-blue-900'
    default:
      return 'text-gray-900'
  }
}

const getParticleClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-400'
    case 'error':
      return 'bg-red-400'
    case 'warning':
      return 'bg-amber-400'
    case 'info':
      return 'bg-blue-400'
    default:
      return 'bg-gray-400'
  }
}

const getParticleStyle = (index: number) => {
  const positions = [
    { top: '20%', left: '20%' },
    { top: '60%', left: '80%' },
    { top: '80%', left: '30%' }
  ]
  return positions[index - 1] || positions[0]
}

const getNotificationTitle = (type: string) => {
  switch (type) {
    case 'success':
      return '✨ Success'
    case 'error':
      return '🚨 Error'
    case 'warning':
      return '⚠️ Warning'
    case 'info':
      return '💡 Information'
    default:
      return '📢 Notification'
  }
}

const getProgressWidth = (notification: any) => {
  if (notification.duration <= 0) return '100%'
  
  const elapsed = Date.now() - notification.timestamp
  const remaining = Math.max(0, notification.duration - elapsed)
  const percentage = (remaining / notification.duration) * 100
  
  return `${percentage}%`
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return h('svg', {
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        strokeWidth: 2.5
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        })
      ])
    case 'error':
      return h('svg', {
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        strokeWidth: 2.5
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
        })
      ])
    case 'warning':
      return h('svg', {
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        strokeWidth: 2.5
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
        })
      ])
    case 'info':
      return h('svg', {
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        strokeWidth: 2.5
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        })
      ])
    default:
      return h('svg', {
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        strokeWidth: 2.5
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8'
        })
      ])
  }
}

// Watch for new notifications and set up progress tracking
const watchNotifications = async () => {
  await nextTick()
  notifications.value.forEach(notification => {
    if (notification.duration > 0 && !progressTimers.value[notification.id]) {
      progressTimers.value[notification.id] = setInterval(() => {
        // Force reactivity update
        const elapsed = Date.now() - notification.timestamp
        if (elapsed >= notification.duration) {
          removeNotification(notification.id)
        }
      }, 50) as any // More frequent updates for smoother progress bar
    }
  })
}

// Clean up timers when component unmounts
const cleanup = () => {
  Object.values(progressTimers.value).forEach(timer => {
    clearInterval(timer)
  })
  progressTimers.value = {}
}

onMounted(() => {
  watchNotifications()
  
  // Watch for changes in notifications
  const unwatchNotifications = computed(() => notifications.value.length)
  unwatchNotifications.effect = () => {
    watchNotifications()
  }
})

// Clean up on unmount
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', cleanup)
}
</script>

<style scoped>
/* Enhanced notification animations */
.notification-enter-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.7) rotateY(45deg);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8) rotateY(-45deg);
}

.notification-move {
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Beautiful notification card styles */
.notification-card {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.notification-card:hover {
  box-shadow: 
    0 35px 60px -12px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* Type-specific enhanced styles */
.notification-success {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.1) 100%);
  border-left: 4px solid #10b981;
}

.notification-error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.1) 100%);
  border-left: 4px solid #ef4444;
}

.notification-warning {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.1) 100%);
  border-left: 4px solid #f59e0b;
}

.notification-info {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%);
  border-left: 4px solid #3b82f6;
}

.notification-default {
  background: linear-gradient(135deg, rgba(107, 114, 128, 0.05) 0%, rgba(75, 85, 99, 0.1) 100%);
  border-left: 4px solid #6b7280;
}

/* Floating particle animations */
@keyframes float-1 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.2;
  }
  33% {
    transform: translateY(-10px) rotate(120deg);
    opacity: 0.8;
  }
  66% {
    transform: translateY(-5px) rotate(240deg);
    opacity: 0.4;
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
    opacity: 0.9;
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.1;
  }
  25% {
    transform: translateY(-8px) rotate(90deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-12px) rotate(270deg);
    opacity: 0.3;
  }
}

.animate-float-1 {
  animation: float-1 3s ease-in-out infinite;
  animation-delay: 0s;
}

.animate-float-2 {
  animation: float-2 4s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-3 {
  animation: float-3 5s ease-in-out infinite;
  animation-delay: 2s;
}

/* Icon pulse animation for new notifications */
@keyframes iconPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.notification-card:first-child .notification-icon {
  animation: iconPulse 1s ease-out;
}

/* Glowing progress bar */
.notification-card .progress-bar {
  position: relative;
  overflow: hidden;
}

.notification-card .progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Enhanced hover effects */
.notification-card {
  position: relative;
  overflow: hidden;
}

.notification-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
  z-index: 1;
}

.notification-card:hover::before {
  left: 100%;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .notification-container {
    left: 1rem;
    right: 1rem;
    max-width: none;
  }
  
  .notification-card {
    border-radius: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .notification-card {
    background: rgba(31, 41, 55, 0.95);
    border: 1px solid rgba(75, 85, 99, 0.3);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .notification-success {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.15) 100%);
  }
  
  .notification-error {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.15) 100%);
  }
  
  .notification-warning {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.15) 100%);
  }
  
  .notification-info {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.15) 100%);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .notification-enter-active,
  .notification-leave-active,
  .notification-move,
  .animate-float-1,
  .animate-float-2,
  .animate-float-3 {
    animation: none;
    transition: opacity 0.2s ease;
  }
}

/* Focus styles for accessibility */
.notification-card:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .notification-container {
    display: none;
  }
}
</style>
