import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp() {
    let [weatherInfo, setweatherInfo] = useState({
        city: "Pune",
        feelslike: 27.74,
        humidity: 84,
        temp: 27.12,
        tempmax: 27.74,
        tempmin: 27.74,
        weather: "overcast clouds",
    })

    let updateInfo = (newInfo) => {
        setweatherInfo(newInfo);
    }

    return (
        <div>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    )
}