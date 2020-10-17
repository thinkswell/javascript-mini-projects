<template>
  <div id="quote-area">
    <span class="message">{{ message }}</span>
    <span class="author">{{ author }}</span>
  </div>
</template>

<script>
const COR_PROXY = 'https://cors-anywhere.herokuapp.com/';

export default {
  name: 'QuoteArea',
  data () {
    return {
      message: 'Loading Quote...',
      author: ''
    }
  },
  mounted () {
    this.setQuote()
  },
  methods: {
    setQuote: async function () {
      const response = await fetch(`${COR_PROXY}https://zenquotes.io/api/random`)
      if (response.ok) {
        const data = await response.json()
        this.message = `"${data[0].q}"`
        this.author = data[0].a
      } else {
        this.message = 'Can not random quote. Please try again.'
      }
    }
  }
}
</script>

<style scoped>
#quote-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px;
  height: 50%;
}

#quote-area span {
  margin: 20px;
}

#quote-area .message {
  font-size: calc(48px + 1vw);
}

#quote-area .author {
  font-size: calc(24px + 1vw);
}
</style>
