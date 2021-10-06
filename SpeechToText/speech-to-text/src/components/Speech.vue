<template>
    <v-app id="app" standalone>
        <v-toolbar fixed>
             <v-container>
            <v-toolbar-title class="blue--text">Speech to text App</v-toolbar-title>
            </v-container>
        </v-toolbar>
        <main>
            <v-container>
                <p> {{ note }}</p>
                <p> {{ error }}</p>
            <button @click="toggleListening"><i class="fa fa-microphone btn btn-danger" aria-hidden="true"></i></button>
            </v-container>
        </main>
    </v-app>
</template>

<script>
import useSpeechRecognition from "../useSpeechRecognition";

export default {
  setup() {
    const { toggleListening, note, error } = useSpeechRecognition();

    return {
      toggleListening,
      note,
      error
    };
  },
};
</script>

<style scoped>

</style>