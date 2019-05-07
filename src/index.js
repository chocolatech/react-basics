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

class TweetForm extends React.Component {

  state = {
    text: ''
  }

  // static propTypes = {
  //   onSubmit: PropTypes.func.isRequired
  // }
  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }
  handleSubmit = () => {
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={text} />
        <br />
        <button onClick={this.handleSubmit}>Tweetuj!</button>
        {text && <p>Podgląd: {text}</p>}
      </div>
    )
  }
}

class TweetApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: this.props.tweets
    }
  }

  addTweet = (text) => {
    const newTweet = {
      id: this.state.tweets.length + 1,
      user: {
        name: "Bartosz Szczeciński",
        handle: "btmpl"
      },
      date: new Date(),
      text: text
    }

    this.setState((state) => ({
      tweets: [newTweet, ...state.tweets]
    }));
  }

  render() {
    return (
      <div>
        <TweetForm onSubmit={this.addTweet} />
        <TweetList tweets={this.state.tweets} />
      </div>
    )
  }
}
ReactDOM.render(<TweetApp tweets={TweetData} />, document.getElementById('root')); 