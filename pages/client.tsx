import useSWR from "swr";
import clientStyles from "@/styles/ClientSideFetching.module.css";
import styled from "styled-components";

interface Recipe {
  id: number;
  name: string;
}

const fetcher = (url: string): Promise<Recipe[]> =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.recipes.map(({ id, name }: Recipe) => ({ id, name })));

export default function ClientSideFetching() {
  const { data, error } = useSWR<Recipe[]>(
    "https://dummyjson.com/recipes?limit=10",
    fetcher
  );

  if (error)
    return <p className="text-red-500 text-center">Failed to load data.</p>;
  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className={`${clientStyles.heading} text-2xl font-semibold mb-4`}>
        Client-side Fetched Data
      </h1>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

// Styled-components table
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
`;
