import React from "react";
import { NewsFeed } from "../model/app.model";
import moment from "moment";

function Articles(props: { data: NewsFeed[] }) {
  return (
    <>
      {props.data.map(item => (
        <article key={item.id} className="news-feed">
          <h2 className="title">
            <a href={item.canonicalLink}>{item.headline}</a>
          </h2>
          <span className="date">
            {moment(item.date).format("MMMM Do YYYY, h:mm:ss A")}
          </span>
          <div className="content">
            <a href={item.canonicalLink}>
              <img
                width={item.thumbnail.width}
                height={item.thumbnail.height}
                src={item.thumbnail.link.media}
                alt={item.headline}
              />
            </a>

            <span
              className="standfirst"
              dangerouslySetInnerHTML={{ __html: item.standfirst }}
            />
          </div>
        </article>
      ))}
    </>
  );
}
export default Articles;
