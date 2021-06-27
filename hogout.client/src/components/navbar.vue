<template>
  <div style="height: 44px;"></div>
  <div class="container-fluid nav-fit">
    <div class="row bg-dark justify-content-between">
      <div class="col navbar-brand d-flex m-auto">
        <router-link :to="{ name: 'Home' }">
          Hog Out
        </router-link>
      </div>

      <span class="navbar-text pr-3">
        <button
          class="btn btn-outline-primary text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown"
             v-else
        >
          <img class="img-fluid click dropdown-toggle"
               title="Options"
               data-toggle="dropdown"
               src="../assets/img/burger.png"
               alt="Options"
          >
          <div
            class="dropdown-menu p-0 list-group w-100"
          >
            <router-link :to="{ name: 'Profile', params: {id: state.account.id}}">
              <div class="list-group-item list-group-item-action hoverable bg-darker text-light p-1 pl-3">
                Profile
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable bg-darker text-light p-1 pl-3"
              @click="logout"
            >
              logout
            </div>
          </div>

        </div></span>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import Notification from '../utils/Notification'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false,
      account: computed(() => AppState.account)
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        if (await Notification.confirmAction('are you sure you want to logout?')) {
          AuthService.logout({ returnTo: window.location.origin })
        }
      }
    }
  }
}
</script>

<style scoped>

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.bg-darker:hover {
  background-color: rgb(54, 54, 54);
  transition: all 0.15s linear;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
.img-fluid{
  max-width: 30px;
  min-height: 30px;
}
.bg-darker {
  background-color: rgb(36, 36, 36);
}
.top{
    top: -26px;
    left: -34px;
}
.click{
  cursor: pointer;
}
.nav-fit{
  margin-bottom: -20px;
  position: fixed;
  z-index: 1;
}
</style>
