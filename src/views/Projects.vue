<template>
  <div class="projects">
    <h3 class="h3 grey--text">Projects</h3>

    <v-container class="my-16">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
        <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
        <v-expansion-panel-content class="grey--text">
          
          
              <div class="font-weight-bold">{{project.due}}</div>
              <div>{{project.content}}</div>
          
          
        </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/firebase'
export default {
  name: "Projects",
  components: {},
  data() {
    return {
      projects: []
    }
  },
  created() {
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(element => {
        if(element.type === 'added' ) {
          this.projects.push({
            ...element.doc.data(),
            id: element.doc.id
          })
        }
      });
    })
  },
  computed: {
    myProjects(){
      return this.projects.filter(project => {
        return project.person === 'Neil Javiya'
      })
    }
  }
};
</script>
