import React, { useState } from 'react'
import './getAdvice.css'

const url = 'https://api.adviceslip.com/advice'
const GetAdvice = () => {

    const [count, setCount] = useState(0)
    const [advice, setAdvice] = useState('')
    const [loading, setLoading] = useState(false)

    async function getAdvice(){
        setAdvice("")
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        setLoading(false)
        setAdvice(data.slip.advice)        
        setCount(prev=> prev + 1)
    }
  return (
    <div className='container'>
        {loading && <p className='advice'>Loading...</p>}
        {advice && <p className='advice'>{advice}</p>}
        <button className='advice-btn' onClick={getAdvice}>Get Advice</button>
        <p className='message'>You have read <span>{count}</span> advices</p>
    </div>
  )
}

export default GetAdvice