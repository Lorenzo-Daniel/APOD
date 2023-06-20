import { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import astronaut from "../Gallery/astronaut.jpg";
import { Span } from "./styles";
import ReactPlayer from "react-player";
// import { Div, Button } from "../../styles/GlobalStyles";

function Gallery() {
  const [dropDownExplanationIndex, setDropDownExplanationIndex] = useState();
  const [dropDownHandler, setDropDownHandler] = useState(false);
  const [wiki, setWiki] = useState([]);
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [showResults, setShowResults] = useState(null);
  const pageRef = useRef(null);
  
  const scrollToTop = () => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth' });
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
        if (getLS.length === 0) {
          setTimeout(() => {
            setSpinner(false);
            setShowResults(true);
          }, 1000);
        } else {
          setSpinner(false);
          setShowResults(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTitlesApod(getLS);
  }, []);

  return (
    <div>
      {spinner && (
        <div className="d-flex justify-content-center align-itemse-center mt-5">
          <div className="spinner-border" role="status">
            <span className="">Loading...</span>
          </div>
        </div>
      )}

      {showResults ? (
        <div style={{ backgroundColor: "#67e8fe" }}>
          <div className="ms-2  d-flex flex-column align-items-start">
            <Link to={"/"} className="btn btn-small p-1 pb-0">
              <i className="fa-regular fa-hand-point-right fs-2 mb-0 text-light" />
            </Link>
            <Span className="text-white">Panel</Span>
          </div>
          <div>
            <p className="text-white fs-md-2 fs-4 pt-5 m-0">
              You have not selected any search option!
            </p>
            <img src={astronaut} alt="astronaut" className="img-fluid w-50 " />
          </div>
        </div>
      ) : (
        <div>
          {/* <div className=" p-5 d-flex flex-column align-items-start sticky-top">
            <Link to={"/"} className="btn btn-small p-1 pb-0">
              <i className="fa-regular fa-hand-point-right fs-2 mb-0 text-black" />
            </Link>
            <Span className="text-black">Panel</Span>
          </div> */}
          <div className=" p-3  d-flex flex-column align-items-end sticky-top">
            <Link to={"/"} className="btn btn-small p-1 pb-0  bg-info" onClick={scrollToTop}>
              <i className="fa-regular fa-hand-point-up fs-2 mb-0 text-black" />
            </Link>
          </div>
          {data.map((object, index) => {
            return (
              <div key={index}>
                <div className="p-lg-2 d-flex flex-column col-lg-9 align-items-center m-auto">
                  {object.media_type === "video" ? (
                  <ReactPlayer
                    url = {object.url}
                    controls
                    width={'100%'}
                    style={{padding:'18px'}}
                  />
                  ) : (
                    <img
                      id={index}
                      src={object.url}
                      className="img-fluid w-100 p-3  "
                      alt={object.title}
                    />
                  )}
                  <p className="mt-1 mb-0">{object.date}</p>
                </div>
                <div className="col-12 col-lg-9 m-auto mb-4">
                  <h6 className="p-3 montserrat text-center">{object.title}</h6>
                  <div className="border rounded-2 mx-3 col-md-11  m-auto">
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
                          style={{
                            overflow: "hidden",
                          }}
                          className=" border rounded my-2 mx-3 p-2"
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

export default Gallery;
