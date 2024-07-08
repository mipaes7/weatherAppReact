import React from "react";

const WeatherCard = ({
  dataItem: {
    dt_txt
  },
  dataT: {
    temp,
    temp_min,
    temp_max
  },
  dataW: {
    main,
    description,
    icon
  },
  dataWind: {
    speed,
    deg
  }
}) => {

  const convertToCelsius = (temperature) => {
    return Math.floor(temperature - 273);
  };

  const convertToKMH = (speed) => {
    return Math.floor(speed * 3.6);
  };

  const img_url = `http://openweathermap.org/img/w/${icon}.png`;

  const setWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return <article>
    <h2>{dt_txt}</h2>
    <div>
      <p>
        Avg. Temp. (Cº): {convertToCelsius(temp)}
      </p>
      <p>
        Max. Temp. (Cº): {convertToCelsius(temp_max)}
      </p>
      <p>
        Min. Temp. (Cº): {convertToCelsius(temp_min)}
      </p>
    </div>
    <div>
      <p>
        General: {main}
      </p>
      <p>
        Description: {description}
      </p>
      <img src={img_url} alt={description} />
    </div>
    <div>
      <p>
        Wind Speed (Km/h): {convertToKMH(speed)}
      </p>
      <p>
        Wind Direction: {setWindDirection(deg)}
      </p>
    </div>
  </article>;
};

export default WeatherCard;
