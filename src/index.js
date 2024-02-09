import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import StarRating from "./StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <>
//       <StarRating maxRating={7} onSetRating={setMovieRating}/>
//       <p>{movieRating? `You have given this movie a rating of ${movieRating}` : "Give this movie a rating!"}</p>
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating />
    <StarRating
      size={24}
      color="blue"
      maxRating={5}
      messages={["awful", "not good", "ok", "pretty good", "great"]}
      defaultRating={3}
    />
    <Test /> */}
  </React.StrictMode>
);
