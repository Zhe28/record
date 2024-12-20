# Input 事件

Input 事件是与表单输入元素相关的事件集合，以下是主要的 input 相关事件：

## 基础输入事件

- `input`: 当输入值发生变化时触发
- `change`: 当输入值改变且失去焦点时触发
- `focus`: 当元素获得焦点时触发
- `blur`: 当元素失去焦点时触发

<div class="event-demo">
  <input 
    type='text' 
    placeholder="测试基础输入事件"
    @input="onInput"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
  <Log :logs="baseInputEventLogs"/>
</div>

## 键盘相关事件

- `keydown`: 当键盘按键被按下时触发
- `keyup`: 当键盘按键被释放时触发
- `keypress`: 当键盘字符键被按下时触发（已废弃，建议使用 `keydown`）

<div class="event-demo">
  <input 
    type='text' 
    placeholder="测试键盘事件"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
  />
  <Log :logs="keyboardEventLogs"/>
</div>

## 复制粘贴事件

- `copy`: 当内容被复制时触发
- `cut`: 当内容被剪切时触发
- `paste`: 当内容被粘贴时触发

<div class="event-demo">
  <input 
    type='text' 
    placeholder="测试复制粘贴事件"
    @copy="onCopy"
    @cut="onCut"
    @paste="onPaste"
  />
  <Log :logs="clipboardEventLogs"/>
</div>

## 选择事件

- `select`: 当文本被选中时触发
- `selectstart`: 当开始选择文本时触发

<div class="event-demo">
  <input 
    type='text' 
    placeholder="测试选择事件"
    @select="onSelect"
    @selectstart="onSelectStart"
  />
  <Log :logs="selectEventLogs"/>
</div>

## IME 输入事件

- `beforeinput`: 在输入即将发生变化时触发，可用于输入验证
- `compositionstart`: 当输入法编辑器开始新的输入时触发
- `compositionupdate`: 当输入法编辑器输入字符时触发
- `compositionend`: 当输入法编辑器结束输入时触发

<div class="event-demo">
  <input 
    type='text' 
    placeholder="测试中文输入法事件"
    @beforeinput="onBeforeInput"
    @compositionstart="onCompositionStart"
    @compositionupdate="onCompositionUpdate"
    @compositionend="onCompositionEnd"
  />
  <Log :logs="imeEventLogs"/>
</div>

## 注意事项

1. 这些事件可以通过 `addEventListener` 或 `on{eventName}` 属性来监听
2. 不同的表单元素可能支持不同的事件
3. 某些事件（如 `keypress`）已被废弃，建议使用新的替代事件
4. `input` 事件比 `change` 事件触发更加频繁，因为它在每次值变化时都会触发

<script setup lang='ts'>
import { ref } from 'vue'
import dayjs from 'dayjs'

// 基础输入事件日志
const baseInputEventLogs = ref([])
const keyboardEventLogs = ref([])
const clipboardEventLogs = ref([])
const selectEventLogs = ref([])
const imeEventLogs = ref([])

// 基础输入事件处理
function onInput(e: Event) {
    baseInputEventLogs.value.push({
        name: 'input',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `输入值: ${(e.target as HTMLInputElement).value}`
    })
}

function onChange(e: Event) {
    baseInputEventLogs.value.push({
        name: 'change',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `变更值: ${(e.target as HTMLInputElement).value}`
    })
}

function onFocus() {
    baseInputEventLogs.value.push({
        name: 'focus',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '输入框获得焦点'
    })
}

function onBlur() {
    baseInputEventLogs.value.push({
        name: 'blur',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '输入框失去焦点'
    })
}

// 键盘事件处理
function onKeyDown(e: KeyboardEvent) {
    keyboardEventLogs.value.push({
        name: 'keydown',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `按键按下: ${e.key} (keyCode: ${e.keyCode})`
    })
}

function onKeyUp(e: KeyboardEvent) {
    keyboardEventLogs.value.push({
        name: 'keyup',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `按键释放: ${e.key} (keyCode: ${e.keyCode})`
    })
}

// 剪贴板事件处理
function onCopy(e: ClipboardEvent) {
    clipboardEventLogs.value.push({
        name: 'copy',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '内容已复制'
    })
}

function onCut(e: ClipboardEvent) {
    clipboardEventLogs.value.push({
        name: 'cut',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '内容已剪切'
    })
}

function onPaste(e: ClipboardEvent) {
    clipboardEventLogs.value.push({
        name: 'paste',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `粘贴内容: ${e.clipboardData?.getData('text')}`
    })
}

// 选择事件处理
function onSelect(e: Event) {
    selectEventLogs.value.push({
        name: 'select',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '文本被选中'
    })
}

function onSelectStart(e: Event) {
    selectEventLogs.value.push({
        name: 'selectstart',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '开始选择文本'
    })
}

// IME 事件处理
function onBeforeInput(e: InputEvent) {
    imeEventLogs.value.push({
        name: 'beforeinput',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `即将输入: ${e.data}`
    })
}

function onCompositionStart(e: CompositionEvent) {
    imeEventLogs.value.push({
        name: 'compositionstart',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '开始输入法编辑'
    })
}

function onCompositionUpdate(e: CompositionEvent) {
    imeEventLogs.value.push({
        name: 'compositionupdate',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `输入法编辑中: ${e.data}`
    })
}

function onCompositionEnd(e: CompositionEvent) {
    imeEventLogs.value.push({
        name: 'compositionend',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: `输入法编辑结束: ${e.data}`
    })
}
</script>

<style>
.event-demo {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
}

.event-demo input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>
