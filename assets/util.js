import axios from 'axios'

async function fetchJson(url) {
    let data = null
    fetch(url, {
      mode: 'cors'
    }).then((content) => {
        data = content.data;
    })
    .catch(() => {
        console.log("failed to fetch json")
    })
    return data;
}

async function axiosJson(url) {
    let data = null
    await axios.get(url)
    .then((content) => {
        data = content.data;
    })
    .catch(() => {
        console.log("failed to fetch json")
    })
    .catch(() => {
        console.log("failed to fetch json")
    })
    return data;
}

export default {fetchJson, axiosJson};