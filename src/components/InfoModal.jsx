import React, { useState, useEffect } from "react";
import axios from "axios";

const InfoModal = () => {
  const [open, setOpen] = useState(false);
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    axios.get('/api/get_tiers')
    .then(response => {
      console.log(response);
      setTiers(response.data);
    })
    .catch(err => {
      console.log(err.response);
    });
  }, []);

  return (
    <div className="fixed transition-all" style={{"right": open ? "0" : "-350px"}}>
      <div className="flex">
        <button
          className="bg-cardbg p-5 rounded-l-full text-2xl font-bold hover:bg-secondary"
          onClick={() => setOpen(!open)}
        >
          {open ? <p> 〉</p> : <p>〈</p>}
        </button>

          <div className="bg-cardbg p-10 text-center w-[350px]">
            <h1 className="text-xl">本日の上位ランキング</h1>
            <br />
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-md text-center text-h1">
                <thead className="bg-secondary">
                  <th className="px-6 py-3">ランキング</th>
                  <th className="px-6 py-3">スコア</th>
                </thead>
                  {tiers &&
                <tbody>
                  {tiers.map((tier) => (
                    <tr className="bg-background border-t border-cardbg">
                      <td className="px-6 py-3">{tier.tier}</td>
                      <td className="px-6 py-3">{tier.score}</td>
                    </tr>

                  ))}
                  
                 
                </tbody>
              }
              </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default InfoModal;
