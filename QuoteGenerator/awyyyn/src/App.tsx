import { useEffect, useState } from 'react'; 
import Quote from './components/Quote';


type quote = {
  _id: string
  quoteText: string
  quoteGenre: string
  quoteAuthor: string
}

function App() { 

  const [quote, setQuote] = useState<quote>();
  const [generatingQuotes, setGeneratingQuotes] = useState(false);
  const [tab, setTab] = useState(0);
  const [quotes, setQuotes] = useState<quote[]>([])

  async function getQuotes() {
    setGeneratingQuotes(true);
    const res = await fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
    const data = await res.json()   
    setQuote(data?.data[0])
    setGeneratingQuotes(false);
  }

  useEffect(() => {
    
    getQuotes()
    
  }, []) 
  
  const handleReload = async() => {
    setTab(0);
    getQuotes()
  }

  const handleClickAuthor = async() => {
    setGeneratingQuotes(true)
    const res = await fetch(`https://quote-garden.onrender.com/api/v3/quotes?author=${quote?.quoteAuthor}`);
    const data = await res.json(); 
    setQuotes(data?.data.filter((item: quote) => item._id != quote?._id))
    setGeneratingQuotes(false)
    setTab(1)
  }

  return (
    <> 
      <nav className="flex justify-end mx-10 md:mx-[96px] mt-[15px] md:mt-[30px]">
        <button className="bg-none flex items-center gap-x-1" disabled={generatingQuotes}>
          <span className="text-[16px] md:text-[18px] leading-[21.6px] font-medium text-[#333]" onClick={handleReload}>
            random
          </span> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#333" className={`md:w-[24px] h-[16px] w-[16px] md:h-[24px]  ${generatingQuotes && 'animate-spin duration-700'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>  
        </button>
      </nav>
      {!tab ? 
        <main className="pt-[113px] md:pt-[226px] main">
          <Quote quote={quote?.quoteText ? quote.quoteText : ""} /> 
          <div className="author__banner group" onClick={handleClickAuthor}>
            <div className="flex flex-col">
              <h3   className="group-hover:text-[#F2F2F2] text-[#4F4F4F] text-[18px] md:text-[24px] capitalize not-italic font-bold leading-normal">
                {quote?.quoteAuthor} 
              </h3>
              <p className="genre">{quote?.quoteGenre}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F2F2F2" className="md:w-[38px] w-[19px] h-[19px] md:h-[38px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg> 
          </div>
        </main>
      : 
        <main className="pt-[24px] md:pt-[48px] main">
          <h1 className='self-start md:w-[614px] mx-auto author__name'>{quote?.quoteAuthor}</h1>
          <div className='pl-5 md:pl-0 mt-[70px]  md:mt-[140px] flex flex-col gap-y-[70px] md:gap-y-[140px]'>
            {
              generatingQuotes ?
              "" :
              <>
                <Quote quote={quote?._id ? quote?.quoteText : "" } />   
                {quotes.map(item =>  (
                  <Quote quote={item.quoteText} key={item._id} />
                ))}
              </>
            }
          </div>
        </main> 
      }
      <footer className="footer">
        <p className="text-[#828282] text-center text-[14px] font-medium not-italic leading-normal">created by <span className="font-bold underline">awyyyn</span> - devChallenges.io</p>
      </footer>
    </>
  )
}

export default App
