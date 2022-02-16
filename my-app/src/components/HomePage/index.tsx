import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { API_URL } from "../../globals";
import { Character, Starship } from "../../types/types";

const HomePage = () => {
  const [starships, setStarships] = useState<Starship[]>();
  const [people, setPeople] = useState<Character[]>();
  const [randomStar, setRandomStar] = useState(0);
  const [randomStar2, setRandomStar2] = useState(1);
  const [game, setGame] = useState(false);
  const [multiplayer, setMultiplayer] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleOnePlayerClick = () => {
    setGame(true);
    setRandomStar(getRandomInt(0, 6));
    setRandomStar2(getRandomInt(1, 9));
  };

  const handleTwoPlayersClick = () => {
    setGame(true);
    setMultiplayer(true);
    setRandomStar(getRandomInt(0, 6));
    setRandomStar2(getRandomInt(1, 9));
  };

  const fetchData = () => {
    fetch(`${API_URL}starships/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setStarships(data.results));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const whoWins = () => {
    if (starships !== undefined && game) {
      if (multiplayer) {
        if (
          parseInt(starships[randomStar].crew) >
          parseInt(starships[randomStar2].crew)
        ) {
          setPlayerScore(playerScore + 1);
          return `Player 1 wins!`;
        } else if (
          parseInt(starships[randomStar].crew) <
          parseInt(starships[randomStar2].crew)
        ) {
          setPlayerTwoScore(playerTwoScore + 1);
          return `Player 2 wins!`;
        } else {
          return `Draw`;
        }
      } else {
        if (
          parseInt(starships[randomStar].crew) >
          parseInt(starships[randomStar2].crew)
        ) {
          return `Starship ${starships[randomStar].name} wins!`;
        } else if (
          parseInt(starships[randomStar].crew) <
          parseInt(starships[randomStar2].crew)
        ) {
          return `Starship ${starships[randomStar2].name} wins!`;
        } else {
          return `Draw`;
        }
      }
    }
  };
  return (
    <>
      <h1>Minigame with Star Wars</h1>
      <h1>Choose the number of players: </h1>
      <Button size="medium" onClick={() => handleOnePlayerClick()}>
        1 player
      </Button>
      <Button size="medium" onClick={() => handleTwoPlayersClick()}>
        2 players
      </Button>
      <GameWrapper>
        {game && (
          <>
            {starships !== undefined && (
              <StarshipCard>
                <h2>{starships[randomStar].name}</h2>
                <p>{starships[randomStar].cargo_capacity}</p>
                <p>{starships[randomStar].passengers}</p>
                <p>{starships[randomStar].starship_class}</p>
                <p>{starships[randomStar].max_atmosphering_speed}</p>
                <p>{starships[randomStar].crew}</p>
              </StarshipCard>
            )}

            {starships !== undefined && (
              <Card
                sx={{
                  minWidth: 375,
                  backgroundColor: "transparent",
                  border: "2px dashed yellow",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    color="yellow"
                    fontFamily={"Starjout"}
                  >
                    {starships[randomStar2].name}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="yellow"
                    fontFamily={"Starjout"}
                  >
                    {starships[randomStar2].cargo_capacity}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="yellow"
                    fontFamily={"Starjout"}
                  >
                    {starships[randomStar2].passengers}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="yellow"
                    fontFamily={"Starjout"}
                  >
                    {starships[randomStar2].starship_class}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="yellow"
                    fontFamily={"Starjout"}
                  >
                    {starships[randomStar2].max_atmosphering_speed}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="yellow"
                    fontFamily={"Starjout"}
                  >
                    {starships[randomStar2].crew}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </GameWrapper>
      {game && whoWins()}
      {multiplayer && (
        <>
          <Typography
            variant="h3"
            component="div"
            color="yellow"
            fontFamily={"Starjout"}
          >
            Score:
          </Typography>
          <Typography
            variant="h5"
            component="div"
            color="yellow"
            fontFamily={"Starjout"}
          >
            Player1: {playerScore}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            color="yellow"
            fontFamily={"Starjout"}
          >
            Player2: {playerTwoScore}
          </Typography>
        </>
      )}
      {game && (
        <Button
          size="medium"
          onClick={() =>
            multiplayer ? handleTwoPlayersClick() : handleOnePlayerClick()
          }
        >
          Play again
        </Button>
      )}
    </>
  );
};

export default HomePage;

const StarshipCard = styled.div`
  border-radius: 6px;
  border: 2px dashed yellow;
  dispaly: flex;
  min-width: 375px;
  padding: 10px;
`;

const GameWrapper = styled.div`
  display: flex;
  justify-content:center;
  gap 100px;
  padding: 50px;`;
