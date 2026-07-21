<template>
  <div class="card">
    <h1>Tournament Setup</h1>
    <p style="color: #6b7280">Manage your dynamic player roster below.</p>

    <form id="player-form" class="add-player-box" @submit.prevent="onPlayerAdded">
      <input type="text" id="player-name-input" placeholder="Enter player name..." required maxlength="20" autocomplete="off" v-model="inputName" />
      <button type="submit" class="btn btn-primary">Add Player</button>
    </form>

    <div class="roster-meta">
      Total Players: <span id="player-count">{{ players.length }}</span>
    </div>

    <ul id="player-list">
      <li class="player-item" v-for="(player, index) in players" :key="index">
        <span>{{ player.name }}</span>
        <button type="button" class="delete-btn" @click.prevent="onPlayerRemove(player.name)">×</button>
      </li>
    </ul>

    <hr style="border: 0; border-top: 1px solid var(--border); margin: 2rem 0" />

    <div style="display: flex; gap: 1rem; flex-wrap: wrap">
      <button id="reset-roster-btn" class="btn btn-reset" @click="onResetTournamentAndClearPlayers">
        Reset Tournament and Clear All Players?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon-retry">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <polyline points="21 3 21 8 16 8" />
        </svg>
      </button>

      <button class="btn btn-reset" @click="onResetTournament">
        Reset Tournament
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon-retry">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <polyline points="21 3 21 8 16 8" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useTournament } from '@/composables/useTournament.ts'

const { playerAdd, playerRemove, players, resetPlayers, resetTournament } = useTournament()

const inputName: Ref<string> = ref('')

function onPlayerAdded() {
  playerAdd(inputName.value)
  inputName.value = ''
}

function onPlayerRemove(playerName: string) {
  playerRemove(playerName)
}

function onResetTournament() {
  if (window.confirm('Are you sure you want to restart the tournament?')) {
    resetTournament()
  }
}

function onResetTournamentAndClearPlayers() {
  if (window.confirm('Are you sure you want to restart the tournament and all players?')) {
    resetTournament()
    resetPlayers()
  }
}
</script>
