import React from "react";
 function SelectDate({ data, setDate }) {

  const dates = Object.keys(data);
  
  return (
    <div className="">
      {dates.length > 0 && (
        <div className="">
          <h4 className="text-center mt-3">Selecciona una fecha</h4>
          <div className="d-flex flex-wrap justify-content-center col-11 col-lg-9 col-xl-4 m-auto">
            {dates.map((dataKey) => {
              return (
                <button
                key={dataKey}
                  className="btn border btn-sm m-2 btn-info"
                  onClick={() => setDate(dataKey)}
                >
                  {dataKey}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


// {dates.map((dateKey) => (
//   <MemoizedButton key={dateKey} dateKey={dateKey} setDate={setDate} />
// ))}
//  const MemoizedButton = React.memo(({ dateKey, setDate }) => (
//   <button
//     className="btn border btn-sm mt-2 btn-info"
//     onClick={() => setDate(dateKey)}
//   >
//     {dateKey}
//   </button>
// ));
 export default SelectDate;