import React, { useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  return (
    <div className="homeContainer">
      <h1 className="text-center mt-4">Home</h1>
    </div>
  );
}

export default Home;
