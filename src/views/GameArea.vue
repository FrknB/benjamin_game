<template>
  <div>
    <Navbar />
    <div class="container">
      <!--  <Navbar /> -->
      <!-- <div class="leaderboard">
        <div class="title">
          <h1>Score Board</h1>
        </div>
        <div class="leaderTable">
          <div class="user">
            <span id="userId">Ahmet</span>
            <span id="userPoint">1111</span>
          </div>
          <hr class="custom-hr">
          <div class="user">
            <span id="userId">Ahmet</span>
            <span id="userPoint">1111</span>
          </div>
          <hr class="custom-hr">
          <div class="user">
            <span id="userId">Ahmet</span>
            <span id="userPoint">1111</span>
          </div>
          <hr class="custom-hr">

        </div>
      </div> -->
      <div class="gameArea">
        <div class="title">
          Meyveyi tahmin et
        </div>
        <div class="infoBox">
          <div class="scoreBox">
            <span id="score">Skor: {{ score }}</span>
          </div>
          <div class="totlaScoreBox">
            <span id="totalScore">Toplam Skor: {{ totlaScore }}</span>
          </div>
          <div class="quessLimit">
            <span>Tahminler: {{ guesses }}</span>
          </div>
        </div>
        <div class="tryInput">
          <div v-if="!gameOver">
            <p>
              <span id="spans" v-for="(letter, index) in secretWord" :key="index">{{ guessedLetters.includes(letter) ?
                letter : ' _ ' }}</span>
            </p>
          </div>
        </div>
        <div class="keyboard">
          <div v-for="(harf, index) in harfler" :key="index">
            <button id="letter" class="letter" :disabled="buttonDisabled" @click="harfKontrol(harf)" value="{{ index }}">
              {{ harf }} </button>
          </div>

        </div>

        <div>
          <div v-if="!gameOver" class="quessBox">
            <input type="text" v-model="userInput" :disabled="gameOver" placeholder="Tahmininizi Girin..."
              @keyup.enter="checkLetter" />
            <button @click="checkLetter" :disabled="gameOver">Harfi Kontrol Et</button>
          </div>
          <div v-else class="resposeBox">
            <p v-if="isWin" class="isWin">Tebrikler! Kazandınız! Cevap: {{ secretWord }}</p>
            <p v-else class="isLose">Üzgünüm! Kaybettiniz. Doğru kelime: {{ secretWord }}</p>
            <button @click="resetGame">Oyunu Sıfırla</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  components: { Navbar },
  setup() {
    const harfler = ref(['a', 'b', 'c','ç', 'd', 'e', 'f', 'g', 'ğ', 'h','ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o','ö', 'p', 'q', 'r', 's', 't', 'u','ü', 'v', 'w', 'x', 'y', 'z']);
    const words = ["elma", "armut", "muz", "çilek", "kiraz", "portakal", "üzüm", "karpuz",
                    "ananas", "aango", "vişne", "erik", "nar", "şeftali", "ahududu", "limon",
                    "çarkıfelek", "avokado", "kavun", "efelek", "üvez", "frenk üzümü", "hurma",
                    "greyfurt", "kivi", "kayısı", "yaban mersini", "böğürtlen", "peynir otu"];
    const secretWord = ref('');
    const guessedLetters = ref([]);
    const userInput = ref('');
    const guesses = ref(3);
    const gameOver = ref(false);
    let score = ref(1000);
    const buttonDisabled = ref(false);
    const isWin = ref(false);
    var dict = {}
    var totlaScore = ref(0);


    const setupGame = () => {
      secretWord.value = words[Math.floor(Math.random() * words.length)];
      guessedLetters.value = [];
      userInput.value = '';
      guesses.value = 3;
      gameOver.value = false;
      score.value = 1000;
      isWin.value = false;
      buttonDisabled.value = false;
      const buttons = document.querySelectorAll(".letter");
      for (let i = 0; i < harfler.value.length; i++) {
          buttons[i].disabled = false;
      }
    };

    const checkLetter = () => {
      const letter = userInput.value.toLowerCase();
      if ((secretWord.value === letter)) {
        guessedLetters.value = letter;
        isWin.value = true;
        gameOver.value = true;
        totlaScore.value = totlaScore.value + score.value;
      }
      else {
        if (guesses.value === 1 || isWin.value) {
          gameOver.value = true;
          buttonDisabled.value = true;
        }
        guesses.value--;
      }
    };

    /* girilen kelimenin secretWorddeki indexini bulmak için */
    function findCharIndexes(word, char) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == char) {
          dict[i] = char;
        }
      }
    }

    const harfKontrol = (harf) => {
      const buttons = document.querySelectorAll(".letter");
      if ((secretWord.value.includes(harf) == true)) {
        findCharIndexes(secretWord.value.toString(), harf);
        guessedLetters.value.push(harf);
        userInput.value = "";
        score.value += -50;
        if (secretWord.value.length == Object.keys(dict).length) {
          const sortedCombinedString = Object.keys(dict).sort((a, b) => a - b).map(key => dict[key]).join('');
          if (secretWord.value == sortedCombinedString) {
            gameOver.value = true;
            isWin.value = true;
          }
        }
      } else {
        score.value += -100;
      }
      for (let i = 0; i < harfler.value.length; i++) {
        if (harf == harfler.value[i]) {
          buttons[i].disabled = true;
        }
      }
    }

    const resetGame = () => {
      setupGame();
    };

    onMounted(() => {
      setupGame();
    });

    return {
      buttonDisabled,
      harfler,
      harfKontrol,
      score,
      secretWord,
      guessedLetters,
      userInput,
      guesses,
      gameOver,
      checkLetter,
      resetGame,
      isWin,
      totlaScore,
    }


  }
}
</script>

<style>
.title{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>