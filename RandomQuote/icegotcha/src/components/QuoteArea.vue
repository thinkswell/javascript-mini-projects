<template>
  <div id="quote-area" class="flex-content">
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
#quote-area span {
  margin: 20px;
}

#quote-area .message {
  font-size: 4vw;
}

#quote-area .author {
  font-size: 2vw;
}
</style>
