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
import ReactPlayer from "react-player";
import sideralSpace from "./sideralSpace.mp4";

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
  const [wiki, setWiki] = useState([]);
  console.log(wiki);

  //SINGLE DATE
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

  //SINGLE DATE HANDLER
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

  // TODAY
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

  //GET RANGE
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

  //RANGE DATE HANDLER
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

  //GET RANDOM
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

  //WIKIPEDIA
  const requestWikipedia = async (keySearch) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${keySearch}`;
    const option = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const peticion = await fetch(url, option);
      const res = await peticion.json();
      const resSearch = res?.query?.search;
      const resultArrayMax3 = [];
      for (let i = 0; i < 3; i++) {
        resultArrayMax3.push(resSearch[i]);
      }

      for (let i = 0; i < resultArrayMax3.length; i++) {
        let removeSymbol = resultArrayMax3[i].snippet;
        const removeContent = removeSymbol.replace(/<[^>]*>/g, "");
        resultArrayMax3[i].snippet = removeContent;
      }
      return resultArrayMax3;
    } catch (error) {
      console.log("problems request wiwkipedia max3 undefined");
    }
  };

  const dropDownExplanationHandler = (index) => {
    setDropDownHandler((prev) => !prev);
    setDropDownExplanationIndex(index);
  };

  

  //USE EFFECT
  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("pictures")) || [];
    setData(getLS);
    //OBTENER TITLES APOD
  const getTitlesApod = async (getLS) => {
    const titles = getLS.map((element) => element.title);
    // const titlesRemoveCaracter = titles.map((element) =>
    //   element.replace(/\n|\r/g, "")
    // );

    const promises = titles.map((title) => requestWikipedia(title));

    try {
      const responses = await Promise.all(promises);
      for (let i = 0; i < responses.length; i++) {
        if (responses[i] === undefined) {
          const defaultResults = await requestWikipedia("Astronomy");
          setWiki((prev) => [...prev, defaultResults]);
        } else {
          setWiki((prev) => [...prev, responses[i]]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
    getTitlesApod(getLS);
  }, []);

  return (
    <div className="App montserrat ">
      {panelShow ? (
        <HomeContainer className=" bg-space">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <p className="text-white  position-absolute star">
              Astronomy Picture <br />
              of <br />
              the Day
            </p>
            <ReactPlayer
              url={sideralSpace}
              playing
              loop
              width="100%"
              height="100%"
            />
          </div>
          {/* className="d-flex flex-column align-items-end me-2 mb-3" */}
          <Div $flex $aiend $column $mr="5px">
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
              <p>Astronomy Pictures Of The Day (APOD) is a service of Nasa</p>

              <WrapperRowOptions $single>
                <Span>Get Today Picture</Span>
                <Button $btnPrimary onClick={getTodayRequest}>
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
                  <Button
                    $btnPrimary
                    onClick={() => singleDateHandler(singleDate)}
                  >
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
                  <Button
                    $btnPrimary
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
                  <Button
                    $btnPrimary
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
                    <div className="d-flex flex-column flex-md-row justify-content-evenly">
                    {wiki[index].map((element, i) => {
                      return (
                        <div className=" border rounded my-2 mx-3 p-2" key={i}>
                          <a
                            href={`https://en.wikipedia.org/?curid=${element.pageid}`}
                            target="_blanck"
                          >
                            {element.title}
                          </a>
                          <div>
                            <p>{element.snippet}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
