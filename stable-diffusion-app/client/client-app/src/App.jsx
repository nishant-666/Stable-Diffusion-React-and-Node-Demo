import React, { useState } from "react";
import Loading from "./Loader";
import "./App.css";

const App = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});

  async function sendDescription() {
    try {
      const request = await fetch("http://localhost:4000/api", {
        method: "POST",
        body: JSON.stringify({
          prompt: description,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const res = await request.json();
      if (res.message) {
        //👇🏻 update the loading and result states
        setLoading(false);
        setResult(res.result);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDescription();
    setDescription("");
    setLoading(true);
  };
  if (loading) return <Loading />;
  return (
    <div className="app">
      <h1>Image Variation Generator</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="description">Enter the description</label>
        <textarea
          name="description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>GENERATE</button>
      </form>

      <div className="result__container">
        <div>
          {Object.values(result).length ? (
            <img
              src={`data:image/png;base64,${result?.logoImage}`}
              alt={result?.domainName}
              className="image"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
