<template>
  <div id="tables-container" class="table-grid">
    <div class="card table-card" v-for="(table, tIdx) in _tables" :key="'table-' + tIdx">
      <h2>
        Table {{ tIdx + 1 }} — Playing:
        <span style="color: var(--primary)">{{ table.game }}</span>
      </h2>

      <div class="player-row" data-player="Bob" data-table="0" v-for="(player, pIdx) in table.players" :key="'table-' + tIdx + '-player-' + pIdx">
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
  </div>

  <div>
    <button type="button" class="btn btn-primary" @click="onSubmittingScore">Submit Placements</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTournament } from '@/composables/useTournament.ts'
const { tables, submitScores } = useTournament()

const _tables = ref([...tables.value])

function onSubmittingScore() {
  submitScores(_tables.value)
}
</script>
