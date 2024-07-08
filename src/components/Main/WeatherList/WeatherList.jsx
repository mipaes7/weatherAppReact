import React, { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useGeolocated } from "react-geolocated";

const WeatherList = () => {

    const myVar = import.meta.env.VITE_APIKEY;

    const [value, setValue] = useState("Lisbon"); // Para guardar el dato a buscar
    const [weatherInfo, setWeatherInfo] = useState([]); 

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const location = async () => {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=5&appid=${myVar}`);
        console.log(res.data[0].name);
        setValue(res.data[0].name);
    }
    // location();

    useEffect(() => {
        async function fetchData() {
            try {
                // if (isGeolocationAvailable && isGeolocationEnabled) {
                //     const res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=5&appid=${myVar}`);
                //     console.log(res);
                //     setValue(res.data[0].name);
                // }
                // Petición HTTP
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${myVar}`);
                const json = res.data.list;
                console.log(json);
                // Guarda en el array de posts el resultado. Procesa los datos
                setWeatherInfo(json);
            } catch (e) {
                setWeatherInfo([]) // No pintes nada 
            }
        }

        fetchData();
    }, [value]); // componentDidUpdate

    const renderWeatherCards = () => {
        return weatherInfo.map((item, index) => (
            <WeatherCard
                key={uuidv4()}
                dataItem={item}
                dataT={item.main}
                dataW={item.weather[0]}
                dataWind={item.wind}
            />
        ));
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.locationCity.value);
        setValue(e.target.locationCity.value); // Modificando el estado de Value
    };

    return (
        <section>
            <article>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='cityInput'>Check the weather in: </label>
                        <input type="text" name='locationCity' />
                        <button>Search</button>
                        <button onClick={location}>My position</button>
                    </div>
                </form>
            </article>
            <article>
            <h2>Weather in {value}</h2>
            {weatherInfo.length !== 0 ? renderWeatherCards() : <p>Loading...</p>}
            </article>
        </section>
    );

}

export default WeatherList