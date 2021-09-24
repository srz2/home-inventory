import {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortController = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortController.signal})
                .then(res => {
                    if (!res.ok) {
                    throw Error('Could not fetch data from server') 
                    }
                    return res.json()
                })
                .then(json => {
                    setData(json)
                    setError(null)
                })
                .catch((e) => {
                    if (abortController.signal.aborted) {
                        console.log('fetch aborted');
                    } else {
                        setError(e.message)
                    }
                })
                .finally(() => {
                    if (abortController.signal.aborted){
                        console.log('fetch aborted finally');
                    } else {
                        setIsLoading(false)
                    }
                })
        }, 500);

        return () => abortController.abort()

    }, [url]);

    return {data, isLoading, error}
}

export default useFetch;