<template>
  <v-card>
    <v-card-title>
      Login
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="Insert email">
        </v-text-field>
        <v-text-field v-model="password" type="password" label="Insert password">
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="loginRequest">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import authService from '@/services/authService.js'

export default {
  name: 'AccessForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async loginRequest () {
      const response = await authService.login(this.email, this.password)
      localStorage.setItem('token', response.token)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
