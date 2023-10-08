function useDebounce (  cb , delay =2000  ) {
    let timerId ;
    return (...args) => { 
        clearTimeout(timerId)
        timerId = setTimeout(()=>{
            cb(...args  )
        }, delay)
    }
}
export default useDebounce