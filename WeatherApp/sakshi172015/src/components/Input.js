import React, { useState } from 'react'
import '../styling/Input.css'
import { TextField } from '@material-ui/core'
import axios from 'axios'
import Output from './Output'

function Input() {
    const [state, setState] = useState("")
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const handleStateChange = (e) => {
        setState(e.target.value)
    }
    const API_KEY = "46a180696513e1367f492523f25cfa66";
    const handleSubmit = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${API_KEY}`)
            .then(function (response) {
                // handle success
                if(response.status === 200) {
                    setData(response.data)
                    setError(false)
                } else {
                    setData(null)
                    setError(true)
                }
            })
            .catch(function (error) {
                // handle error
                setData(null)
                setError(true)
            });
    }
    return (
        <div>
            <div className="space"></div>
            <TextField
                className="input"
                id="outlined-basic"
                label="State"
                variant="outlined"
                autoFocus={false}
                value={state}
                onChange={e=>handleStateChange(e)}
            />
            <div className="space"></div>
            <div className="btn" onClick={handleSubmit}>SUBMIT</div>
            {
                data ? (
                    <Output object={data} />
                ) : (
                    null
                )
            }
            {
                error ? (
                    <div className="error"> 
                        Sorry to bring you that there might be some error or the filled state does not exists!!
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )
}

export default Input
