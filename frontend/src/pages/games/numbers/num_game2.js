// // A user is given 5 seconds to look at a series of digits, and must recall the digits on a line.
// // Each time he passes, the game adds an additional digit. If the user guesses incorrectly, they lose a life. 
// // A user is given 3 lives, and if he loses all three, game is over.



/////////////////////////////////////////////////////////////////

// create a game that generates a random number and the user has to guess the number
// the user has 3 lives and if they guess the number correctly, they get a point, and increment the number of digits by 1
// if they guess the number incorrectly, they lose a life
// if they run out of lives, the game is over and they can restart the game
// if they guess the number correctly, the game continues and the number of digits increases by 1



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { Popup } from 'semantic-ui-react';
import axios from "axios";


const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#202020",
    },
    media: {
        width: "100%",
        height: "30vh",
        backgroundImage: "url(https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        width: "100%",
        height: "10vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    },
    header: {
        fontFamily: "monospace",
        fontSize: "2rem",
        textAlign: "center",
        textTransform: "uppercase",
        color: "white",
        backgroundColor: "#202020",
        paddingTop: "50px",
        paddingInline: "50px",
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "black",
        color: "white",
        textTransform: "uppercase",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
        },
    },
    buttonDiv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "5%",
    },
    text: {
        fontFamily: "monospace",
        fontSize: "30px",
        color: "white",
    },
    gameText: {
        fontFamily: "monospace",
        fontSize: "150px",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        color: "white",
    },
    body: {
        backgroundColor: "#202020",
        color: "white",
    },
    timer: {
        fontFamily: "monospace",
        fontSize: "50px",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#202020",
    },
    submit: {
        backgroundColor: "#202020",
        color: "white",
        textTransform: "uppercase",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
        },
    },
    inputTextBox: {
        fontFamily: "monospace",
        fontSize: "20px",
        width: "60%",
        height: "100%",
        margin: "10px",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    input: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: "50px",
        height: "20%",
    }

});

const NumGame2 = () => {

    const classes = useStyles();
    const history = useNavigate();
    const [time, setTime] = useState(5);
    const [guessTime, setGuessTime] = useState(0);
    const [score, setScore] = useState(1);
    const [lives, setLives] = useState(3);
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 10 ** score));
    const [userInput, setUserInput] = useState("");
    const [isRight, setIsRight] = useState(true);


    const timer = () => {
        setTime(time - 1);
    }

    const guessTimer = () => {
        setGuessTime(guessTime - 1);
    }

    // create a timer that counts down from 5 seconds to 0
    // and then gives user 20 seconds to input their answer
    useEffect(() => {
        // for first 5 seconds, show the number
        // for the next 20 seconds, show the input box, and keep decreasing the time
        if (time > 0) {
            if (time === 5) {
                setGuessTime(20);
            }
            setTimeout(timer, 1000);
        } else if (time === 0) {
            // if (lives === 0) {
            //     // show popup that says game over
            //     handleRematch("Game Over\nDo you want to play again?");
            // }
            if (guessTime > 0) {
                setTimeout(guessTimer, 1000);
            } else if (guessTime === 0) {
                setLives(lives - 1);
                setIsRight(false);
                setTime(5);
            }
        }

        if (lives === 0) {
            // show popup that says game over
            handleRematch("Game Over\nDo you want to play again?");
        }
    }, [time, guessTime, lives]);



    const generateRandomNumber = (len) => {
        setRandomNum(Math.floor(Math.random() * 10 ** len));
    }

    const handleGuess = (e) => {
        e.preventDefault();
        if (userInput == randomNum) {
            const curr_score = score + 1;
            setScore(score + 1);
            setGuessTime(0);
            setTime(5);
            generateRandomNumber(curr_score);
            setIsRight(true);
        } else {
            setIsRight(false);
            setLives(lives - 1);
            setTime(5);
            setGuessTime(0);
            generateRandomNumber(score);
        }
        setUserInput("");

        if (lives === 0) {
            // show popup that says game over
            handleRematch("Game Over\nDo you want to play again?");
        }
    }

    const handleRestart = () => {
        setScore(1);
        setLives(3);
        setTime(5);
        setGuessTime(0);
        setIsRight(true);
        generateRandomNumber(1);  // generate a random number of length 1
    }

    const handleRematch = (msg) => {

        // add an api call to update the score in the database
        axios.post("/add_score", {
            email: localStorage.getItem("email"),
            score: score,
            game: "number"
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })


        if (window.confirm(msg)) {
            handleRestart();
        } else {
            history("/select_game");
        }
    }

    const showPopup = () => {
        if (true) {
            return (
                <Popup
                    title="Game Over"
                    text="Do you want to play again?"
                    handleRematch={handleRematch}
                />
            );
        }
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.media}></div>
                <div className={classes.title}>
                    <h1 className={classes.header}>Numbers Game</h1>
                </div>

                <div style={{ padding: '1%', paddingTop: '1%' }}>

                    <div className={classes.title}>
                        <h1 className={classes.header}>Time: {time > 0 ? time : guessTime}</h1>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '15%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <h1 className={classes.header}>Score: {score}</h1>
                            <h1 className={classes.header}>
                                <l style={isRight ? { color: "white" } : { color: "red" }}>Lives: {lives}</l>
                            </h1>
                        </div>
                    </div>
                </div>
                {time > 0 ?
                    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "45%" }}>
                        < div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h1" className={classes.gameText}>
                                {randomNum}
                            </Typography>
                        </div>
                    </div>
                    :
                    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "80%" }}>
                        <div className={classes.input}>
                            <input
                                type="text"
                                value={userInput}
                                className={classes.inputTextBox}
                                placeholder="Enter single digit, and press check"
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%" }}>
                            <div style={{ paddingRight: '1%' }}>
                                <Button variant="contained" className={classes.button} color="success" onClick={showPopup}>
                                    Restart
                                </Button>
                            </div>
                            <div style={{ paddingLeft: '1%' }}>
                                <Button variant="contained" className={classes.button} color="success" onClick={handleGuess}>
                                    Check
                                </Button>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default NumGame2;



