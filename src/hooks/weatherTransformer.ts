export function celsiusToFahrenheit(celsius: number): number {
  // Use 9/5 or 1.8 for the conversion factor
  const fahrenheit: number = (celsius * 9/5) + 32; 
  return fahrenheit;
}

export function weatherType(precipNum: number, temp: number, cloudiness: number, fog: number, windForce: number): string {
   if (temp < 0 && precipNum < 1 && precipNum > 0) {
    return "Snow";
  } 
   else if (temp >= 0 && precipNum < 1 && precipNum > 0) {
    return "Rain";
  } 
   else if (temp < 0 && precipNum == 1) {
    return "Blizzard";
  } else if (temp >= 0 && precipNum == 1) {
    return "Storm";
  } else if (fog > 0 && fog < .25) {
    return "Light Fog";
  } else if (fog >= .25 && fog < .75) {
    return "Fog";
  }
  else if (fog >= .75) {
    return "Heavy Fog";
  }
   else if (cloudiness > .5) {
    return "Cloudy";
  }
  else if (windForce == 5) {
    return "Windy";
  }
  else{
    return "Clear";
  }
}

export const getDirection = (angle: number): string => {
  const directions: string[] = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];

  const sectionSize = 22.5;

  angle = ((angle %= 360) < 0) ? angle + 360 : angle;

  const sectionIndex: number = Math.floor((angle + sectionSize / 2) / sectionSize);

  return directions[sectionIndex % directions.length];
};