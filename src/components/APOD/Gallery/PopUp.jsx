import React, { useEffect } from "react";
import './styles.css'
function PopUp() {
  useEffect(() => {
    function getNestedMarkup(tag, content, count) {
      tag = "<" + tag + ">";
      var start = "";
      var end = "";
      var closingTag = tag.replace("<", "</");
      while (count-- > 0) {
        start += tag + content;
        end += closingTag;
      }
      return start + end;
    }

    const DIV_COUNT = 99; // + container = 100
    const container = document.getElementById("container");
    container.innerHTML = getNestedMarkup("div", "", DIV_COUNT);
  }, []);

  return <div id="container" className="container-PopUp-Apod"></div>;
}

export default PopUp;

