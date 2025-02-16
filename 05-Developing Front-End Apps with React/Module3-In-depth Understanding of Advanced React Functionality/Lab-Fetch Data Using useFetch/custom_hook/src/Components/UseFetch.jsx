import {useState, useEffect } from "react";

const UseFetch = (url) => {
    const [data, setData] = useState();
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);
    return [data];
}

export default UseFetch
