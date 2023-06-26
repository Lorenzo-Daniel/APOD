import React, { useEffect, useState } from "react";

function AsteroidDescription({ data, name, date }) {
  const [obj, setObj] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [close_approach_dataShow, setclose_approach_dataShow] = useState(false);
  const [estimated_diameterShow, setestimated_diameterShow] = useState(false);
  useEffect(() => {
    const getObj = () => {
      if (!name || !data || !date) {
        return;
      } else {
        const getObj = data[date];
        if(getObj){
          const getObjforName = getObj.find((element) => element.name === name);
          setObj(getObjforName);
          setShowDescription(true)
        }else {
          return
        }
      }
    };
    getObj();
  }, [data, name, date]);
  return (
    <div>
      {(showDescription && obj !== undefined) && (
        <div className="d-flex flex-column align-items-center  overflow-x-scroll">
          <h3>Name : {obj.name}</h3>
          <ul className="list-unstyled d-flex flex-column  flex-wrap" >
            <li>
              absolute_magnitude_h:
              <span >{obj["absolute_magnitude_h"]}</span>
            </li>
            <li className="">
              <span
                className="border"
                onClick={() => setclose_approach_dataShow((prev) => !prev)}
              >
                close_approach_data
                <i className="fa-solid fa-square-caret-down ms-1 text-white bg-dark border"></i>
              </span>

              {close_approach_dataShow ? (
                <ul>
                  <li>
                    close_approach_date:
                    <span className='ms-1'>
                      {obj["close_approach_data"][0].close_approach_date}
                    </span>
                  </li>
                  <li>
                    close_approach_date_full:
                    <span className='ms-1'>
                      {obj["close_approach_data"][0].close_approach_date_full}
                    </span>
                  </li>
                  <li>
                    epoch_date_close_approach:
                    <span className='ms-1'>
                      {obj["close_approach_data"][0].epoch_date_close_approach}
                    </span>
                  </li>
                  <li>
                    miss_distance
                    <ul>
                      <li>
                        astronomical:
                        <span className='ms-1'>
                          {
                            obj["close_approach_data"][0].miss_distance
                              .astronomical
                          }
                        </span>
                      </li>
                      <li>
                        kilometers:
                        <span className='ms-1'>
                          {
                            obj["close_approach_data"][0].miss_distance
                              .kilometers
                          }
                        </span>
                      </li>
                      <li>
                        lunar:
                        <span className='ms-1'>
                          {obj["close_approach_data"][0].miss_distance.lunar}
                        </span>
                      </li>
                      <li>
                        miles:
                        <span className='ms-1'>
                          {obj["close_approach_data"][0].miss_distance.miles}
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    relative_velocity
                    <ul>
                      <li>
                        kilometers_per_hour:
                        <span className='ms-1'>
                          {
                            obj["close_approach_data"][0].relative_velocity
                              .kilometers_per_hour
                          }
                        </span>
                      </li>
                      <li>
                        kilometers_per_second:
                        <span className='ms-1'>
                          {
                            obj["close_approach_data"][0].relative_velocity
                              .kilometers_per_second
                          }
                        </span>
                      </li>
                      <li>
                        miles_per_hour:
                        <span className='ms-1'>
                          {
                            obj["close_approach_data"][0].relative_velocity
                              .miles_per_hour
                          }
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </li>
            <li>
              <span
                className="border"
                onClick={() => setestimated_diameterShow((prev) => !prev)}
              >
                estimated_diameter
                <i className="fa-solid fa-square-caret-down ms-1 text-white bg-dark border"></i>
              </span>
              {estimated_diameterShow ? (
                <ul>
                  <li>
                    feet
                    <ul>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["feet"]
                              .estimated_diameter_max
                          }
                        </span>
                      </li>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["feet"]
                              .estimated_diameter_min
                          }
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    kilometers
                    <ul>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["kilometers"]
                              .estimated_diameter_max
                          }
                        </span>
                      </li>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["kilometers"]
                              .estimated_diameter_min
                          }
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    meters
                    <ul>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["meters"]
                              .estimated_diameter_max
                          }
                        </span>
                      </li>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["meters"]
                              .estimated_diameter_min
                          }
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    miles
                    <ul>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["miles"]
                              .estimated_diameter_max
                          }
                        </span>
                      </li>
                      <li>
                        estimated_diameter_max :
                        <span className='ms-1'>
                          {
                            obj.estimated_diameter["miles"]
                              .estimated_diameter_min
                          }
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </li>
            <li>
              is_potentially_hazardous_asteroid:
              <span className="ms-1">
                {obj.is_potentially_hazardous_asteroid === "true"
                  ? "true"
                  : "false"}
              </span>
            </li>
            <li>
              is_sentry_object:
              <span className="ms-1">{obj.is_sentry_object === "true" ? "true" : "false"}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default AsteroidDescription;
