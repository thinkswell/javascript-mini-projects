import React from 'react';
import { Sparklines, SparklinesLine,SparklinesReferenceLine } from 'react-sparklines';
import _ from 'lodash';


export default (props)=>{

    function average(data){
        return _.round(_.sum(data)/data.length);
    }



    return(
    <div>
        <Sparklines data={props.data}>
            <SparklinesLine height={200} width={250} color={props.color} />
            <SparklinesReferenceLine type="avg"/>
            </Sparklines>
            <div>{average(props.data) }{props.unit}</div>
    </div>
    

    );
}