import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WordDatabase() {
  const [key, setKey] = useState();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async (key) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/load_daily_top_1000/${key}`
      );

      const reversedResponse = response.data["response"]
      .slice(0)
      .reverse()
      .map(element => {
        return element;
      });
      setData(reversedResponse);
      console.log(typeof data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({target}) => {
    setKey(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!key) {
      getData(0);
    } else{
      getData(key);
    }
  }

  useEffect(() => {
    getData(882);
  }, [data]);

  return (
    <>
      <Link to={`/`}>Home</Link>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="type pk to load a different set of top 1000s"
          value ={key}
          onChange={handleChange}
        />
        <input 
          type="submit"
        />
      </form>

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data && data.map(word => (
          <li key={word.rank}>
            {word.rank} - {word.word} - {word.score}
          </li>
        ))}
      </ul>
    </>
  );
}