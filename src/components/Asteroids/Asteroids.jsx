import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectDate from "./SelectDate";
import SelectAsteroidName from "./SelectAsteroidName";
import AsteroidDescriptionFirstLevel from "./AsteroidDescription/AsteroidDescriptionFirstLevel";
import AsteroidDescriptionSecondLevel from "./AsteroidDescription/AsteroidDescriptionSecondLevel";
function Asteroids() {
  const [data, setData] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [secondLevelObj, setSecondLevelObj] = useState("");
  const [firstLevelKey, setfirstLevelKey] = useState("");
  console.log(firstLevelKey);

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
  }, []);
  return (
    <div className="container">
      <Link to={"/"} className="btn btn-sm p-1 pb-0 ">
        <span className="ms-2">Home</span>
      </Link>
      <h1 className="text-center my-5">Asteroids</h1>
      <div>
        <div className="w-100 d-flex flex-column m-auto ">
          <div>
            <label className="d-flex flex-column">
              Start date
              <input
                type="date"
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="d-flex flex-column">
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
        <AsteroidDescriptionFirstLevel
          data={data}
          name={name}
          date={date}
          secondLevelObj={setSecondLevelObj}
          setfirstLevelKey={setfirstLevelKey}
        />
        <AsteroidDescriptionSecondLevel secondLevelObj={secondLevelObj} />
      </div>
    </div>
  );
}
export default Asteroids;
