<template>
  <div id="category-banner" class="card" style="display: block; background: rgb(224, 231, 255)">
    <strong style="color: var(--primary)">CURRENT CATEGORY: </strong> <br />
    <span id="current-category-text">{{ currentCategory }}</span> <br />
  </div>

  <div id="tables-container" class="table-grid">
    <div class="card table-card" v-for="(table, tIdx) in _tables" :key="'table-' + tIdx">
      <h2>
        Table {{ tIdx + 1 }} — Playing:
        <span style="color: var(--primary)">{{ table.game }}</span>
      </h2>

      <div
        class="player-row"
        data-player="Bob"
        data-table="0"
        v-for="(player, pIdx) in table.players"
        :key="'table-' + tIdx + '-player-' + pIdx"
      >
        <span>{{ player.name }}</span>
        <select class="rank-selector" v-model="player['rank']">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>
    </div>

    <!-- <div class="card table-card">
      <h2>Table 1 — Playing: <span style="color: var(--primary)">Catan</span></h2>
      <div class="player-row" data-player="Bob" data-table="0">
        <span>Bob</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="Delta" data-table="0">
        <span>Delta</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="Echo" data-table="0">
        <span>Echo</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="Hotel" data-table="0">
        <span>Hotel</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="India" data-table="0">
        <span>India</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>
    </div>
    <div class="card table-card">
      <h2>Table 2 — Playing: <span style="color: var(--primary)">Terraforming Mars</span></h2>
      <div class="player-row" data-player="Alice" data-table="1">
        <span>Alice</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="Charlie" data-table="1">
        <span>Charlie</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="Foxtrot" data-table="1">
        <span>Foxtrot</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="Golf" data-table="1">
        <span>Golf</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>

      <div class="player-row" data-player="Juliet" data-table="1">
        <span>Juliet</span>
        <select class="rank-selector">
          <option value="1">1st Place (5pts)</option>
          <option value="2">2nd Place (3pts)</option>
          <option value="3">3rd Place (2pts)</option>
          <option value="4">4th Place (1pt)</option>
          <option value="5">5th Place (1pt)</option>
        </select>
      </div>
    </div> -->
  </div>

  <div>
    <button type="button" class="btn btn-primary" @click="onSubmittingScore">
      Submit Placements
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTournament } from '@/composables/useTournament.ts'
const { currentCategory, tables, submitScores } = useTournament()

const _tables = ref([...tables.value])

function onSubmittingScore() {
  submitScores(_tables.value)
}
</script>
