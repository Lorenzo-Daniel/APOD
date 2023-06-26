import React, { useEffect, useState } from "react";
import SelectDate from "./SelectDate";
import SelectAsteroidName from "./SelectAsteroidName";
import AsteroidDescription from "./AsteroidDescription/AsteroidDescription";

function Asteroids() {
  const [data, setData] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestApiAsteroids = async (e, fechaInicio, endDate) => {
    if (fechaInicio === "" || endDate === "") {
      return alert("Debes ingresar las fechas");
    }
    try {
      setIsLoading(true);
      const request = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fechaInicio}&end_date=${endDate}&api_key=DEMO_KEY`
      );
      const res = await request.json();
      localStorage.setItem("data", JSON.stringify(res));
      setData(res.near_earth_objects);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    setData((prev) => prev || []);
    // setData(JSON.parse(localStorage.getItem("data")).near_earth_objects || []);
  }, []);

  return (
    <div >
      <h1 className="text-center my-5">Asteroids</h1>
      <div className="d-flex flex-column align-items-center">
        <div className="col-11 col-lg-6 col-xl-4 d-flex flex-column m-auto ">
          <div>
            <label className="d-flex flex-column ">
              Start date
              <input
                type="date"
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="d-flex flex-column mt-2">
              End date
              <input
                type="date"
                onChange={(e) => setFechaFinal(e.target.value)}
              />
            </label>
          </div>
          <input
            type="button"
            className="btn border mt-2"
            onClick={(e) => requestApiAsteroids(e, fechaInicio, fechaFinal)}
            value={isLoading ? "Obteniendo datos..." : "Obtener datos"}
            id="boton"
            disabled={isLoading}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
        <SelectDate data={data} setDate={setDate} />
        <SelectAsteroidName data={data} setName={setName} date={date} />
        <AsteroidDescription data={data} name={name} date={date} />
      </div>
    </div>
  );
}
export default Asteroids;
