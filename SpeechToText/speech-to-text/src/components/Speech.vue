<template>
<div class="card">
    <div class="card-header">
        <nav class="navbar ">
            <div class="container-fluid">
                <span class="navbar-brand">{{ title }}</span>
            </div>
        </nav>
        <div class="page">
            <div class="card-body-center">
                <p class="text-info" v-show="!note">{{ message }}</p>
                <p class="text-primary"> {{ note }}</p>
                <p class="text-danger"> {{ error }}</p>
                <i class="fa fa-microphone btn btn-danger" aria-hidden="true" @click="toggleListening"></i>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import useSpeechRecognition from "../useSpeechRecognition";

export default {
    data: () => ({
        title: 'Speech to Text App',
        message:'Start Recording'
    }), 
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
body {
        margin: 0;
        padding: 0;
        background-color: #FAFAFA;
        font: 12pt "Tahoma";
    }
    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .page {
        width: 21cm;
        min-height: 10.7cm;
        padding: 5cm;
        margin: 1cm auto;
        border: 1px #D3D3D3 solid;
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
.card-header {
  text-align: center;
  font-size: 35px;
  color: black; 
}
</style>