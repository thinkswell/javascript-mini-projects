import './Chart.css';
import ChartBar from './ChartBar';

const Chart =(props)=>
{

    const dataPointValues= props.dataPoints.map(dataPoint => { return dataPoint.value;}); {/*returns an array of all values*/}
    const maxValue= Math.max(...dataPointValues); {/*max function only takes comma seperated dataPointValues, se we use the spred (...) operator*/}

    return(
        <div className="chart">
            {props.dataPoints.map((dataPoint)=>{
                <ChartBar 
                    key={dataPoint.label}
                    value={dataPoint.value}
                    label={dataPoint.label}
                    max={maxValue}
                />
            })}
        </div>
    );
}

export default Chart;