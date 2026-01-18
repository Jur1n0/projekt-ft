<script lang="ts">
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    step: {
      type: [String, Number],
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('update:modelValue', target.value)
    },
  },
}
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :step="step"
      @input="handleInput"
      class="input-field"
    />
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
}

.input-label {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #2c3e50;
}

.input-field {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #42b983;
  outline: none;
}
</style>
