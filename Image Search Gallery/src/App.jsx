import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import loadingGif from "./assets/loading__.gif";

function App() {
  const [imageList, setImageList] = useState([]);
  const [queryString, setQueryString] = useState("");

  const API = axios.create({
    baseURL: "https://api.unsplash.com/",
    // timeout: 1000,
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNPLASH_API_KEY}`,
    },
  });

  const getImageList = async () => {
    try {
      const res = await API.get("/photos");
      console.log(res.data);
      setImageList(res.data);
    } catch (error) {
      console.log(error);
      setImageList([]);
    }
  };

  const getQueryString = (e) => {
    setQueryString(e.target.value);
  };

  const searchImage = async () => {
    console.log(queryString);
    try {
      const res = await API.get(`/search/photos?query=${queryString}`);
      console.log(res.data);
      setImageList(res.data.results);
    } catch (error) {
      console.log(error);
      setImageList([]);
    }
    setQueryString("");
  };

  window.addEventListener("load", (event) => {
    getImageList();
  });

  window.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchImage();
    }
  });

  return (
    <div className="App">
      <div className="header mb-3 flex justify-center items-center gap-3">
        <button
          className="bg-red-500 p-2 rounded text-white cursor-pointer text-xs sm:text-base sm:p-3"
          onClick={() => getImageList()}
        >
          Get Random Images
        </button>
        <button
          className="bg-green-400 p-2 rounded text-gray-400 cursor-pointer text-xs sm:text-base sm:p-3"
          onClick={() => searchImage()}
        >
          Search
        </button>
        <input
          onChange={(e) => getQueryString(e)}
          className="rounded bg-gray-300 text-gray-500 outline-none p-2 text-xs sm:text-base sm:p-3"
          type="text"
          placeholder="Search for images"
        />
      </div>
      <div className="grid gap-3 xl:grid-cols-5 xl:gap-4">
        {imageList.length < 1 ? (
          <img
            src={loadingGif}
            alt="loading"
            className="grid col-end-4"
          />
        ) : (
          imageList.map((image, index) => (
            <div
              className="cursor-pointer"
              key={index}
              style={{
                // maxWidth: "100%",
                width: "auto",
                height: "auto",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={image.urls.full}
                alt=""
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
