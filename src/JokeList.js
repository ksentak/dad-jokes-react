import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  async componentDidMount() {
    // get jokes
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      jokes.push(res.data.joke);
    }
    this.setState({ jokes: jokes });
  }
  render() {
    return (
      <div className='JokeList'>
        <div className='JokeListSidebar'>
          <h1 className='JokeListTitle'>
            <span>Dad</span> Jokes
          </h1>
          <img
            src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
            alt='emoji face'
          />
          <button className='JokeListButton'>New Jokes</button>
        </div>
        <div className='JokeListJokes'>
          {this.state.jokes.map((j) => (
            <div>{j}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
