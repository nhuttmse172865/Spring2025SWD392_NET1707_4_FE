const BASE_URL = import.meta.env.VITE_REACT_APP_END_POINT
const BASE_MY_HOST = `http://${window.location.host}`|| import.meta.env.VITE_REACT_APP_MY_HOST
const BASE = {
    BASE_URL,
    BASE_MY_HOST
}

export default BASE