import { createContext, useContext, useState } from "react";
import Axios from "axios";

export const TweetContext = createContext();

export function useTweetContext() {
    return useContext(TweetContext);
}

export default function TweetContextProvider({ children }) {
    const [tweetsList, setTweetsList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorsFromServer, setErrorsFromServer] = useState({})
    const serverUrl = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';
    // const serverUrl = 'http://localhost:8080/pets';
    const getDataFromServer = async () => {
        try {
            const res = await Axios.get(serverUrl);
            console.log(res);
            setTweetsList(res.data.tweets ? res.data.tweets : [])
            // console.log(res);
        } catch (err) {
            console.log(err.response.data)
        }
    }

    const handleSubmit = async (tweet) => {
        setIsLoading(true);
        try {
            await Axios.post(serverUrl, tweet)
            setTweetsList((prevTweetList) => [tweet, ...prevTweetList])
        } catch (err) {
            setErrorsFromServer(err.response.data);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <TweetContext.Provider value={{
            isLoading,
            handleSubmit,
            errorsFromServer,
            tweetsList,
            getDataFromServer
        }}>
            {children}
        </TweetContext.Provider>
    );
}