import { useState } from "react";
import { nanoid } from 'nanoid';
import { useTweetContext } from "../context/TweetContext";
import { useUserContext } from "../context/UserContext";

const TweetForm = ({ tweet = {} }) => {
  const { currentUserName } = useUserContext();

  const { isLoading } = useTweetContext();
  const { handleSubmit } = useTweetContext();
  const { errorsFromServer } = useTweetContext();

  const maxCharacters = 140;

  const [isAboveLimit, setIsAboveLimit] = useState(false);

  const [tweetContent, setTweetContent] = useState(tweet.content ? tweet.content : '');
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const changeTweetContent = (e) => {
    if (maxCharacters - e.target.value.length >= 0) {
      setTweetContent(e.target.value)
      setIsAboveLimit(false);
    } else {
      setIsAboveLimit(true);
    }
  }

  const resetForm = () => {
    setTweetContent('');
    // setIsSubmitted(false);
  }

  const handleClick = () => {
    const date = new Date();
    const formatedDate = date.toISOString();
    // setIsSubmitted(true);
    const tweetObj = {
      content: tweetContent,
      userName: currentUserName,
      date: tweet.date ? tweet.date : formatedDate,
      id: tweet.id || nanoid(),
    };
    if (tweetContent) {
      console.log(tweetObj);
      handleSubmit(tweetObj);
      resetForm();
    }
  }

  return (
    <>
      <div className="create-tweet">
        <div className="create-tweet-border">
          <textarea
            className="tweet-textarea"
            placeholder="What do you have in mind..."
            value={tweetContent}
            onChange={changeTweetContent}
          ></textarea>
          <div className="create-tweet-footer">

            <div className="create-tweet-message-box">
              <small>{maxCharacters - tweetContent.length}</small>
              {isLoading && <span className="loader"></span>}
              {isAboveLimit
                &&
                <span
                  className="warning-span"
                >
                  This tweet cannot contain more than {maxCharacters} characters
                </span>
              }
              {errorsFromServer
                &&
                <span
                  className="warning-span"
                >
                  {errorsFromServer.statusCode && 'Error Status ' + errorsFromServer.statusCode + ': ' + errorsFromServer.message}
                </span>
              }
            </div>

            <div className="tweet-button-area">
              <button
                className="tweet-button"
                disabled={isAboveLimit}
                onClick={handleClick}
              >
                {
                  tweet.id ?
                    'Update tweet'
                    :
                    'Create tweet'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetForm;
