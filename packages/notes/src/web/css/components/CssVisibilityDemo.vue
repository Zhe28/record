<template>
  <div class="visibility-demo">
    <div class="buttons">
      <button @click="toggleDisplay">Display Toggle</button>
      <button @click="toggleVisibility">Visibility Toggle</button>
      <button @click="toggleOpacity">Opacity Toggle</button>
    </div>

    <div class="demo-boxes">
      <!-- Display None Demo -->
      <div class="demo-box">
        <h3>Display: none</h3>
        <div
          class="content display-transition"
          :class="{ 'display-none': !isDisplayVisible }"
        >
          This content uses display:none
        </div>
      </div>

      <!-- Visibility Hidden Demo -->
      <div class="demo-box">
        <h3>Visibility: hidden</h3>
        <div
          class="content visibility-transition"
          :class="{ 'visibility-hidden': !isVisibilityVisible }"
        >
          This content uses visibility:hidden
        </div>
      </div>

      <!-- Opacity 0 Demo -->
      <div class="demo-box">
        <h3>Opacity: 0</h3>
        <div
          class="content opacity-transition"
          :class="{ 'opacity-hidden': !isOpacityVisible }"
        >
          This content uses opacity:0
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CssVisibilityDemo",
  data() {
    return {
      isDisplayVisible: true,
      isVisibilityVisible: true,
      isOpacityVisible: true,
    };
  },
  methods: {
    toggleDisplay() {
      this.isDisplayVisible = !this.isDisplayVisible;
    },
    toggleVisibility() {
      this.isVisibilityVisible = !this.isVisibilityVisible;
    },
    toggleOpacity() {
      this.isOpacityVisible = !this.isOpacityVisible;
    },
  },
};
</script>

<style scoped>
.visibility-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.demo-boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.demo-box {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.content {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

/* Display transition */
.display-transition {
  transition: margin 0.3s ease;
}

.display-none {
  display: none;
}

/* Visibility transition */
.visibility-transition {
  transition: visibility 0.3s ease;
}

.visibility-hidden {
  visibility: hidden;
}

/* Opacity transition */
.opacity-transition {
  transition: opacity 0.3s ease;
}

.opacity-hidden {
  opacity: 0;
}
</style>
