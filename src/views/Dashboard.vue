<template>
  <div class="dashboard">
    <h3 class="h3 grey--text">Dashboard</h3>

    <v-container class="my-16">
      <v-row row class="mb-10 ml-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="mx-2"
              small
              text
              color="grey"
              @click="sortBy('title')"
            >
              <v-icon left small>mdi-folder</v-icon>
              <span class="caption text-lowercase">By Project Name</span>
            </v-btn>
          </template>
          <span>Sort Items by Project Name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="mx-2"
              small
              text
              color="grey"
              @click="sortBy('person')"
            >
              <v-icon left small>mdi-account</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>
          <span>Sort Items By Person Name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="mx-2"
              small
              text
              color="grey"
              @click="sortBy('status')"
            >
              <v-icon left small>mdi-traffic-light</v-icon>
              <span class="caption text-lowercase">By Status</span>
            </v-btn>
          </template>
          <span>Sort Items By It's Status</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-img
          contain
          height="50px"
          width="80px"
          alt="img here"
          src="https://firebasestorage.googleapis.com/v0/b/vue-calendar-d6a05.appspot.com/o/stat.png?alt=media&token=9dd6804d-1714-448a-8c43-8666f1e90180"
        ></v-img>
      </v-row>

      <v-card
        flat
        class="px-3 mb-3"
        v-for="project in projects"
        :key="project.id"
      >
        <v-row row wrap :class="`pl-3 project ${project.status}`">
          <v-col cols="10" md="5">
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-col>
          <v-col cols="2" md="1">
            <v-btn text class="main_del_btn" @click="del(project)">
              <v-icon class="del_btn">mdi-delete</v-icon>
            </v-btn>
          </v-col>
          <v-col xs="6" sm="4" md="2">
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-col>
          <v-col xs="6" sm="4" md="2">
            <div class="caption grey--text">Due Date</div>
            <div>{{ project.due }}</div>
          </v-col>
          <v-col xs="2" sm="4" md="2">
            <div class="text-right">
              <v-chip
                small
                @click="changeStat(project)"
                :class="`${project.status} v-chip--active white--text caption my-2`"
              >
                {{ project.status }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-row cols="12">
          <v-divider></v-divider>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "@/firebase";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    async changeStat(project) {
      if (project.status === "Complete") {
        project.status = "Ongoing";
        db.collection("projects").doc(project.id).update({
          status: "Ongoing",
        });
      } else if (project.status === "Ongoing") {
        project.status = "Overdue";
        db.collection("projects").doc(project.id).update({
          status: "Overdue",
        });
      } else if (project.status === "Overdue") {
        project.status = "Complete";
        db.collection("projects").doc(project.id).update({
          status: "Complete",
        });
      }
    },
    async del(project) {
      db.collection("projects")
        .doc(project.id)
        .delete()
        .then(() => {
          var ind = this.projects.indexOf(project);
          this.projects.splice(ind,1);
        });
    },
  },
  created() {
    db.collection("projects").onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((element) => {
        if (element.type === "added") {
          this.projects.push({
            ...element.doc.data(),
            id: element.doc.id,
          });
        }
      });
    });
  },
};
</script>

<style scoped>
.project.Complete {
  border-left: 4px solid #3cd1c2;
}
.project.Overdue {
  border-left: 4px solid tomato;
}
.project.Ongoing {
  border-left: 4px solid orange;
}
.v-chip.Complete {
  background: #3cd1c2;
}
.v-chip.Overdue {
  background: tomato;
}
.v-chip.Ongoing {
  background: orange;
}
.main_del_btn {
  color: grey;
  background-color: white;
}
.main_del_btn:hover {
  color: tomato;
  background-color: white;
}
</style>