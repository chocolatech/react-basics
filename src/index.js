import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    <b>Bartosz Szczeciński</b> @btmpl - 
    <time>{(new Date()).toString()}</time>
    <p>
      Witaj świecie!
    </p>
  </div>
, document.getElementById('root'))