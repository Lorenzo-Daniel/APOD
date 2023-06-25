import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  WrapperRowOptions,
  Label,
  Input,
  Span,
  HomeContainer,
} from "./styles";
import { Div, Button } from "../../styles/GlobalTags";
import ReactPlayer from "react-player";
import sideralSpace from "./sideralSpace.mp4";

function Home() {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [numberCountImg, setNumberCountImg] = useState();
  const [singleDate, setSingleDate] = useState("");
  const navigate = useNavigate();

  //GET TODAY
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
      localStorage.setItem("pictures", JSON.stringify([response]));
      navigate("/Gallery");
    } catch (error) {
      console.log(error);
    }
  };

  //SINGLE DATE
  const getSingleDateRequest = async (date) => {
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&date=${date}&concept_tags=True`
      );
      const response = await request.json();
      localStorage.setItem("pictures", JSON.stringify([response]));
      navigate("/Gallery");
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

  //GET RANGE
  const getRangeRequest = async (dateFrom, dateTo) => {
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&start_date=${dateFrom}&end_date=${dateTo}`
      );
      const response = await request.json();
      localStorage.setItem("pictures", JSON.stringify(response));
      navigate("/Gallery");
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
      navigate("/Gallery");
    } catch (error) {
      console.log(error);
    }
  };
  //USE EFFECT
  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("pictures")) || [];
    console.log(getLS);
  }, []);

  return (
    <div className="App montserrat ">
      <HomeContainer className=" bg-space">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <p className="text-white  position-absolute star animate__animated animate__zoomIn animate__delay-1 animate__slow	">
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
        <Div $flex $ais $column $mr="5px" className="p-2">
          <Link to={"/Gallery"} className="btn btn-sm p-1 pb-0 ">
            <span className="ms-2">APOD Gallery</span>
          </Link>
          <div>
            <Link to={"/Asteroids"} className="btn btn-sm p-1 pb-0 ">
              <span className="ms-2">Asteroids</span>
            </Link>
          </div>
        </Div>
        <div className="">
          <div className="col-10 col-md-7 col-lg-5 col-xl-5 m-auto mb-5">
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
    </div>
  );
}
export default Home;
