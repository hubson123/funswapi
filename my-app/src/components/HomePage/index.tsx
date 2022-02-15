import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "../../globals";

export const HomePage = () => {
  const [starships, setStarships] = useState([]);
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
  return (
    <>
      <h1>Starships: </h1>
      <ul>
        {starships.map((starship: any, index: number) => (
          <li key={index}>{starship.name}</li>
        ))}
      </ul>

      {/* <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> */}
    </>
  );
};
