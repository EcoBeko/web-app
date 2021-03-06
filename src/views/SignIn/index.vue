<template>
  <section id="sign-in">
    <h2 class="title">Sign In</h2>
    <form class="form" @submit.prevent="signIn">
      <alert-box :time="1500" class="alert" ref="box"></alert-box>
      <h3>Login to your account</h3>
      <base-input
        text="Phone Number"
        v-model="form.phone.value"
        :error.sync="form.phone.error"
        error-text="Follow the pattern (+7xxxxxxxxxx)"
        class="form-input"
      ></base-input>
      <base-input
        type="password"
        text="Password"
        v-model="form.password.value"
        :error.sync="form.password.error"
        error-text="Minimum eight characters"
        class="form-input"
      ></base-input>
      <input type="submit" class="button sign-up" />
    </form>
    <p class="redir">
      Don't have an account?
      <span class="redir__link" @click="$router.push('/welcome/sign-up')">Sign Up</span>
    </p>
  </section>
</template>

<script>
import api from "@/api";

export default {
  name: "SignIn",
  async created() {
    await this.$parent.checkToken();
    document.title = "EcoBeko | Sign In";
  },
  components: {},
  data() {
    return {
      form: {
        password: {
          value: "",
          error: false,
        },
        phone: {
          value: "",
          error: false,
        },
      },
    };
  },
  methods: {
    async signIn() {
      const { phone, password } = this.form;
      phone.value = phone.value.replace(/^(\+7|8)/, "");

      if (phone.value && password.value) {
        phone.error = !(await api.users.validate("phone", phone.value));
        password.error = !(await api.users.validate("password", password.value));
      } else return this.$refs.box.alert("Please, enter the data");

      if (!phone.error && !password.error) {
        const responseData = await this.$store.dispatch("authenticate", {
          phone: phone.value,
          password: password.value,
        });

        if (!responseData.status) this.$refs.box.alert(responseData.message);
        else {
          await this.$store.dispatch("fetchUser");
          const route = this.$store.getters.getModuleRoute;
          this.$router.push(route);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/_globals.scss";
@import "../../scss/_base.scss";

#sign-in {
  height: 100%;
  background-image: url("../../assets/background-sign-in.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1fr 1fr 0.1fr;
  justify-items: center;
  align-items: flex-end;
}

.title {
  align-self: flex-end;
  @include pos(2, 2);
  font-family: GilroyLight;
  font-size: 2rem;
  color: $grayText;
  border-bottom: 1px solid $grayText;
}

.form {
  @include pos(2, 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1em;
  position: relative;

  h3 {
    align-self: center;
    color: $grayText;
    margin: 1em;
  }

  .form-input {
    width: 80%;
    margin: 0.5em;
  }
  .sign-up {
    background-color: $accentBlue;
    margin-top: 1em;
  }
}

.redir {
  @include pos(2, 4);
  margin: 1em;
  align-self: flex-start;
  color: $grayText;
  font-size: 1.2rem;

  &__link {
    font-size: inherit;
    color: $accentBlue;
    cursor: pointer;
  }
}

@media screen and (max-width: 840px) {
  #sign-in {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 1fr 1fr 1fr 0.1fr;
    background-image: url("../../assets/background-sign-in-mobile.png");
  }

  .title {
    @include pos(1, 2);
    font-size: 3.5rem;
  }

  .form {
    @include pos(1, 3);
    width: 60%;

    h3,
    .sign-up,
    .form-input {
      font-size: 1.2rem;
    }
  }

  .redir {
    @include pos(1, 4);
    font-size: 1.4rem;
  }
}

@media screen and (max-width: 450px) {
  .title {
    font-size: 2.5rem;
  }

  .form {
    width: 85%;
  }

  .redir {
    font-size: 1rem;
    margin: 2em;

    &__link {
      background-color: $accentBlue;
      color: white;
      border-radius: 10px;
      padding: 0.5em 1em;
    }
  }
}
</style>
