import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';


const useStyles = makeStyles({
    root: {
        maxWidth: 410,
    },
    media: {
        height: 200,
    },
    header: {
        textAlign: "center",
        textTransform: "uppercase",
        color: "white",
        backgroundColor: "black",
        padding: "10px",

    },
    button: {
        backgroundColor: "black",
        color: "white",
        textTransform: "uppercase",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
        },
    },
    table: {
        backgroundColor: "black",
        color: "white",
        textTransform: "uppercase",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
        },
    },

});

const SelectGame = () => {
    const classes = useStyles();
    const history = useNavigate();

    const [colorScore, setColorScore] = useState([]);
    const [numberScore, setNumberScore] = useState([]);


    useEffect(() => {
        axios.post("/get_score", { email: localStorage.getItem("email") })
            .then((res) => {
                console.log(res.data);
                setColorScore(res.data['color']);
                setNumberScore(res.data['number']);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            backgroundColor: "black",
        }}>
            <div>
                <Typography variant="h4" className={classes.header}>
                    Select Game
                </Typography>
            </div>

            <div style={{ flexWrap: "inherit", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia

                            className={classes.media}
                            image="https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Numbers Game
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                A user is given 5 seconds to look at a series of digits, and must recall the digits on a line.
                                Each time he passes, the game adds an additional digit. If the user guesses incorrectly,
                                they lose a life. A user is given 3 lives, and if he loses all three, game is over.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="large" color="primary" className={classes.button} onClick={() => history('/num_game2')}>
                            Play
                        </Button>
                    </CardActions>
                </Card>

                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia

                            className={classes.media}
                            image="https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Color Game
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                The other game shows a series of colors.
                                The user must recall the colors by inputting on a line each name of the color followed by a comma.
                                If I get 4 images (red, green, blue, black),
                                I must repeat these colors back to the user on a command line followed by a comma.
                                User has 20 seconds to type the answers
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="large" color="primary" className={classes.button} onClick={() => history('/color_game2')}>
                            Play
                        </Button>
                    </CardActions>
                </Card>

                <Card style={{ width: '40%' }}>
                    <CardActionArea>
                        <TableContainer component={Paper} style={{ overflow: "scroll", maxHeight: "30rem", }} align="center">
                            <Table sx={{ minWidth: 150, maxHeight: 300 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="center">Number Game Scores</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody >
                                    {numberScore.map((score) => (
                                        <TableRow key={score}>
                                            <TableCell align="center">{score}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardActionArea>
                </Card>
                <Card style={{ width: '40%' }}>
                    <CardActionArea>
                        <TableContainer component={Paper} style={{ overflow: "scroll", maxHeight: "30rem", }} align="center">
                            <Table sx={{ minWidth: 150, maxHeight: 300 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="center">Color Game Scores</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {colorScore.map((score) => (
                                        <TableRow key={score}>
                                            <TableCell align="center">{score}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardActionArea>
                </Card>


            </div >
        </div >
    );
}

export default SelectGame;





