// PROYECTO TEMA 2. Skylab Airlines! ✈️🛩
// Programa una interfaz de usuario para una aerolínea (por consola...)
// Skylab Airlines
// 1- Se preguntará por el nombre de usuario y dará la bienvenida (via prompt).
// 2- Esta aerolínea dispondrá de 10 vuelos para el día de hoy, para empezar, estos vuelos deben estar declarados de manera global, cuando se llame a la función (al final de este Readme, teneis un array con vuelos "inventados".)
// 3- El usuario visualizará todos los vuelos disponibles de una forma amigable:
// El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
// 4- Despues de visualizar todos los vuelos disponibles, el usuario verá el coste medio de los vuelos.
// 5- También podrá ver cuántos vuelos efectúan escalas.
// 6- Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

let flights = [
  { id: 00, to: "Bilbao", from: "Barcelona", cost: 1600, scale: false },
  { id: 01, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 02, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 03, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 04, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 05, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 06, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 07, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 08, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 09, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 10, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

const welcomeUser = () => {
  const userName = prompt("Please state your name");
  if (userName === "" || userName === null || userName === undefined) {
    return welcomeUser();
  } else {
    alert(`Welcome to Skylab Airlines ${userName}`);
    return displayFlights(flights);
  }
};

const displayFlights = (flights) => {
  flights.forEach((flights) => {
    console.log(
      `The flight from ${flights.from} to ${flights.to} has a cost of ${
        flights.cost
      } and ${
        flights.scale === true ? `will make a stop` : `won't make any stop`
      }`
    );
  });
  return displayAvg(flights);
};

const displayAvg = (flights) => {
  let total = 0;
  for (let i = 0; i < flights.length; i++) {
    total += flights[i].cost;
  }
  console.log(
    `The average cost of a flight ticket is ${(total / flights.length).toFixed(
      2
    )}`
  );
  return displayScaleFlights(flights);
};

const displayScaleFlights = (flights) => {
  const scaleFlights = flights.filter((flights) => flights.scale);
  console.log(`Please see below the list of flights with a stop:`);
  scaleFlights.forEach((scaleFlights) => {
    console.log(
      `Flight from ${scaleFlights.from} to ${scaleFlights.to}, ${scaleFlights.cost}$`
    );
  });
  return displayLastFlights(flights);
};

const displayLastFlights = (flights) => {
  const lastFlights = flights.slice(flights.length - 6, flights.length - 1);
  console.log(`Please beware, this are the last flights for the day:`);
  lastFlights.forEach((lastFlights) => {
    console.log(`Flight to ${lastFlights.to}, ${lastFlights.cost}$`);
  });
};

welcomeUser();
