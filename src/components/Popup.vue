<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn flat color="white" id="btn" v-bind="attrs" v-on="on">
        Add New Project
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <h2 class="grey--text">Add New Project</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            color="grey darken-2"
            v-model="title"
            label="Title"
            :rules="rulesTitle"
            prepend-icon="mdi-folder"
          ></v-text-field>
          <v-textarea
            color="grey darken-2"
            v-model="content"
            :rules="rulesTextarea"
            label="Information"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <v-autocomplete
            color="grey darken-2"
            prepend-icon="mdi-account"
            label="Member"
            :rules="rulesAutocomplete"
            :items="names"
            v-model="person"
          ></v-autocomplete>

          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    color="grey darken-2"
                    v-model="formattedDate"
                    label="Due Date"
                    :rules="rulesDatepicker"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="grey darken-2"
                  v-model="due"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-btn text class="grey white--text mx-0 mt-5" @click="submit"
            >Add Project</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, parseISO } from "date-fns";
import db from '@/firebase'

export default {
  data() {
    return {
      dialog: false,
      menu: false,
      due: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      title: "",
      content: "",
      person: "",
      names: [
        "Neil Javiya",
        "Happy Manvar",
        "Hiral Bhojani",
        "Rahul Hinsu",
        "Kwiza Kaneria",
      ],
      rulesTitle: [
        (v) => v.length >= 5 || "Please enter atleast 5 characters..!!",
      ],
      rulesTextarea: [
        (v) => v.length >= 10 || "Please enter atleast 10 characters..!!",
      ],
      rulesAutocomplete: [
        (v) => v.length >= 1 || "Please select a Team Member..!!",
      ],
      rulesDatepicker: [(v) => v.length >= 1 || "Please select a Date..!!"],
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const project = {
          title: this.title,
          content: this.content,
          due: this.formattedDate,
          person: this.person,
          status: 'Ongoing'
        }
        
        db.collection('projects').add(project).then(() => {
          this.dialog = false;
        })
        
      }
    },
  },
  computed: {
    formattedDate() {
      return this.due ? format(parseISO(this.due), "do MMM, yyyy") : "";
    },
  },
};
</script>

<style scoped>
#btn {
  color: #424242;
}
</style>