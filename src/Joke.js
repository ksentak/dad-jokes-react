import React, { Component } from 'react';

class Joke extends Component {
  render() {
    return (
      <div className='Joke'>
        <div className='JokeButtons'>
          <i className='fas fa-arrow-up' onClick={this.props.upvote} />
          <span>{this.props.votes}</span>
          <i className='fas fa-arrow-down' onClick={this.props.downvote} />
        </div>
        <div className='JokeText'>{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
