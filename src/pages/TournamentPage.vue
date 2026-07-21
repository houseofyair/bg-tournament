<template>
  <div class="card">
    <div class="header" v-if="currentState === 0">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap">
        <button type="button" class="btn btn-primary" @click="onStartRound">Generate Round {{ currentRound + 1 }}</button>
        <button type="button" class="btn btn-reset" @click="onResetTournament">
          Reset Tournament
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon-retry">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <polyline points="21 3 21 8 16 8" />
          </svg>
        </button>
      </div>
    </div>

    <DisplayCurrentTable v-if="currentState === 1" />
    <TournamentCompleted v-else-if="currentState === 2" />
  </div>
</template>

<script setup lang="ts">
import DisplayCurrentTable from '@/components/tournament/DisplayCurrentTable.vue'
import TournamentCompleted from '@/components/tournament/TournamentCompleted.vue'
import { useTournament } from '@/composables/useTournament.ts'

const { currentRound, currentState, generateNextRound, resetTournament } = useTournament()

function onStartRound() {
  generateNextRound()
}

function onResetTournament() {
  if (window.confirm('Are you sure you want to restart the tournament?')) {
    resetTournament()
  }
}
</script>
