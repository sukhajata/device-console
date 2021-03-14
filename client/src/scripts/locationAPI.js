import axios from 'axios';

const api = "https://nominatim.openstreetmap.org/search?";

const getOptions = () => {
    return {
        headers: {
            // Authorization: `Bearer ${token}`,
            accept: "application/json",
        }
    };
};

export const geocode = async(street, town) =>{
    const url = `${api}city=${town}&street=${street}&country=New Zealand&format=json`;
    const response = await axios.get(encodeURI(url), getOptions());
    return response.data[0];
}

export const getlocation = (onSuccess, onError) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            onSuccess(pos.coords);
        }, err => {
            console.log(err);
            onError(err);
        }
    );
}