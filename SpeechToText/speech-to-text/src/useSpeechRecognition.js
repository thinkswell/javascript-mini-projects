import { watch, ref } from "vue";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

export default function useSpeechRecognition() {
  const isListening = ref(false);
  const note = ref("");
  const error = ref(null);

  const handleListen = () => {
    if (isListening.value) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  const toggleListening = () => {
    isListening.value = !isListening.value;
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    note.value = transcript;
  };

  recognition.onerror = (event) => {
    error.value = event.error;
  };

  watch(isListening, () => {
    handleListen();
  });

  return {
    toggleListening,
    note,
    error
  };
}
