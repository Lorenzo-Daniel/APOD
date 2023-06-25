import React, { useEffect, useState } from "react";

function SelectAsteroidName({ data, setName, date }) {
  const [asteroidNames, setAsteroidNames] = useState([]);

  useEffect(() => {
    if (!date) {
      setAsteroidNames([]);
      return;
    }
    
    const objData = data[date];
    
    if (!objData) {
      setAsteroidNames([]);
      return;
    }

    const asteroidNames = objData.map((obj) => obj.name);
    setAsteroidNames(asteroidNames);
  }, [data, date]);

  return (
    <div className="my-4">
      {asteroidNames.length > 0 && (
        <div className=" ">
          <h4 className="text-center mt-3">Selecciona un asteroide</h4>
          <div className="col-11 col-lg-9 col-xl-4 m-auto d-flex justify-content-center flex-wrap">
            {asteroidNames.map((asteroidName) => (
              <button
                key={asteroidName}
                className="btn border btn-sm m-2 btn-info"
                onClick={() => setName(asteroidName)}
              >
                {asteroidName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default SelectAsteroidName;
