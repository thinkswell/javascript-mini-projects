const shortenUrl = async () => {
    const longUrl = document.getElementById('long-url').value;
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${longUrl}`);
    const data = await response.json();
    const shortUrl = data.result.full_short_link;
  
    const shortUrlContainer = document.getElementById('short-url-container');
    const shortUrlLink = document.getElementById('short-url').querySelector('a');
    shortUrlLink.href = shortUrl;
    shortUrlLink.textContent = shortUrl;
    shortUrlContainer.style.display = 'block';
  
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shortUrl).then(() => {
        alert('Copied to clipboard!');
      });
    });
  };
  
  const shortenBtn = document.getElementById('shorten-btn');
  shortenBtn.addEventListener('click', shortenUrl);
  
