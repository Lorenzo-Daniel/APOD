import React, { useEffect, useState } from "react";
import AsteroidDescriptionFirstLevel from "./AsteroidDescriptionFirstLevel";

function AsteroidDescription({ data, name, date }) {
  const [valuesKeysFirstLevel, setValuesKeysFirstLevel] = useState([]);
  const [obj, setObj] = useState([]);
  const [valuesKeysSecondLevel, setValuesKeysSecondLevel] = useState([]);
  const [dataKey1, setDataKey1] = useState([]);
  const [show, setShow] = useState(false);

  const handlerKeysName = (data, name, date) => {
    if (typeof name === "undefined" || typeof name === "undefined" 
    || typeof data === "undefined") {
      setValuesKeysFirstLevel([]);
    } else {
      const getData = data[date];
      const findObj = getData.find((element) => element.name === name);
      const getObjKeys = Object.keys(findObj);
      setObj(findObj);
      setValuesKeysFirstLevel(getObjKeys);
      setShow(true);
    }
  };

  const showKeysOrValue = (obj, key, setData) => {
    if (typeof obj[key] === "object") {
      const getObj = obj[key];
      const getObjKeys = Object.keys(getObj);

      if (typeof getObj[getObjKeys] === "object") {
        const getNewObj = getObj[getObjKeys];
        const getNewObjKeys = Object.keys(getNewObj);
        setData(getNewObjKeys);
      } else {
        setData(getObjKeys);
      }
    } else if (typeof obj[key] === "boolean") {
      if (obj[key]) {
        setData(["true"]);
      } else {
        setData(["false"]);
      }
    } else {
      setData([obj[key]]);
    }
  };

  useEffect(() => {
    handlerKeysName(data, name, date);
  }, [data, name, date]);

  return (
    <div>
      <AsteroidDescriptionFirstLevel data={valuesKeysFirstLevel} />
    </div>
  );
}

export default AsteroidDescription;
