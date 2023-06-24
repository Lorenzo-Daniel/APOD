import React, { useEffect, useState } from "react";

function AsteroidDescriptionFirstLevel({ data, name, date, secondLevelObj ,setfirstLevelKey}) {
  const [keysToShow, setKeysToShow] = useState([]);
  useEffect(() => {
    const getKeysToShow = () => {
      if (!name || !data || !date) {
        setKeysToShow([]);
      } else {
        const getObj = data[date];
        const getObjforName = getObj.find((element) => element.name === name);
        if (getObjforName) {
          const getObjKeys = Object.keys(getObjforName);
          setKeysToShow(getObjKeys);
          secondLevelObj(getObjforName);
        } else {
          setKeysToShow([]);
        }
      }
    };
    getKeysToShow();
  }, [data, name, date,secondLevelObj]);
  return (
    <div>
      {keysToShow.length > 0 && (
        <div>
          <h4 className="text-center">Selecciona el dato que quiere ampliar</h4>
          <div className="d-flex flex-wrap justify-content-between">
            {keysToShow.map((key) => (
              <div key={key}>
                <button className="border p-1 btn-info btn mt-2 " 
                onClick={()=> setfirstLevelKey(key)}>{key}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default AsteroidDescriptionFirstLevel;
