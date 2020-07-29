import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Offers = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [page, setpage] = useState(1);

  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      console.log(process.env);
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          `/offer/with-count?page=${page}&limit=${limit}&title=${title}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <div>
      {isLoading === true ? (
        <p>Chargement en cours</p>
      ) : (
        <>
          <main>
            <Search setData={setData} title={title} setTitle={setTitle} />
            <div id="offersContent">
              {data.offers.map((offer) => {
                return (
                  <Link key={offer._id} to={"/offer/" + offer._id}>
                    <div className="offers">
                      <div className="offersImg">
                        {offer.picture.secure_url && (
                          <img
                            src={offer.picture.secure_url}
                            alt={offer.title}
                          />
                        )}
                      </div>
                      <div className="offersElement">
                        <div>
                          <h2>{offer.title}</h2>
                          <p className="price">{offer.price} €</p>
                        </div>
                        <div>
                          <p className="created">{offer.created}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div>
                <Pagination
                  count={data.count}
                  limit={limit}
                  setpage={setpage}
                />
              </div>
            </div>
          </main>
          )
        </>
      )}
    </div>
  );
};

export default Offers;
