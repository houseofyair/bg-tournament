<template>
  <div class="card">
    <h1>Global Leaderboard</h1>
    <p style="color: #6b7280">Standings refresh automatically as rounds close.</p>
    <ul id="leaderboard-display">
      <li class="row" v-for="(player, index) in players" :key="index">
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: left;
            align-items: center;
            padding-bottom: 10px;
          "
        >
          <span style="flex-grow: 1"
            ><strong>#{{ index + 1 }}</strong> {{ player.name }}</span
          >
          <span class="badge">{{ player.score }} pts</span>
        </div>

        <div class="medal-case">
          <span class="medal gold" title="1st Place Finishes">
            🥇 <small>{{ player.wins.first || 0 }}</small>
          </span>
          <span class="medal silver" title="2nd Place Finishes">
            🥈 <small>{{ player.wins.second || 0 }}</small>
          </span>
          <span class="medal bronze" title="3rd Place Finishes">
            🥉 <small>{{ player.wins.third || 0 }}</small>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTournament } from '@/composables/useTournament.ts'

const { players } = useTournament()
</script>
