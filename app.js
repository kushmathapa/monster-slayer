const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: null,
      logMessage: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackEnabled() {
      return this.round % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackTheMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.round++;
      this.addLogMessage("Player", "attack", attackValue);
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("Monster", "attack", attackValue);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.round++;
      this.monsterHealth -= attackValue;
      this.addLogMessage("Player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 20);
      this.playerHealth =
        this.playerHealth + healValue > 100
          ? 100
          : this.playerHealth + healValue;
      this.addLogMessage("Player", "heal", healValue);
      this.attackPlayer();
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = null;
      this.logMessage = [];
    },
    surrenderGame() {
      this.winner = "monster";
      this.addLogMessage("Player", "surrender", 0);
    },
    addLogMessage(who, what, value) {
      this.logMessage.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
app.mount("#game");
