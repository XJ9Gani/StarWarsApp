import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TestRedux = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}`
      );
      const result = await response.json();
      setData(result.results);
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <h1>People</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person: any) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>
                <Link to={`/entity/${person.name}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TestRedux;
