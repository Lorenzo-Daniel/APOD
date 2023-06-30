import React, { useEffect, useState } from "react";
import "./styles.css";
function MarsRoverPhotos() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const fetchMarsWeather = async (date) => {
    if (!date) {
      return alert("You must entry a date!");
    }
    try {
      setIsLoading(true);
      const API_KEY = "teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj";
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`
      );
      const res = await response.json();
      if (res?.photos.length === 0) {
        alert("no hay datos para esta fecha");
        setIsLoading(false);
      } else {
        localStorage.setItem("marsRover", JSON.stringify(res?.photos));
        setData(res?.photos);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(
        "Ocurrió un error al obtener los datos meteorológicos de Marte:",
        error
      );
    }
  };

  const cameras = ["fhaz", "rhaz", "mast", "mahli","navcam",'mardi'];

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("marsRover")) || []);
  }, []);

  const cameraDataHandler = (e) => {
    const value = e.target.value;
    const getLS = JSON.parse(localStorage.getItem("marsRover"));
    const filterCamera = getLS.filter(
      (obj) => obj.camera.name === value.toUpperCase()
    );
    setData(filterCamera);
  };
  return (
    <div>
      <div>
        <h1 className="text-center">Mars Rover Photos</h1>
      </div>
      <div className=" col-lg-4 d-flex align-items-center flex-column m-auto ">
        <div className="d-flex flex-column">
          <label> Ingres una fecha</label>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <input
          type="button"
            className="btn btn-sm btn-primary mt-2 "
            onClick={() => fetchMarsWeather(date)}
            defaultValue={isLoading ? "Get Images..." : "Get Images"}
          />
        </div>
      </div>
      {date && data.length > 0 && (
        <div className="d-flex flex-column  align-items-center mt-5">
          <h3 className="mb-4 text-center">Seleciona una camara</h3>
          <div className="col-11  d-flex  gap-1 scroll">
            {cameras.map((camera) => {
              return (
                <input
                  key={camera}
                  type="button"
                  value={camera}
                  className="btn btn-sm btn-primary "
                  onClick={(e) => cameraDataHandler(e)}
                />
              );
            })}
          </div>
        </div>
      )}
      <div className="d-flex gap-2 flex-wrap justify-content-center mt-5">
        {data.length > 0 &&
          data.map((element, index) => {
            return (
              <div key={element.id} className="col-11 col-md-5 col-lg-3">
                <img src={element.img_src} alt="alyt" width={"100%"} />
                <p className="m-0">id :{element.id}</p>
                <p className="m-0">camera :{element.camera.name}</p>
                <p className="m-0">Sol :{element.sol}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MarsRoverPhotos;
