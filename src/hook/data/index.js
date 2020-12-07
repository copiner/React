import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import { useDataApi } from "./action"

function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, setUrl] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );

  console.log(data)
  return (
    <Fragment>
      <form
        onSubmit={event => {
          setUrl(
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          );

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
