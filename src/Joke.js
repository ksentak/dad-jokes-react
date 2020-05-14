import React, { Component } from 'react';

import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <div className='Joke'>
        <div className='JokeButtons'>
          <i className='fas fa-arrow-up' onClick={this.props.upvote} />
          <span className='JokeVotes'>{this.props.votes}</span>
          <i className='fas fa-arrow-down' onClick={this.props.downvote} />
        </div>
        <div className='JokeText'>{this.props.text}</div>
        <div className='JokeSmiley'>
          <i className='em em-rolling_on_the_floor_laughing' />
        </div>
      </div>
    );
  }
}

export default Joke;
