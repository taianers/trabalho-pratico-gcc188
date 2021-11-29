<template>
  <div class="container-input">
    <input
      :type="type"
      v-model="value"
      :name="name"
      :required="required ? 'required' : ''"
      autocomplete="off"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "InputPadrao",
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    label: String,
    value: String,
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {},
  computed: {
    name() {
      return this.label.toLowerCase();
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.container-input {
  position: relative;
  width: 100%;
}

.container-input input {
  width: 100%;
  font-size: 24px;
  background: transparent;
  color: #ffffff;
  border: none;
  outline: none;
  border-bottom: 1px solid #ffffff;
  margin-bottom: 30px;
}

.container-input label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 20px;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  pointer-events: none;
  transition: 0.5s;
}

.container-input input:focus ~ label,
.container-input input:valid ~ label {
  top: -30px;
  font-size: 16px;
}
</style>
