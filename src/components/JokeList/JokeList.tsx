import React, { useState, useEffect } from 'react';
import Joke from '../Joke/Joke';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './JokeList.css';

interface Joke {
  id: string;
  text: string;
  votes: number;
}

const JokeList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jokes, setJokes] = useState<Array<Joke>>([]);
  const [seenJokes, setSeenJokes] = useState([]);

  const getJokes = async () => {
    try {
      let jokes = [];
      while (jokes.length < 10) {
        const res = await axios.get('https://icanhazdadjoke.com/');
        let { joke } = res.data;

        if (!seenJokes.has(joke)) {
          // setJokes(jokes => [...jokes,{ id: uuidv4(), text: joke, votes: 0 } ])
          jokes.push({ id: uuidv4(), text: joke, votes: 0 });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleVote = (id, delta) => {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  };

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
        <button className='JokeListButton' onClick={this.handleClick}>
          Fetch Jokes
        </button>
      </div>
      <div className='JokeListJokes'>
        {jokes.map((joke) => (
          <Joke
            key={joke.id}
            votes={joke.votes}
            text={joke.text}
            upvote={() => handleVote(joke.id, 1)}
            downvote={() => handleVote(joke.id, -1)}
          />
        ))}
      </div>
    </div>
  );
};

export default JokeList;
