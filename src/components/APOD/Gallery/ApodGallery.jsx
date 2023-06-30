import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import astronaut from "../Gallery/astronaut.jpg";
import { Span } from "./styles";
import ReactPlayer from "react-player";
import Swal from "sweetalert2";
import PopUp from "./PopUp";
// import { Div, Button } from "../../styles/GlobalStyles";

function ApodGallery() {
  const [dropDownExplanationIndex, setDropDownExplanationIndex] = useState();
  const [dropDownHandler, setDropDownHandler] = useState(true);
  const [wiki, setWiki] = useState([]);
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [showResults, setShowResults] = useState(null);

  const popUpImgGaleria = (urlImg, nombre) => {
    Swal.fire({
      title: `${nombre}`,
      color: "#ffffff",
      imageUrl: urlImg,
      showConfirmButton: false,
      showCloseButton: true,
      position: "center",
      background: "#ffffff",
      showClass: {
        popup: "animate__animated animate__fadeIn animate__fast",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut animate__fast",
      },
      customClass: {
        popup: "galeria-swal2-popup",
        closeButton: "swal2-close ",
        title: "galeria-swal2-title",
        image: "galeria-swal2-image",
      },
    });
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
    setDropDownExplanationIndex(index);
    setDropDownHandler((prev) => !prev);
  };

  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("pictures")) || [];
    //OBTENER TITLES APOD
    const getTitlesApod = async (getLS) => {
      const titles = getLS.map((element) => element.title);
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
        setData(getLS);
          setSpinner(false);
          setShowResults(false);
      } catch (error) {
        console.error(error);
      }
    };
    getTitlesApod(getLS);
  }, []);

  return (
    <div>
      {spinner && <PopUp />}

      {showResults ? (
        <div style={{ backgroundColor: "#67e8fe", height: "100vh" }}>
          <div className="ms-2  d-flex flex-column align-items-start">
            <Link to={"/"} className="btn btn-small p-1 pb-0">
              <i className="fa-regular fa-hand-point-right fs-2 mb-0 text-light" />
            </Link>
            <Span className="text-white">Panel</Span>
          </div>
          <div className="d-flex flex-column p-3">
            <p className="text-white fs-md-2 fs-4 pt-5 m-0 text-center">
              You have not selected any search option!
            </p>
            <div className="d-flex justify-content-center ">
              <img
                src={astronaut}
                style={{ maxWidth: "350px" }}
                alt="astronaut"
                className="img-fluid w-50"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {data.map((object, index) => {
            return (
              <div key={index}>
                <div className="p-lg-2 d-flex flex-column col-lg-9 align-items-center m-auto">
                  {object.media_type === "video" ? (
                    <ReactPlayer
                      url={object.url}
                      controls
                      width={"100%"}
                      style={{ padding: "18px" }}
                    />
                  ) : (
                    <img
                      id={index}
                      src={object.url}
                      className="img-fluid w-100 p-3"
                      style={{ cursor: "pointer" }}
                      alt={object.title}
                      onClick={() => popUpImgGaleria(object.url, object.title)}
                    />
                  )}
                  <p className="mt-1 mb-0">{object.date}</p>
                </div>
                <div className="col-12 col-lg-9 m-auto mb-4">
                  <h6 className="p-3 montserrat text-center">{object.title}</h6>
                  <div className="border rounded-2 mx-3  m-auto">
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
                  <div className="d-flex flex-column flex-md-row justify-content-evenly">
                    {wiki[index].map((element, i) => {
                      return (
                        <div
                          className=" border rounded my-2 mx-3 p-2 text-center"
                          key={i}
                        >
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ApodGallery;
