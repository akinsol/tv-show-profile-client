import {ApolloProvider, gql, useQuery} from "@apollo/client";
import Cast from './Cast';
import ShowRatings from './ShowRatings';
import '../stylesheets/Profile.css';
import React from "react";
import ReactDOM from "react-dom/client";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS, Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const root = ReactDOM.createRoot(document.getElementById('root'));

function Profile(props) {
    const showResult = gql`
        query GetShow($showId: Int!) {
            show(showId: $showId){
                title
                summary
                rating
                seasons {
                    number
                    rating
                }
            }
        }
    `;

    const showRatings = () => {
        root.render(
            <React.StrictMode>
                <ShowRatings client={props.client} season_numbers={data.show.seasons} trakt_id={props.trakt_id} />
            </React.StrictMode>
        )
    }

    const showCast = () => {
        root.render(
            <React.StrictMode>
                <ApolloProvider client={props.client}>
                    <Cast season_numbers={data.show.seasons} trakt_id={props.trakt_id} />
                </ApolloProvider>
            </React.StrictMode>,
        )
    }

    const {loading, error, data} = useQuery(showResult, {variables: {showId: props.trakt_id}});

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (
        <div id='profile'>
            <h1>{data.show.title}</h1>
            <h4>Rating: {data.show.rating}</h4>
            <p>{data.show.summary}</p>
            <h2>Charts</h2>
            <div id='charts'>
                <button onClick={showRatings}>RATINGS</button>
                <button onClick={showCast}>CAST</button></div>
        </div>
    )
}

export default Profile;