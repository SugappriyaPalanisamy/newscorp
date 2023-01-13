import React, { useEffect, useState } from "react";
import "./App.scss";
import { NewsFeed } from "./model/app.model";

function App() {
  const [data, setData] = useState<NewsFeed[]>([]);
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
            date: item.date.updated,
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
      {data.map(item => (
        <div key={item.id} className="news-feed">
          <span className="title">{item.headline}</span>
          <span>
            <img
              width={item.thumbnail.width}
              height={item.thumbnail.height}
              src={item.thumbnail.link.media}
              alt="African Buffalo "
            />
          </span>
          <span
            className="standfirst"
            dangerouslySetInnerHTML={{ __html: item.standfirst }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
