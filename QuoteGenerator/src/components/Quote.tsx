 

type props = {
    quote: string
}

export default function Quote({quote}: props) {
    return (
        <div className="w-[90%] md:w-[614px] before:content-[''] before:h-full before:w-[8px] before:absolute relative before:bg-[#F7DF94] before:-left-4 md:before:-left-[99px]">
          <p className="text-[18px] md:text-[36px] not-italic leading-[30px] pl-[13.5px] md:pl-0 md:leading-[43.2px] font-medium"> 
            {quote}
          </p>
        </div>
    )
}
