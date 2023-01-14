import React, { useEffect, useState } from "react";
import "./App.scss";
import { NewsFeed } from "./model/app.model";
import Articles from "./components/articles";
import Pagination from "./components/pagination";

function App() {
  const [data, setData] = useState<NewsFeed[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const noOfPages = Math.ceil(data.length / recordsPerPage);

  //Fetching the data from json
  const getData = () => {
    fetch("data/capi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        //mapping only needed values
        const items: NewsFeed[] = responseData.results.map((item: any) => {
          return {
            id: item.id,
            headline: item.headline.default,
            date: item.date.created,
            standfirst: item.standfirst.default,
            canonicalLink: item.link.canonical,
            thumbnail: item.references[item.related.thumbnail.default[0]]
          };
        });
        setData(items);
      });
  };

  useEffect(getData, []);

  return (
    <div className="app-container">
      <h1>News</h1>
      <div className="news-feed-wrapper">
        <Articles data={currentRecords} />
      </div>
      <Pagination
        noOfPages={noOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
