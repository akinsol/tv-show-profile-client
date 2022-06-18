import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import Search from './Search'
import '../stylesheets/App.css';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    const [search, setSearch] = useState('');

    const getSearchResults = () => {
        if (search == '') {
            alert("Please enter a TV show.")
            return
        }
        root.render(
            <React.StrictMode>
                <ApolloProvider client={client}>
                    <Search search={search} client={client} />
                </ApolloProvider>
            </React.StrictMode>
        )
    }

    return (
        <div id='page'>
            <h1>TV Show Profile</h1>
            <div id='search'>
                <label for="search"> Search for a show: </label>
                <input name='search' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={getSearchResults}>SEARCH</button>
            </div>
        </div>
    );
}

export default App;
