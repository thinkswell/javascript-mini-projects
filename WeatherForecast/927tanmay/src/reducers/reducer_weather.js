import { FETCH_WEATHER } from "../actions/index";

export default function(state=[],action){
    
    switch(action.type){

        case FETCH_WEATHER : 
            //return state.concat([action.payload.data]);
              console.log("Action Received",action);
              if(action.error){
              return (alert('Error 404')); 
              }
              else{
              return [action.payload.data, ...state];
              }

    }
    return state;

}