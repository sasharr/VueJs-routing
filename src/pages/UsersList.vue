<template>
  <div class="buttons">
    <button @click="confirmInput">Jump to Teams</button>
    <button @click="saveChanges">Save changes</button>
  </div>
  <ul>
    <user-item v-for="user in users"
               :key="user.id"
               :name="user.fullName"
               :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changesSaved: false,
    };
  },
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('Navigating to Useers List');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('leave Users List');
    console.log(to, from);
    if (this.changesSaved) {
      next();
    } else {
      const userWarn = confirm('Changes not saved. Are you sure want to leave page?');
      next(userWarn);
    }

  },
  unmounted() {
    console.log('Unmounted')
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
}

.buttons button {
  margin: 22px 5px 11px;
  padding: 5px 20px;
  color: #fff;
  background: #11005c;
  border: thin solid #11005c;
  cursor: pointer;
}

button:hover {
  background: #220a8d;
  border-color: #220a8d;
}

ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
