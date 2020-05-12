import React, { Component } from 'react';
import axios from 'axios';

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

    console.log(jokes);
  }
  render() {
    return (
      <div className='JokeList'>
        <h1>Jokes</h1>
      </div>
    );
  }
}

export default JokeList;
