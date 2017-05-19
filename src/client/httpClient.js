import axios from 'axios';

export function getProfileData() {
    return axios.get('/api/users/getmyprofiledataforediting');
}

export function getAddresses(searchTerm, allowCities = false) {
    const queryString = allowCities ? `q=${searchTerm}&allowcities=true` : `q=${searchTerm}`;
    return axios.get(`/api/address?${queryString}`);
}

export function getProfessions(searchTerm) {
    const queryString = `q=${searchTerm}`;
    return axios.get(`/api/professions?${queryString}`);
}
