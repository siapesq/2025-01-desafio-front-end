'use client'

import { useState, useEffect } from 'react';

export default function MainPage() {
    const [data, setData] = useState(null)
    const [test, setTest] = useState('')

    useEffect(() => {
        fetch('https://api.gbif.org/v1/occurrence/search?taxonKey=5&mediaType=StillImage&limit=5')
        .then((res) => res.json())
        .then((result) => {
            console.log(result.results)
            setData(result.results[0].media[0].identifier)
        })
        fetch('https://api.gbif.org/v1/species/search?datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&limit=2')
        .then((res) => res.json())
        .then((result) => {
            console.log(result.results[0]);
        })
    }, [test]);

    return(
        <>
            <p>aaa</p>
            <img style={{'width': '200px'}} src={data} />
        </>
    )
}