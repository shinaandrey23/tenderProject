<template>
  <Layout>
    <b-form>
      <b-form-group
          label="Login: "
          label-for="login"
      >
        <b-form-input
          id="login"
          v-model="username"
          type="text"
          required
          placeholder="Enter login"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Email: "
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Password: "
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Select role: ">
        <b-form-radio v-model="role" checked name="role" value="farmer">Farmer</b-form-radio>
        <b-form-radio v-model="role" name="role" value="beekeeper">Beekeeper</b-form-radio>
      </b-form-group>

      <b-alert v-if="error===true" show variant="warning"><a href="#" class="alert-link">An error was occurred</a></b-alert>

      <b-button type="button" variant="success" size="sm" @click="reg">Register</b-button>
      <b-button type="reset" variant="danger" size="sm">Reset</b-button>
    </b-form>
<!--    <form @submit.prevent="reg">-->
<!--      <label for="login">Login:</label><br>-->
<!--      <input type="text" id="login" v-model="username"><br>-->
<!--      <label for="email">Email:</label><br>-->
<!--      <input type="email" id="email" v-model="email"><br>-->
<!--      <label for="password">Password:</label><br>-->
<!--      <input type="password" id="password" v-model="password"><br>-->
<!--      <label>Role:</label>-->
<!--      <input type="radio" id="Farmer" name="role" value="farmer" v-model="role" checked>-->
<!--      <label for="Farmer">Farmer</label>-->
<!--      <input type="radio" id="Beekeeper" name="role" value="beekeeper" v-model="role">-->
<!--      <label for="Beekeeper">Beekeeper</label><br><hr>-->
<!--      <button type="submit">Register</button>-->
<!--    </form>-->
  </Layout>

</template>

<script>
import axios from "axios";

export default {
  name: "Register.vue",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: '',
      error: false
    }
  },
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Defaults to 100
        contentTypes: [`user`, `farmer`, `beekeeper`, `hive`, `field`, `tender`],
        plural: true, // pluralizes names of Content Types in API
        // Possibility to login with a Strapi user, when content types are not publicly available (optional).
        loginData: {
          identifier: 'shinaandrey23@gmail.com',
          password: 'ShinShila23',
        },
      }
    }
  ],
  methods: {
  reg(key, value) {
    const that = this
    that.error = false
    axios.post('http://localhost:1337/auth/local/register', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    }).then(response => {
      // Handle success.
      console.log('Well done!')
      console.log('User profile', response.data.user)
      console.log('User token', response.data.jwt)
      axios({
        method: 'post',
        url: 'http://localhost:1337/' + response.data.user.role.name.toLowerCase() + 's',
        data: {
          email: response.data.user.email
        },
        headers: {
          Authorization: 'Bearer ' + response.data.jwt
        }
      }).then(response => {
        // console.log('Profile created')
        const check = confirm('Profile created. Login?')
        if (check) {
          sessionStorage.clear()
          location.href = '/'
        }
      })
    }).catch(error => {
      that.error = true
      console.log('An error occurred:', error.response)
    })

  }
}
}
</script>

<style scoped>
  button {
    margin-right: 10px;
  }

  .custom-radio {
    display: inline-block;
    margin-right: 10px;
  }
</style>