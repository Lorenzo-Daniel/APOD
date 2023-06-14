import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css";

// const object = [
//   {
//     date: "2013-01-28",
//     explanation:
//       "Clouds of glowing gas mingle with dust lanes in the Trifid Nebula, a star forming region toward the constellation of the Archer (Sagittarius).  In the center, the three prominent dust lanes that give the Trifid its name all come together. Mountains of opaque dust appear on the right, while other dark filaments of dust are visible threaded throughout the nebula.  A single massive star visible near the center causes much of the Trifid's glow.  The Trifid, also known as M20, is only about 300,000 years old, making it among the youngest emission nebulae known.  The nebula lies about 9,000 light years away and the part pictured here spans about 10 light years.  The above image is a composite with luminance taken from an image by the 8.2-m ground-based Subaru Telescope, detail provided by the 2.4-m orbiting Hubble Space Telescope, color data provided by Martin Pugh and image assembly and processing provided by Robert Gendler.",
//     hdurl: "https://apod.nasa.gov/apod/image/1301/trifid_gendler_2400.jpg",
//     media_type: "image",
//     service_version: "v1",
//     title: "In the Center of the Trifid Nebula",
//     url: "https://apod.nasa.gov/apod/image/1301/trifid_gendler_960.jpg",
//   },
//   {
//     copyright: "\nGary Stevens\n",
//     date: "2003-07-21",
//     explanation:
//       "Why does this starfield photograph resemble an impressionistic painting?  The effect is created not by digital trickery but by large amounts of interstellar dust.  Dust, minute globs rich in carbon and similar in size to cigarette smoke, frequently starts in the outer atmospheres of large, cool, young stars. The dust is dispersed as the star dies and grows as things stick to it in the interstellar medium.  Dense dust clouds are opaque to visible light and can completely hide background stars.  For less dense clouds, the capacity of dust to preferentially reflect blue starlight becomes important, effectively blooming the stars blue light out and marking the surrounding dust.  Nebular gas emissions, typically brightest in red light, can combine to form areas seemingly created on an artist's canvas.  Photographed above is roughly one square degree of the nebula IC 4603 near the bright star Antares toward the constellation of Ophiuchus.",
//     hdurl: "https://apod.nasa.gov/apod/image/0307/ic4603_stevens_big.jpg",
//     media_type: "image",
//     service_version: "v1",
//     title: "IC 4603: Reflection Nebula in Ophiuchius",
//     url: "https://apod.nasa.gov/apod/image/0307/ic4603_stevens.jpg",
//   },
// ];
// console.log(object);
function App() {
  const [data, setData] = useState([]);
  const [panelShow, setPanelShow] = useState(true);
  const [dropDownExplanation, setDropDownExplanation] = useState(false);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [numberCountImg, setNumberCountImg] = useState();
  const [singleDate, setSingleDate] = useState("");

  console.log(numberCountImg);

  const getSingleDateRequest = async (date) => {
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${date}&concept_tags=True`
      );
      const response = await request.json();
      setData([response]);
      setPanelShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayRequest = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const formatDate = `${year}-${month}-${date}`;
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${formatDate}&concept_tags=True`
      );
      const response = await request.json();
      setData([response]);
      setPanelShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getRangeRequest = async (dateFrom, dateTo) => {
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&start_date=${dateFrom}&end_date=${dateTo}`
      );
      const response = await request.json();
      setData(response);
      setPanelShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomRequest = async (count) => {
    if (count === undefined || count === 0 || count > 100) {
      return alert(
        "debes ingresar un valor mayor que cero y menor o igual a 100"
      );
    }
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&count=${count}`
      );
      const response = await request.json();
      setData(response);
      setPanelShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const rangeDateHandler = async (dateFrom, dateTo) => {
    const dateFromTime = new Date(dateFrom).getTime();
    const dateToTime = new Date(dateTo).getTime();
    const minDate = new Date("1995-06-16").getTime();
    const maxDate = new Date().getTime();
    const result =
      dateFromTime >= minDate &&
      dateFromTime <= maxDate &&
      dateToTime >= minDate &&
      dateToTime <= maxDate;
    if (dateFrom === "") {
      alert("debes ingresar un a fecha de inicio");
    } else if (dateTo === "") {
      alert("debes ingresar un a fecha de Final");
    } else if (!result) {
      alert(
        "debes ingresar una fecha correcta inferior al dia actual y superior al 16/16/1995"
      );
    } else {
      getRangeRequest(dateFrom, dateTo);
      setPanelShow(false);
    }
  };

  const singleDateHandler = (singDate) => {
    const singleDate = new Date(singDate).getTime();
    const minDate = new Date("1995-06-16").getTime();
    const maxDate = new Date().getTime();
    const result = singleDate >= minDate && singleDate <= maxDate;
    if (!result) {
      return alert(
        "debes ingresar un valor inferior a la fecha actual y superior o igual a 16/6/1995"
      );
    } else {
      getSingleDateRequest(singDate);
      setPanelShow(false);
    }
  };
  return (
    <div className="App montserrat ">
      {panelShow ? (
        <div className="bg-space ">
          <div className="w-100 text-white vh-100">
            <div className="d-flex flex-column align-items-end me-2 mb-3 ">
              <button
                className="btn btn-sm p-1 pb-0"
                onClick={() => setPanelShow(false)}
              >
                <i className="fa-regular fa-hand-point-left fs-2 text-white "></i>
              </button>
              <span>Results</span>
            </div>
            <div className="">
              <div className="col-10 col-md-6 col-lg-5 col-xl-6 m-auto mb-5">
                <h1 className="text-center mb-5">
                  Astronomy Picture Of The Day
                </h1>
                <div className="d-flex justify-content-between">
                  <span className="text-white">Get Today Picture</span>

                  <button
                    className="btn text-white border btn-sm btn-primary "
                    style={{ width: "147px" }}
                    onClick={getTodayRequest}
                  >
                    Today Picture
                  </button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <span>Get Single Date</span>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column">
                      <label className="fw-lighter"> Entry single date</label>
                      <input
                        type="date"
                        className="rounded-2 btn btn-sm text-white border"
                        onChange={(e) => setSingleDate(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-sm text-white btn-primary border"
                      onClick={() => singleDateHandler(singleDate)}
                    >
                      Get Date
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <span className="">Get Date Range</span>
                  <div className="d-flex flex-column gap-2 ">
                    <div className="d-flex flex-column">
                      <label className="fw-lighter"> Entry initial date</label>
                      <input
                        type="date"
                        className=" rounded-2 btn btn-sm text-white border"
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <label className="fw-lighter"> Entry final date</label>
                      <input
                        type="date"
                        className=" rounded-2 btn btn-sm text-white border"
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-sm text-white border btn-primary "
                      onClick={() => rangeDateHandler(dateFrom, dateTo)}
                    >
                      Get Range
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <span>Get Random</span>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column">
                      <label className="fw-lighter"> Entry quantity</label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setNumberCountImg(Number(e.target.value))
                        }
                        className="btn btn-sm  border text-white"
                        style={{ width: "147px" }}
                        placeholder="entry quantity"
                      />
                    </div>
                    <button
                      className="btn btn-sm btn-primary text-white border boton"
                      onClick={() => getRandomRequest(numberCountImg)}
                    >
                      get Random
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="position-absolute ms-2 d-flex flex-column align-items-start">
            <button
              className="btn btn-small p-1 pb-0"
              onClick={() => setPanelShow(true)}
            >
              <i className="fa-regular fa-hand-point-right fs-2  text-light" />
            </button>
            <span className="text-white">Panel</span>
          </div>
          <div>
            {data.map((object, index) => {
              return (
                <div key={index}>
                  <div className="">
                    <img
                      src={object.url}
                      className="img-fluid w-100"
                      alt={object.title}
                    />
                    <p className="mt-1 mb-0">{object.date}</p>
                  </div>
                  <div className="col-12 m-auto mb-4">
                    <h6 className="p-3 montserrat">{object.title}</h6>
                    <div className="border rounded-2 col-11 col-md-9 col-lg-7 m-auto">
                      <button
                        className="btn w-100 d-flex justify-content-between align-items-center"
                        onClick={() => setDropDownExplanation((prev) => !prev)}
                      >
                        <span>Explanation</span>
                        <i className="fa-regular fa-square-caret-down" />
                      </button>
                      {dropDownExplanation && (
                        <p className="text-center montserrat p-3">
                          {object.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
