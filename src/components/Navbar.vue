<template>
  <nav>
    <v-toolbar flat app dark>
      <v-app-bar-nav-icon
        class="grey--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercae grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Neil</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="grey" v-bind="attrs" v-on="on">
            <v-icon left>mdi-arrow-down-drop-circle-outline</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app color="grey darken-3">
      <v-list-item class="mt-1">
        <v-row justify="center">
          <v-list-item-content>
            <v-col cols="5">
              <v-avatar size="56">
                <img src="https://firebasestorage.googleapis.com/v0/b/vue-calendar-d6a05.appspot.com/o/Neil%20Javiya.jpg?alt=media&token=48f97649-0b35-4f26-b7b1-b1446fcdd6cf" />
              </v-avatar>
            </v-col>
            <v-col cols="5">
              <h5 class="white--text subheading-1"><pre>Neil Javiya</pre></h5>
            </v-col>
          </v-list-item-content>
          <v-btn class="mt-3" icon right @click.stop="drawer = false">
            <v-icon class="white--text">mdi-chevron-left</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
      <v-row class="mt-4 mb-3">
        <v-spacer></v-spacer>
          <Popup />
        <v-spacer></v-spacer>
        </v-row>
      <v-list dense>
        <v-list-item
          v-for="itm in links"
          :key="itm.text"
          link
          router
          :to="itm.route"
        >
          <v-icon left class="white--text mr-4">{{ itm.icon }}</v-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              itm.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup.vue";
export default {
  components: {
    Popup,
  },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "Projects", route: "/projects" },
        { icon: "mdi-account-multiple", text: "Team", route: "/team" },
      ],
    };
  },
};
</script>