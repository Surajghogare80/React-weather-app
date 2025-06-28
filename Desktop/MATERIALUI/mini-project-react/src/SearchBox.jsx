import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useEffect, useState } from 'react';

export default function SearchBox({ updateInfo }) {

    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "c1b085389ea7cdb43bb317a3c913efe5";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempmax: jsonResponse.main.temp_max,
                tempmin: jsonResponse.main.temp_min,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            }
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, 1000)
        }
    })



    let handleChange = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo)
        } catch (err) {
            setError(true);
        }

    }


    return (
        <div className="SearchBox">
            <h2>Search for Weather</h2>
            <form onSubmit={handleSubmit}>
                <TextField id="City" label="City name" variant="outlined" required value={city} onChange={handleChange} />
                <br></br>
                <br></br>
                <Button variant="contained" type='submit'>
                    Search
                </Button>
                <br></br>
                {error && <p style={{ color: "red" }}>No such place exists! </p>}
            </form>
        </div>
    )
}