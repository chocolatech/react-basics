import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const TweetTime = (props) => {
  const date = `${props.date.getDate()} ${props.date.toLocaleString('pl-pl', { month: "long" })}`;
  return <time>{date}</time>
}
TweetTime.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired
};

const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
TweetUser.defaultProps = {
  name: 'Anonim'
};

class Tweet extends React.Component {
  static propTypes = {
    tweet: PropTypes.shape({
      user: PropTypes.shape({
        handle: PropTypes.string,
        name: PropTypes.string,
      }),
      date: PropTypes.instanceOf(Date).isRequired,
      text: PropTypes.string.isRequired
    })
  } 

  render() {
    const { user, text, date } = this.props.tweet;
    return (
      <div>
        <TweetUser name={user.name} handle={user.handle} /> -
        <TweetTime date={date} />
        <p>
          {text}
        </p>
      </div>
    )
  }
}

const TweetData = [{
  id: 1,
  user: {
    name: "Bartosz Szczeciński",
    handle: "btmpl"
  },
  date: new Date(),
  text: "Witaj świecie!"
}, {
  id: 2,
  user: {
    name: "Bartosz Szczeciński",
    handle: "btmpl"
  },
  date: new Date(),
  text: "To jest mój prywatny Twitter!"
}];
     

const TweetList = ({ tweets }) => {                
  return (
    <>
      {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
    </>
  );
}   
TweetList.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.object)
}

ReactDOM.render(<TweetList tweets={TweetData}/>, document.getElementById('root'));