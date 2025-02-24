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

  if (error) return <p>Failed to load data.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 className={clientStyles.heading}>Client-side Fetched Data</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
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
    padding: 8px;
  }
  th {
    background-color: #f4f4f4;
  }
`;
