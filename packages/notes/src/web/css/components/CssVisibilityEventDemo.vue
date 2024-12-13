<template>
  <div class="event-demo">
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
          @click="handleClick('display')"
          @mouseover="handleMouseover('display')"
        >
          <p>This content uses display:none</p>
          <p>Click count: {{ displayClickCount }}</p>
          <p>Hover count: {{ displayHoverCount }}</p>
        </div>
      </div>

      <!-- Visibility Hidden Demo -->
      <div class="demo-box">
        <h3>Visibility: hidden</h3>
        <div
          class="content visibility-transition"
          :class="{ 'visibility-hidden': !isVisibilityVisible }"
          @click="handleClick('visibility')"
          @mouseover="handleMouseover('visibility')"
        >
          <p>This content uses visibility:hidden</p>
          <p>Click count: {{ visibilityClickCount }}</p>
          <p>Hover count: {{ visibilityHoverCount }}</p>
        </div>
      </div>

      <!-- Opacity 0 Demo -->
      <div class="demo-box">
        <h3>Opacity: 0</h3>
        <div
          class="content opacity-transition"
          :class="{ 'opacity-hidden': !isOpacityVisible }"
          @click="handleClick('opacity')"
          @mouseover="handleMouseover('opacity')"
        >
          <p>This content uses opacity:0</p>
          <p>Click count: {{ opacityClickCount }}</p>
          <p>Hover count: {{ opacityHoverCount }}</p>
        </div>
      </div>
    </div>

    <!-- Event Log -->
    <div class="event-log">
      <h3>Event Log</h3>
      <div class="log-content">
        <div
          v-for="(log, index) in eventLogs.slice().reverse()"
          :key="index"
          class="log-item"
        >
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CssVisibilityEventDemo",
  data() {
    return {
      isDisplayVisible: true,
      isVisibilityVisible: true,
      isOpacityVisible: true,
      displayClickCount: 0,
      visibilityClickCount: 0,
      opacityClickCount: 0,
      displayHoverCount: 0,
      visibilityHoverCount: 0,
      opacityHoverCount: 0,
      eventLogs: [],
    };
  },
  methods: {
    toggleDisplay() {
      this.isDisplayVisible = !this.isDisplayVisible;
      this.logEvent(`Display toggled to: ${this.isDisplayVisible ? "visible" : "none"}`);
    },
    toggleVisibility() {
      this.isVisibilityVisible = !this.isVisibilityVisible;
      this.logEvent(`Visibility toggled to: ${this.isVisibilityVisible ? "visible" : "hidden"}`);
    },
    toggleOpacity() {
      this.isOpacityVisible = !this.isOpacityVisible;
      this.logEvent(`Opacity toggled to: ${this.isOpacityVisible ? "1" : "0"}`);
    },
    handleClick(type) {
      switch (type) {
        case "display":
          this.displayClickCount++;
          this.logEvent("Display element clicked");
          break;
        case "visibility":
          this.visibilityClickCount++;
          this.logEvent("Visibility element clicked");
          break;
        case "opacity":
          this.opacityClickCount++;
          this.logEvent("Opacity element clicked");
          break;
      }
    },
    handleMouseover(type) {
      switch (type) {
        case "display":
          this.displayHoverCount++;
          this.logEvent("Display element hovered");
          break;
        case "visibility":
          this.visibilityHoverCount++;
          this.logEvent("Visibility element hovered");
          break;
        case "opacity":
          this.opacityHoverCount++;
          this.logEvent("Opacity element hovered");
          break;
      }
    },
    logEvent(message) {
      const time = new Date().toLocaleTimeString();
      this.eventLogs.push(`${time}: ${message}`);
      // 保持最新的20条日志
      if (this.eventLogs.length > 20) {
        this.eventLogs.shift();
      }
    },
  },
};
</script>

<style scoped>
.event-demo {
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
  margin-bottom: 20px;
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
  cursor: pointer;
}

.content:hover {
  background-color: #e0e0e0;
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

/* Event Log */
.event-log {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
}

.log-item {
  padding: 5px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
}

.log-item:last-child {
  border-bottom: none;
}
</style>
