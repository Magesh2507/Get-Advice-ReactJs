import React, { useState, useEffect } from 'react'
import './qrCode.css'

const QrCode = () => {
    const [data, setData] = useState("")
    const [size, setSize] = useState("")
    const [img, setImg] = useState("")
    const [loading, setLoading] = useState(false)

    const generateQrCode = () => {
        setLoading(true)       
        try {
            const url = `http://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(data)}`
            setTimeout(()=>{
                setLoading(false)
                setImg(url)
            },3000)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const downloadQrCode = () => {
        fetch(img).then(response => response.blob())
            .then((blob) => {
                const Link = document.createElement("a")
                Link.href = URL.createObjectURL(blob)
                Link.download = "qrcode.png"
                document.body.appendChild(Link)
                Link.click()
                document.body.removeChild(Link)

            }
            )
    }
    useEffect(() => {
        if (img) {
            setData("");
            setSize("");
        }
    }, [img]);
    return (
        <div className='app-container'>
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>loading...</p>}
            {img && <img src={img} className='image' style={{ width: `${size}px`, height: `${size}px` }} alt='QR Code'></img>}
            <label htmlFor='qr-data' >Data for QR Code:</label>
            <input id='qr-data' placeholder='' disabled={img} value={data} onChange={(e) => setData(e.target.value)}></input>
            <label htmlFor='image-size' >Image Size (e.g. 150):</label>
            <input id='image-size' placeholder='' disabled={img} value={size} onChange={(e) => setSize(e.target.value)}></input>
            <button className='button generate-qrcode' onClick={generateQrCode} disabled={!(data && size)}>Generate QR Code</button>
            <button className='button download-qrcode' onClick={downloadQrCode} disabled={!img}>Download QR Code</button>
        </div>
    )
}

export default QrCode