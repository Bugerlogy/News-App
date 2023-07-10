import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import bookMark from "./bookmark.svg";
import removeBookmark from "./removeBookmark.svg";
import newsIcon from "./news.png";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmark = (article) => {
    const updatedBookmarks = [...bookmarks, article];
    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  const handleRemoveBookmark = (article) => {
    const updatedBookmarks = bookmarks.filter(
      (item) => item.title !== article.title
    );
    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  const saveBookmarks = (bookmarks) => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  const retrieveBookmarks = () => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/listArticles").then((res) => {
      setNews(res.data.articles);
    });
    retrieveBookmarks();
  }, []);

  return (
    <div>
      <div className="heading">
        <img src={newsIcon} alt="news" style={{ height: "70px" }} />
        <h4>
          Scroll Down To See BookMarks <img src={bookMark} alt="BookMark" />
        </h4>
      </div>
      <div className="container my-3">
        <div className="row text-center">
          {news.map((val) => {
            return (
              <div key={val?.id} className="col my-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={val?.urlToImage} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h6 className="card-title">{val?.title}</h6>

                    <p class="card-text">{val?.description}</p>

                    <div class="card-footer">
                      <div className="space-between">
                        <a href={val?.url} className="btn btn-primary">
                          Details
                        </a>
                        {bookmarks.some(
                          (bookmark) => bookmark.title === val?.title
                        ) ? (
                          <div>
                            <img
                              src={removeBookmark}
                              alt="BookMark"
                              onClick={() => handleRemoveBookmark(val)}
                            />
                            <h6>Remove BookMark</h6>
                          </div>
                        ) : (
                          <div>
                            <img
                              src={bookMark}
                              alt="BookMark"
                              onClick={() => handleBookmark(val)}
                            />
                            <h6>Add BookMark</h6>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="container my-5">
          <h2>Bookmarks</h2>

          <div className="row text-center">
            {bookmarks[0] ? (
              bookmarks.map((bookmark) => (
                <div key={bookmarks?.id} className="col my-3">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={bookmark?.urlToImage}
                      className="card-img-top"
                      alt=""
                    />
                    <div className="card-body">
                      <h6 className="card-title">{bookmark?.title}</h6>

                      <p className="card-text">{bookmark?.description}</p>

                      <div class="card-footer">
                        <div className="space-between">
                          <a href={bookmark?.url} className="btn btn-primary">
                            Details
                          </a>
                          <div>
                            <img
                              src={removeBookmark}
                              alt="BookMark"
                              onClick={() => handleRemoveBookmark(bookmark)}
                            />
                            <h6>Remove BookMark</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>
                Click <img src={bookMark} alt="BookMark" /> To Add Into BookMark
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
