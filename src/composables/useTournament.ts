import { ref, toValue, watch } from 'vue'
import type { Ref } from 'vue'

enum TournamentState {
  Idle,
  Scoring,
  Finished,
}

export type TournamentTable = {
  game: string
  players: Player[]
}

export type Player = {
  name: string
  score: number
  rank: PlayerRank
  wins: PlayerWins
}

type PlayerRank = 1 | 2 | 3 | 4 | 5

type PlayerWins = {
  first: number
  second: number
  third: number
}

const PointIncrements: Record<number, number> = {
  1: 10,
  2: 5,
  3: 2,
  4: 1,
  5: 1,
}

export const TournamentGameLibrary = {
  'Roll & Write': ['Welcome To', "Hadrian's Wall", 'Three Sisters'],
  'Network & Route Building': ['Ticket to Ride', 'The Quest for El Dorado', 'Settlers of Catan'],
  'Area Control & Asymmetric Conflict': ['Root', 'El Grande', 'Cosmic Encounter'],
  'Auctions & Economics': ['RA', 'For Sale'],
  'Engine Building & Card Drafting': ['7 Wonders', 'Wingspan'],
  'Push Your Luck': ["Can't Stop", 'Flip 7', 'King of Tokyo'],
  'Movement & Tactical Positioning': ['Jamaica', 'Survive the Island'],
  'Accessible Card & Party Games': ['Scout', 'Hues and Cues', 'Play Nine'],
}

type TournamentCategory = keyof typeof TournamentGameLibrary

const STORAGE_KEYS = {
  CATEGORY_AVAILABLE: 'tourney_categories',
  CATEGORY_CURRENT: 'tourney_category',
  PLAYERS: 'tourney_players',
  ROUND: 'tourney_round',
  STATE: 'tourney_state',
  TABLES: 'tourney_table',
}

const TABLE_SIZE: number = 5 // adjust this to change how many players per table

const availableCategories: Ref<string[]> = ref(Object.keys(TournamentGameLibrary) as TournamentCategory[])
const currentState = ref(TournamentState.Idle)
const currentRound = ref(0)
const currentCategory = ref('')
const players: Ref<Player[]> = ref([])
const tables: Ref<TournamentTable[]> = ref([])

export function useTournament() {
  ;(function loadFromStorage() {
    try {
      const savedAvailableCategories = localStorage.getItem(STORAGE_KEYS.CATEGORY_AVAILABLE)
      const savedCategory = localStorage.getItem(STORAGE_KEYS.CATEGORY_CURRENT)
      const savedRound = localStorage.getItem(STORAGE_KEYS.ROUND)
      const savedState = localStorage.getItem(STORAGE_KEYS.STATE)
      const savedPlayers = localStorage.getItem(STORAGE_KEYS.PLAYERS)
      const savedTables = localStorage.getItem(STORAGE_KEYS.TABLES)

      if (savedAvailableCategories) availableCategories.value = JSON.parse(savedAvailableCategories)
      if (savedCategory) currentCategory.value = JSON.parse(savedCategory)
      if (savedRound) currentRound.value = JSON.parse(savedRound)
      if (savedState) currentState.value = JSON.parse(savedState)
      if (savedPlayers) players.value = JSON.parse(savedPlayers)
      if (savedTables) tables.value = JSON.parse(savedTables)
    } catch (e) {
      console.error('Failed to load tournament state from localStorage:', e)
    }
  })()

  watch(
    [availableCategories, currentCategory, currentRound, currentState, players, tables],
    () => {
      localStorage.setItem(STORAGE_KEYS.CATEGORY_AVAILABLE, JSON.stringify(availableCategories.value))
      localStorage.setItem(STORAGE_KEYS.CATEGORY_CURRENT, JSON.stringify(currentCategory.value))
      localStorage.setItem(STORAGE_KEYS.ROUND, JSON.stringify(currentRound.value))
      localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(currentState.value))
      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players.value))
      localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables.value))
    },
    { deep: true },
  )

  function playerAdd(playerName: string) {
    players.value.push({
      name: playerName,
      score: 0,
      rank: 1,
      wins: { first: 0, second: 0, third: 0 },
    })
  }

  function playerRemove(playerName: string) {
    players.value = players.value.filter((i) => i.name !== playerName) as Player[]
  }

  function generateNextRound(subsetOfPlayers: Player[] = []) {
    function shuffle<T>(array: T[]) {
      const result = [...array]
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j]!, result[i]!]
      }
      return result
    }

    function assignPlayersToTables(players: Player[], tables: TournamentTable[]): TournamentTable[] {
      const shuffled = shuffle(players)
      const result = tables.map((table) => ({ ...table, players: [] as Player[] }))

      shuffled.forEach((player, index) => {
        result[index % result.length]?.players!.push(player)
      })

      return result
    }

    function assignGamesToTables(games: string[], tables: TournamentTable[]): TournamentTable[] {
      const shuffled = shuffle(games)
      return tables.map((table, index) => ({ ...table, game: shuffled[index] }) as TournamentTable)
    }

    // reset tables
    tables.value = []

    const categoryPoolForRandomSelection = [...toValue(availableCategories)] as TournamentCategory[]
    const categoryIdx = Math.floor(Math.random() * categoryPoolForRandomSelection.length)
    const selectedCategory = categoryPoolForRandomSelection.splice(categoryIdx, 1)[0] as TournamentCategory
    const gamesInCategory = [...TournamentGameLibrary[selectedCategory]]

    const currentPlayers = subsetOfPlayers.length ? [...subsetOfPlayers] : [...players.value]
    const totalTables = Math.ceil(currentPlayers.length / TABLE_SIZE)
    let stageTables: TournamentTable[] = Array.from({ length: totalTables }, () => ({}) as TournamentTable)

    stageTables = assignGamesToTables(gamesInCategory, stageTables)
    stageTables = assignPlayersToTables(currentPlayers, stageTables)

    // assign back to source of truth
    availableCategories.value = categoryPoolForRandomSelection
    currentCategory.value = selectedCategory
    tables.value = stageTables
    currentState.value = TournamentState.Scoring
    currentRound.value = currentRound.value + 1
  }

  function submitScores(currentTablePlayerRanks: TournamentTable[]) {
    const rankings: Player[] = toValue(currentTablePlayerRanks).flatMap((i: TournamentTable) => i.players ?? [])

    const rankMap = new Map(rankings.map(({ name, rank }) => [name, rank]))

    players.value.forEach((player) => {
      const rank = rankMap.get(player.name) ?? 0
      player.score += PointIncrements[rank] ?? 0

      if (rank == 1) player.wins.first += 1
      if (rank == 2) player.wins.second += 1
      if (rank == 3) player.wins.third += 1
    })

    // sort player scores
    players.value = [...players.value].sort((a, b) => b.score - a.score)

    currentState.value = currentRound.value >= 5 ? TournamentState.Finished : TournamentState.Idle
  }

  function resetPlayers() {
    players.value = []
  }

  function resetTournament() {
    players.value.forEach((i) => {
      i.score = 0
      i.wins.first = 0
      i.wins.second = 0
      i.wins.third = 0
    })

    availableCategories.value = Object.keys(TournamentGameLibrary)
    currentState.value = TournamentState.Idle
    currentRound.value = 0
  }

  return {
    currentCategory,
    currentRound,
    currentState,
    generateNextRound,
    playerAdd,
    playerRemove,
    players,
    tables,
    submitScores,
    resetPlayers,
    resetTournament,
  }
}
