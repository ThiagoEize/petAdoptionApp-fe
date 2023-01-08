import * as moment from 'moment';
const Tweet = ({ tweet }) => {
  return (
    <>
      <div id={tweet.id} className="tweet-card">
        <div className="upper-footer">
          <div className="username-display">
            <small>{tweet.userName}</small>
          </div>
          <div className="date-display">
            <small>{tweet.date}</small>
          </div>
        </div>
        <div className="tweet-body">
          <p className="tweet-text">
            {tweet.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default Tweet;