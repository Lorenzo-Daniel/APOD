import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import astronaut from "./astronaut.jpg";
import "../App.css";
import {
  WrapperRowOptions,
  Label,
  Input,
  Span,
  HomeContainer,
} from "./Home/styles";
import { Div, Button } from "../styles/GlobalTags";

console.log(<input type="date"/>)
// const object = [
//   {
//     date: "2013-01-28",
//     explanation:
//       "Clouds of glowing gas mingle with dust lanes in the Trifid Nebula, a star forming region toward the constellation of the Archer (Sagittarius).  In the center, the three prominent dust lanes that give the Trifid its name all come together. Mountains of opaque dust appear on the right, while other dark filaments of dust are visible threaded throughout the nebula.  A single massive star visible near the center causes much of the Trifid's glow.  The Trifid, also known as M20, is only about 300,000 years old, making it among the youngest emission nebulae known.  The nebula lies about 9,000 light years away and the part pictured here Spans about 10 light years.  The above image is a composite with luminance taken from an image by the 8.2-m ground-based Subaru Telescope, detail provided by the 2.4-m orbiting Hubble Space Telescope, color data provided by Martin Pugh and image assembly and processing provided by Robert Gendler.",
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
function Home() {
  const [data, setData] = useState([]);
  const [panelShow, setPanelShow] = useState(true);
  const [dropDownExplanationIndex, setDropDownExplanationIndex] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [numberCountImg, setNumberCountImg] = useState();
  const [singleDate, setSingleDate] = useState("");
  const [dropDownHandler, setDropDownHandler] = useState(false);
  const [somethingSelected, setSomethingSelected] = useState(false);

  // console.log(data);

  const getSingleDateRequest = async (date) => {
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${date}&concept_tags=True`
      );
      const response = await request.json();
      setData([response]);
      setPanelShow(false);
      somethingSelected(true);
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
      somethingSelected(true);
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
      somethingSelected(true);
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
      localStorage.setItem("pictures", JSON.stringify(response));
      setData(response);
      setPanelShow(false);
      setSomethingSelected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const rangeDateHandler = (dateFrom, dateTo) => {
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
    }
  };
  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("pictures")) || [];
    console.log(getLS);
    setData(getLS);
  }, []);

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
    }
  };

  const dropDownExplanationHandler = (index) => {
    setDropDownHandler((prev) => !prev);
    setDropDownExplanationIndex(index);
  };
  return (
    <div className="App montserrat ">
      {panelShow ? (
        <HomeContainer className="text-white  bg-space">
          {/* className="d-flex flex-column align-items-end me-2 mb-3" */}
          <Div $flex $aiend $column $mr='5px'>
            <Button 
              className="btn btn-sm p-1 pb-0 "
              onClick={() => setPanelShow(false)}
            >
              <i className="fa-regular fa-hand-point-left fs-2 text-white "></i>
            </Button>
            <Span>Results</Span>
          </Div>
          <div className="">
            <div className="col-10 col-md-7 col-lg-5 col-xl-5 m-auto mb-5">
              <h1 className="mb-5 text-center">Astronomy Picture Of the Day</h1>
            
              <WrapperRowOptions $single>
                <Span>Get Today Picture</Span>
                <Button $btnPrimary  onClick={getTodayRequest}>
                  Today Picture
                </Button>
              </WrapperRowOptions>
              <WrapperRowOptions>
                <Span>Get Single Date</Span>
                <div>
                  <Label> Entry single date</Label>
                  <Input
                    type="date"
                    onChange={(e) => setSingleDate(e.target.value)}
                  />
                  <Button $btnPrimary 
                  onClick={() => singleDateHandler(singleDate)}>
                    Get Date
                  </Button>
                </div>
              </WrapperRowOptions>
              <WrapperRowOptions>
                <Span>Get Date Range</Span>
                <div>
                  <Label> Entry initial date</Label>
                  <Input
                    type="date"
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                  <div>
                    <Label> Entry final date</Label>
                    <Input
                      type="date"
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                  <Button $btnPrimary
                    onClick={() => rangeDateHandler(dateFrom, dateTo)}
                  >
                    Get Range
                  </Button>
                </div>
              </WrapperRowOptions>
              <WrapperRowOptions>
                <Span>Get Random</Span>
                <div>
                  <Label> Entry quantity</Label>
                  <Input
                    type="text"
                    onChange={(e) => setNumberCountImg(Number(e.target.value))}
                    placeholder="entry quantity"
                  />
                  <Button $btnPrimary
                    onClick={() => getRandomRequest(numberCountImg)}
                  >
                    get Random
                  </Button>
                </div>
              </WrapperRowOptions>
            </div>
          </div>
       
        </HomeContainer>
      ) : data.length === 0 ? (
        <div style={{ backgroundColor: "#67e8fe" }} className="vh-100 ">
          <div className="ms-2  d-flex flex-column align-items-start">
            <button
              className="btn btn-small p-1 pb-0"
              onClick={() => setPanelShow(true)}
            >
              <i className="fa-regular fa-hand-point-right fs-2 mb-0 text-light" />
            </button>
            <Span className="text-white">Panel</Span>
          </div>
          <p className="text-white fs-md-2 fs-4 pt-5 m-0">
            You have not selected any search option!{" "}
          </p>
          <img src={astronaut} alt="astronaut" className="img-fluid w-50 " />
        </div>
      ) : (
        <div>
          <div className=" ms-2 d-flex flex-column align-items-start">
            <button
              className="btn btn-small p-1 pb-0"
              onClick={() => setPanelShow(true)}
            >
              <i className="fa-regular fa-hand-point-right fs-2 text-dark " />
            </button>
            <Span className="text-dark ">Panel</Span>
          </div>
          <div>
            {data.map((object, index) => {
              return (
                <div key={index}>
                  <div className="p-lg-2 w-100">
                    <img
                      src={object.url}
                      className="img-fluid w-100 "
                      alt={object.title}
                    />
                    <p className="mt-1 mb-0">{object.date}</p>
                  </div>
                  <div className="col-12 m-auto mb-4">
                    <h6 className="p-3 montserrat">{object.title}</h6>
                    <div className="border rounded-2 col-11 col-md-9 col-lg-7 m-auto">
                      <button
                        className="btn w-100 d-flex justify-content-between align-items-center"
                        onClick={() => dropDownExplanationHandler(index)}
                      >
                        <Span>Explanation</Span>
                        <i className="fa-regular fa-square-caret-down" />
                      </button>
                      <p
                        className={
                          index === dropDownExplanationIndex && !dropDownHandler
                            ? "text-center montserrat p-3 "
                            : "visually-hidden"
                        }
                      >
                        {object.explanation}
                      </p>
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
export default Home;
