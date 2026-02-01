<script setup lang="ts">
import { Terminal, Shield, Cpu } from 'lucide-vue-next';

const features = [
  { title: "DEFENSE", icon: Shield, color: "neon-blue", desc: "Network fortification and threat analysis protocols." },
  { title: "OFFENSE", icon: Cpu, color: "neon-purple", desc: "Ethical hacking and penetration testing methodologies." },
  { title: "RESEARCH", icon: Terminal, color: "neon-green", desc: "Vulnerability assessment and cryptographic studies." }
];
</script>

<template>
  <div class="hero-container">
    <!-- Shield Icon Section -->
    <div 
      class="shield-wrapper"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    >
      <div class="shield-blur"></div>
      <Shield class="shield-icon" />
    </div>

    <!-- Title -->
    <h1 
      class="title"
      v-motion
      :initial="{ scale: 0.9, opacity: 0 }"
      :enter="{ scale: 1, opacity: 1, transition: { duration: 500, delay: 200 } }"
    >
      OWL CYBER CLUB
    </h1>

    <!-- System Badge -->
    <div 
      class="system-badge"
      v-motion
      :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { delay: 500 } }"
    >
      <Terminal :size="18" />
      <span>SYSTEM.INIT_SEQUENCE_COMPLETE</span>
      <span class="cursor-blink"></span>
    </div>

    <!-- Features Grid -->
    <div class="features-grid">
      <div 
        v-for="(item, i) in features" 
        :key="item.title"
        class="feature-card"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 800 + (i * 200) } }"
      >
        <div class="card-gradient"></div>
        <component :is="item.icon" class="feature-icon" :class="`text-${item.color}`" />
        <h3 class="feature-title" :class="`text-${item.color}`">{{ item.title }}</h3>
        <p class="feature-desc">{{ item.desc }}</p>
        
        <!-- Animated border line on bottom -->
         <div 
            class="bottom-line"
            :class="`bg-${item.color}`"
            v-motion
            :initial="{ width: '0%' }"
            :visible="{ width: '100%', transition: { duration: 800, delay: 1000 + i * 200 } }"
         ></div>
      </div>
    </div>

    <!-- Button -->
    <button 
      class="join-button"
      v-motion
      :hover="{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 243, 255, 0.5)' }"
      :tap="{ scale: 0.95 }"
    >
      <span class="btn-text">Join the Network</span>
      <div class="btn-hover-bg"></div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

// Mixins for colors
@mixin text-neon-blue { color: $neon-blue; }
@mixin text-neon-purple { color: $neon-purple; }
@mixin text-neon-green { color: $neon-green; }
@mixin bg-neon-blue { background-color: $neon-blue; }
@mixin bg-neon-purple { background-color: $neon-purple; }
@mixin bg-neon-green { background-color: $neon-green; }

// Utility classes for dynamic bindings
.text-neon-blue { @include text-neon-blue; }
.text-neon-purple { @include text-neon-purple; }
.text-neon-green { @include text-neon-green; }
.bg-neon-blue { @include bg-neon-blue; }
.bg-neon-purple { @include bg-neon-purple; }
.bg-neon-green { @include bg-neon-green; }

.hero-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  max-width: 72rem; // max-w-6xl
  margin: 5rem auto 0;
  text-align: center;
}

.shield-wrapper {
  margin-bottom: 2rem;
  position: relative;
  
  .shield-blur {
    position: absolute;
    inset: -1rem;
    background-color: $neon-blue;
    border-radius: 9999px;
    opacity: 0.2;
    filter: blur(24px);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .shield-icon {
    width: 6rem;
    height: 6rem;
    color: $neon-blue;
    position: relative;
    z-index: 10;
  }
}

.title {
  font-size: 3.75rem; // text-6xl
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.05em; // tracking-tighter
  margin-bottom: 1rem;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, $neon-blue, $neon-purple, $neon-blue);
  background-size: 200% auto;
  animation: gradient 3s linear infinite;

  @media (min-width: 768px) {
    font-size: 6rem; // md:text-8xl
  }
}

.system-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: $neon-green;
  margin-bottom: 3rem;
  background-color: rgba($cyber-dark, 0.8);
  border: 1px solid rgba($neon-green, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-family: monospace;
  font-size: 0.875rem;
  box-shadow: 0 0 10px rgba(10, 255, 10, 0.2);
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
}

.cursor-blink {
  width: 0.5rem;
  height: 1rem;
  background-color: $neon-green;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  margin-left: 0.25rem;
}

.features-grid {
  display: grid;
  gap: 1.5rem;
  width: 100%;
  max-width: 56rem; // max-w-4xl
  text-align: left;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.feature-card {
  position: relative;
  padding: 1.5rem;
  background-color: $cyber-dark;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  border-radius: 0.75rem; // rounded-xl
  backdrop-filter: blur(4px);
  transition: border-color 0.3s;
  
  &:hover {
    border-color: rgba($neon-blue, 0.5);
    
    .card-gradient {
      opacity: 1;
    }
  }
}

.card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba($neon-blue, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.feature-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem; // text-xl
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.feature-desc {
  color: #9ca3af; // text-gray-400
  font-size: 0.875rem;
  line-height: 1.625;
}

.bottom-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
}

.join-button {
  margin-top: 4rem;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid $neon-blue;
  color: $neon-blue;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    color: $cyber-black;
    background-color: $neon-blue; // Fallback
    
    .btn-hover-bg {
      transform: translateX(0);
    }
  }
}

.btn-text {
  position: relative;
  z-index: 10;
  transition: color 0.3s;
}

.btn-hover-bg {
  position: absolute;
  inset: 0;
  background-color: $neon-blue;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  transform-origin: left;
  z-index: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
