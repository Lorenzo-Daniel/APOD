import React, { useEffect, useState, useCallback } from "react";
import "../../../src/App.css";
function Epic() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(date);
  const requestApiEpic = useCallback(async (e, date) => {
    try {
      const request = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=DEMO_KEY`
      );
      const res = await request.json();
      localStorage.setItem("epic", JSON.stringify(res));
      setData(res);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  }, []);

  const getDate = (e, currentDate) => {
    if (currentDate === "") {
      return alert("No ingresate ninguna fecha");
    } else {
      setIsLoading({ main: true });
      requestApiEpic(e, currentDate);
    }
  };
  const nextDate = (e, currentDate) => {
    if (currentDate === "") {
      return alert("No ingresate ninguna fecha");
    }
    const fullDate = new Date(currentDate);
    const year = fullDate.getFullYear().toString();
    const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
    const date = ("0" + (fullDate.getDate() + 2)).slice(-2);
    const formatedDate = `${year}-${month}-${date}`;
    console.log(formatedDate);
    if (formatedDate) {
      requestApiEpic(e, formatedDate);
      setDate(formatedDate);
      setIsLoading({ next: true });
    }
  };
  const previousDate = (e, currentDate) => {
    if (currentDate === "") {
      return alert("No ingresate ninguna fecha");
    }
    const fullDate = new Date(currentDate);
    const year = fullDate.getFullYear().toString();
    const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
    const date = ("0" + fullDate.getDate()).slice(-2);
    const formatedDate = `${year}-${month}-${date}`;
    // console.log(formatedDate);
    if (formatedDate) {
      requestApiEpic(e, formatedDate);
      setDate(formatedDate);
      setIsLoading({ previous: true });
    }
  };

  const getLS = useCallback(async () => {
    try {
      setData(JSON.parse(localStorage.getItem("epic")) || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // previousDate(date)
    getLS();
  }, [getLS, date]);

  // console.log(data);

  return (
    <div>
      <h1 className="text-center mt-5">EPIC</h1>
      <h5 className="text-center mb-5"> Earth Polychromatic Imaging Camera</h5>
      <div className="col-11 col-lg-6 col-xl-4 d-flex flex-column m-auto mb-5 ">
        <div>
          <label className="d-flex flex-column ">
            Select date
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </label>
        </div>
        <input
          type="button"
          className="btn border mt-2"
          onClick={(e) => getDate(e, date)}
          name="main"
          value={isLoading.main ? "Obteniendo datos..." : "Obtener datos"}
          id="boton"
          disabled={isLoading.main}
        />
        <h3 className="text-center mt-3 mb-0">
          {date && `Selected Date:  ${date}`}
        </h3>
        {error && <p className="text-danger">{error}</p>}
      </div>

      {data.length > 0 ? (
        <div className="d-flex flex-wrap gap-2 justify-content-center col-11 m-auto ">
          <div className="d-flex justify-content-between col-11 col-lg-9 m-auto p-2">
            <input
              type="button"
              className="btn mt-2"
              onClick={(e) => previousDate(e, date)}
              name="previous"
              value={isLoading.previous ? "Previous..." : "Previous"}
              disabled={isLoading.previous}
            />
            <input
              type="button"
              className="btn mt-2"
              onClick={(e) => nextDate(e, date)}
              name="next"
              value={isLoading.next ? "Next..." : "Next"}
              disabled={isLoading.next}
            />
          </div>
          {data.map((obj, index) => {
            const fullDate = new Date(data[0].date);
            const year = fullDate.getFullYear().toString();
            const month = ("0" + (fullDate.getMonth() + 1)).slice(-2);
            const date = ("0" + fullDate.getDate()).slice(-2);
            const formatedDate = `${year}/${month}/${date}`;
            return (
              <div
                key={index}
                className="col-12 col-lg-3 col-xl-10 position-relative "
              >
                <img
                  src={`https://epic.gsfc.nasa.gov/archive/natural/${formatedDate}/png/${obj.image}.png`}
                  alt="alt"
                  width={"100%"}
                />
                <div className="d-flex flex-column info-img-epic">
                  <p className="text-center ">{obj.date}</p>
                  <div className="flex-wrap justify-content-evenly d-none d-xl-flex   ">
                    <ul className="list-unstyled d-flex flex-column align-items-start m-0">
                      attitude_quaternions :
                      <li>
                        q0 : <span>{obj.attitude_quaternions["q0"]}</span>
                      </li>
                      <li>
                        q1 : <span>{obj.attitude_quaternions["q1"]}</span>
                      </li>
                      <li>
                        q2 : <span>{obj.attitude_quaternions["q2"]}</span>
                      </li>
                      <li>
                        q3 : <span>{obj.attitude_quaternions["q3"]}</span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex flex-column align-items-start m-0">
                      centroid_coordinates :
                      <li>
                        lat : <span>{obj.centroid_coordinates["lat"]}</span>
                      </li>
                      <li>
                        lon : <span>{obj.centroid_coordinates["lon"]}</span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex flex-column align-items-start  m-0">
                      dscovr_j2000_position :
                      <li>
                        x : <span>{obj.dscovr_j2000_position["x"]}</span>
                      </li>
                      <li>
                        y : <span>{obj.dscovr_j2000_position["y"]}</span>
                      </li>
                      <li>
                        z: <span>{obj.dscovr_j2000_position["z"]}</span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex flex-column align-items-start m-0">
                      lunar_j2000_position :
                      <li>
                        x : <span>{obj.lunar_j2000_position["x"]}</span>
                      </li>
                      <li>
                        y : <span>{obj.lunar_j2000_position["y"]}</span>
                      </li>
                      <li>
                        z: <span>{obj.lunar_j2000_position["z"]}</span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex flex-column align-items-start m-0">
                      sun_j2000_position :
                      <li>
                        x : <span>{obj.sun_j2000_position["x"]}</span>
                      </li>
                      <li>
                        y : <span>{obj.sun_j2000_position["y"]}</span>
                      </li>
                      <li>
                        z: <span>{obj.sun_j2000_position["z"]}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Epic;
