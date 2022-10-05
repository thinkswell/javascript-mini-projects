import * as React from 'react';
import axios from 'axios';		
import './App.css';
import {ReactComponent as Search} from './search.svg';
import {ReactComponent as Check} from './check.svg';

function List({custom,onClik})
{	
   return(
       <ul>
	{    
	 custom.map(function (element)    //element is the individual array element
	         {
	             return(
	                    <Item key={element.url}  //Passing a single element of array
			     item={element} 
			     onClik={onClik}/>
	                    );
	         }
	         )
	}
        </ul>
         );
}

function Item({item,onClik})
{
	return(
		<>
		{(item.title!==null && item.title!=='' 
		   && item.url!=null && item.url!='')?( //Some items return null title,
			                                  //This filters the bad apples
	        <li className="item">
		   <span style={{width:'40%'}}>{item.title}</span>
		   <span style={{width:'30%'}}><a href={item.url}>{" "+item.url}</a></span>
		   <span>
			<button 
			       type='button'
			       onClick={()=>onClik(item)}
			       className="button button_small"
			>
			{"Remove"}
			<Check height="18px" width="18px"/>
			</button>
		   </span>
		</li>):(<span></span>) }
		</>
	);
}

function IpWithLabel({id,value,eventHandler,isFocused,label,handleSubmit})
                                                           //Destructuring in definition
{
	return(
		<>
		<form onSubmit={handleSubmit} className="search-form">
	        <label htmlFor={id} className="label">
		       {label}
		       <Search height="20px" width="20px"/>
		</label>
		<input id={id}
		       value={value}
		       type="text"
		       onChange={eventHandler}
		       autoFocus={isFocused}
		       className="input"/>
                <button className="button button_large" 
		        type="submit" 
		        disabled={!value}
		>
		{"Submit"}</button>
		</form>
		</>);
}

//This component has been replaced with Reusable IpWithLabel Component
/*
 function Search(props)
{
	return(
	<div>
	   <label id="search">Search</label>
	   <input id="search" type="text" value={props.inputVal} onChange={props.eventHandler}/>
	</div>
	)
}*/

//Reducer fn below
const storiesReducer=(state,action)=>
{
	switch(action.type)
	{
		case('STORIES_INIT'):
		{
		 return{
			 ...state,
			 isLoading:true,
			 isError:false
		       }
		}
		case('SET_NEW_STORIES'):
	        {
		 return{
			 ...state,
			 isLoading:false,
			 isError:false,
			 data:action.payload,
		       }
		}
		case('SET_FILTER_STORIES'):
		{
		 return{
			...state,
			data:(state.data.filter(function(elmnt)
				                {
						 return elmnt.url!==action.payload.url;
						}))
		       }
		}
		default:
		throw new Error();
	} 
}

function App() {
const title='HN Search API';

	const useCustomHook=(initialState)=>
	{
		const [value,setValue]=React.useState(localStorage.getItem('value')||initialState);

		React.useEffect(()=>
			{
				localStorage.setItem('value',value);
			},
			[value]
		);

		return [value,setValue];
	}
	const [changedText,setChangedText]=useCustomHook('React');

	
	function handleChange(e)
	{
		setChangedText(e.target.value);
	}
		
	const onClik=(item)=>
	{
	   setNewStories({
		   type:'SET_FILTER_STORIES',
	           payload:item});
	}

	const handleSubmit=(event)=>
	{
		setUrl(`https://hn.algolia.com/api/v1/search?query=${changedText}`);
		event.preventDefault();
	}
	const [newStories,setNewStories]=React.useReducer(storiesReducer,
		{data:[],isLoading:false,isError:false});

	const [url,setUrl]=React.useState(
		`https://hn.algolia.com/api/v1/search?query=${changedText}`);
	/*	const getAsyncStories=()=>
        {
	    return(
		    new Promise((resolve,reject)=>
		    setTimeout(()=> resolve({data:stories}),3000))
	          );
	}
	*/

	const handleFetch=React.useCallback(()=>
	{
		if(changedText==='') return;
		setNewStories({type:'STORIES_INIT'});
		const URL='https://hn.algolia.com/api/v1/search?query=';
		fetch(`${URL}+${changedText}`)
		 .then((response)=>{return response.json()})
		 .then((result)=>{
			         setNewStories({type:'SET_NEW_STORIES',
			                       payload:result.hits,});
			         console.log(result.page);
		                 })
	},[url]);

	React.useEffect(()=>
		{
			handleFetch();
		},[handleFetch]);


  return (
  <div className="container">
	<h1 className="headline-primary">{title}</h1>
	  <hr/>
	  <IpWithLabel label={"Search:"}
	  id={"search"}  
	  eventHandler={handleChange} 
	  value={changedText}
	  handleSubmit={handleSubmit}
	  isFocused/> 
	  <p><strong>{changedText}</strong></p>
	  { newStories.isLoading? (<p>LOADING...</p>):(
	  <List custom={newStories.data} onClik={onClik}/>)}
	  <hr/>
	<hr/>
	<hr/>
 </div>
  );
}

export default App;
