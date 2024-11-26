import axios from 'axios';
const API_URL = 'http://localhost:9000';

const headerOptions = {
    'Content-Type': 'application/json',
    token: window.localStorage.getItem('token')
}

export async function login(userDetails) {
    try {
        const result = await fetch('/account/login', {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: headerOptions
        })
        return await result.json()
    } catch {
        return Promise.reject()
    }

}

export async function register(userDetails) {
    const result = await fetch('/account/register', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: headerOptions
    })
    return result.headers.get('token')
}


export async function addMedication(medicationDetails) {
    const result = await fetch('/medication/new', {
        method: 'POST',
        body: JSON.stringify(medicationDetails),
        headers: headerOptions // Ensure headers are correctly set
    });
    const data = await result.json();
    return data; // Ensure you return the data from the response
}

export async function getMedicationsList() {
    const result = await fetch('/medication', {
        headers: headerOptions,
    })
    const data = await result.json()
    // console.log(data.data, ' med list api')
    return data.data
}

export async function getMedicationById(id) {
    const result = await fetch(`/medication/${id}`, {
        headers: headerOptions
    })
    const data = await result.json()
    console.log(data, ' getMedictionById API')
    return data
}

export const editMedication = async (id, medDetails) => {
    const result = await fetch(`/medication/${id}`, {
        method: 'PUT',
        body: JSON.stringify(medDetails),
        headers: headerOptions
    })
    const data = await result.json()
    console.log(data, ' edit list api')
    return data
}

export async function deleteMedication(id) {
    const result = await fetch(`/medication/${id}`, {
        method: 'DELETE',
        headers: headerOptions
    })
    const data = await result.json()
    return data
}



// export const updateMedicationStatus = async (medicationId, statusData) => {
//     try {
//         const response = await axios.put(`/medication/${medicationId}/taken`, statusData);
//         return response.data;
//     } catch (error) {
//         console.error("Error updating medication status:", error);
//         throw error;
//     }
// };


export const getMedications = async () => {
    const response = await axios.get(`${API_URL}/medication/`);
    return response.data;
};

export const updateMedicationStatus = async (medicationId, statusData) => {
    const response = await axios.put(`${API_URL}/medication/${medicationId}/taken`, statusData);
    return response.data;
};