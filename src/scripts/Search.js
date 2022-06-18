import {ApolloProvider, gql, useQuery} from "@apollo/client";
import {IoArrowBackCircle} from "react-icons/io5";
import Profile from './Profile'
import React from "react";
import ReactDOM from "react-dom/client";
import '../stylesheets/Search.css';
import App from "./App";

function Search(props) {

    // const goBack = () => {
    //     let div = ReactDOM.createRoot(document.getElementById('root'));
    //     div.render(
    //         <React.StrictMode>
    //             <App />
    //         </React.StrictMode>
    //     );
    // }

    const searchResults = gql`
        query GetSearchResults($search: String!) {
            results(search: $search){
                traktId
                title
            }
        }
    `;

    const displayProfile = (id) => {
        let root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <ApolloProvider client={props.client}>
                    <Profile trakt_id={id} client={props.client }/>
                </ApolloProvider>
            </React.StrictMode>
        )
    }

    const {loading, error, data} = useQuery(searchResults, {variables: {search: props.search}});

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error! </p>

    return(
        <div id='results'>
            {/*<IoArrowBackCircle onClick={goBack}/>*/}
            <h2>Select a show: </h2>
            {data.results.map((result) =>
                <button onClick={() => displayProfile(result.traktId)}>{result.title}</button>
            )
            }
        </div>
    )
}

export default Search;