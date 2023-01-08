import Tweet from "./Tweet";
import { useTweetContext } from "../context/TweetContext";
import { Col, Row } from 'react-bootstrap';

const TweetList = () => {
  const { tweetsList } = useTweetContext();
  return (
    <div className="tweet-list">
      <Row>
        {tweetsList.map((tweet) => (
          <Col xs={6} md={6} lg={6} key={tweet.id} className="tweet-row">
            <Tweet tweet={tweet} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TweetList;