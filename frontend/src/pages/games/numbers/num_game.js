// A user is given 5 seconds to look at a series of digits, and must recall the digits on a line. 
// Each time he passes, the game adds an additional digit. If the user guesses incorrectly, they lose a life. 
// A user is given 3 lives, and if he loses all three, game is over.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';


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
        fontSize: "300px",
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
        height: "10%",
    }

});

const NumGame = () => {

    const classes = useStyles();
    const history = useNavigate();
    const [time, setTime] = useState(5);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [digits, setDigits] = useState([]);
    const [guess, setGuess] = useState("");
    const [randomDigit, setRandomDigit] = useState(0);
    const [originalDigits, setOriginalDigits] = useState([]);

    const timer = () => {
        setTime(time - 1);
    }

    useEffect(() => {
        if (time > 0) {
            if (time === 5) generateRandomNumber();
            const interval = setInterval(timer, 1000);
            return () => clearInterval(interval);
        } else {
            setRandomDigit(digits);
            var digits_length = String(digits[0]).length;
            setOriginalDigits(Array(digits_length).fill('_'));
            setDigits([]);
        }

    }, [time]);


    const generateRandomNumber = () => {
        setDigits([...digits, Math.floor(Math.random() * 100000)]);
    }

    const handleGuess = (e) => {
        e.preventDefault();
        let randomDigitArray = randomDigit.toString().split("");

        // get all the indexes where guess matches randomDigit, 
        // and replace the originalDigits with the guess
        let correct_guess = false;
        let count = 0;
        let originalDigitsArray = originalDigits;
        for (let i = 0; i < randomDigitArray.length; i++) {
            if (randomDigitArray[i] === guess) {
                randomDigitArray[i] = '%';
                originalDigitsArray[i] = guess;
                correct_guess = true;
                count++;
            }
        }

        setOriginalDigits(originalDigitsArray);

        // if the guess is correct, add 1 to score
        if (correct_guess) {
            setScore(score + count);
        } else {
            setLives(lives - 1);
        }

        randomDigitArray = randomDigitArray.join("");
        setRandomDigit(randomDigitArray);

        setGuess("");

        // if the user has guessed all the digits they WIN, generate a new random number
        if (randomDigitArray === "%%%%%") {
            handleRematch("Congratulations! \nYou WIN! Would you like to play again?");
            // handleRestart(e);
        }
        // if the user has no lives left, game over
        else if (lives === 0) {
            handleRematch("Game Over! \nYou have no lives left. Would you like to play again?");
            // handleRestart(e);
        }

    }

    const handleRestart = () => {
        // e.preventDefault();
        setScore(0);
        setLives(3);
        setDigits([]);
        setTime(5);
    }

    const handleRematch = (msg) => {
        if (window.confirm(msg)) {
            handleRestart();
        } else {
            history("/select_game");
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
                        <h1 className={classes.header}>Time: {time}</h1>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '15%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <h1 className={classes.header}>Score: {score}</h1>
                            <h1 className={classes.header}>Lives: {lives}</h1>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h1" className={classes.gameText}>
                            {time > 0 ? digits.join("") : originalDigits.join(" ")}
                        </Typography>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "45%" }}>
                    <div className={classes.input}>
                        <input
                            type="text"
                            value={guess}
                            className={classes.inputTextBox}
                            placeholder="Enter single digit, and press check"
                            onChange={(e) => setGuess(e.target.value)}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%" }}>
                        <div style={{ paddingRight: '1%' }}>
                            <Button variant="contained" className={classes.button} color="success" onClick={handleRestart}>
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
            </div>
        </>
    )
}

export default NumGame;