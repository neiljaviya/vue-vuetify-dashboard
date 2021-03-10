<template>
  <div class="team">
    <h3 class="h3 grey--text">Team</h3>

    <v-container class="my-16">
      <v-row row wrap>
        <v-col xs="12" sm="6" md="4" lg="3" v-for="person in team" :key="person.name">
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading-1">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey" :href="person.message">
                <v-icon small left>mdi-message-processing</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/firebase'

export default {
  name: 'Team',
  components: {

  },
  data() {
    return{
      team: []
    }
  },
  created() {
    db.collection('team').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(element => {
        if(element.type === 'added' ) {
          this.team.push({
            ...element.doc.data(),
            id: element.doc.id
          })
        }
      });
    })
  }
}
</script>
