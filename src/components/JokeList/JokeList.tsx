import React, { useState, useEffect } from 'react';
import Joke from '../Joke/Joke';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './JokeList.css';

interface IJoke {
  id: string;
  text: string;
  votes: number;
}

const JokeList: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [jokes, setJokes] = useState<IJoke[]>(
    JSON.parse(window.localStorage.getItem('jokes')!) || []
  );

  const getJokes = async () => {
    try {
      for (let i = 0; i < 10; i++) {
        const res = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        const { joke } = res.data;

        const newJoke: IJoke = await {
          id: uuidv4(),
          text: joke,
          votes: 0
        };

        setJokes((jokes) => [...jokes, newJoke]);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleVote = async (id: string, delta: number) => {
    await setJokes(
      jokes.map((joke) => {
        return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke;
      })
    );
  };

  const handleClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (jokes.length === 0) {
      getJokes();
    }
    if (isLoading) {
      getJokes();
    }
  }, [isLoading]);

  useEffect(() => {
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
  }, [jokes]);

  return (
    <>
      {isLoading ? (
        <div className='JokeListSpinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='JokeListTitle'>Loading...</h1>
        </div>
      ) : (
        <div className='JokeList'>
          <div className='JokeListSidebar'>
            <h1 className='JokeListTitle'>
              <span>Dad</span> Jokes
            </h1>
            <img
              src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
              alt='emoji face'
            />
            <button className='JokeListButton' onClick={handleClick}>
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
      )}
    </>
  );
};

export default JokeList;
