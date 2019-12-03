import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:process.env.baseUrl
})

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
    await axiosInstance.get(url)
    .then((content) => {
        data = content.data;
    })
    .catch(() => {
        console.log("failed to fetch json")
    })
    return data;
}

export default {fetchJson, axiosJson};