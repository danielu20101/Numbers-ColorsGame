import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import axios from 'axios';


const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100vh',
        backgroundColor: "#202020",
    },
    media: {
        height: '100%',
    },
    header: {
        fontFamily: "monospace",
        textAlign: "center",
        textTransform: "uppercase",
        color: "white",
        backgroundColor: "#202020",
        padding: "50px",

    },
    button: {
        backgroundColor: "black",
        color: "white",
        textTransform: "uppercase",
        width: "10%",
        height: "100%",
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
    },
    gameText: {
        fontFamily: "monospace",
        fontSize: "20px",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",

    },
    body: {
        backgroundColor: "#202020",
        color: "white",
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


const ColorGame2 = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    const colors_arr = ["red", "blue", "green", "yellow", "orange", "brown", "purple",
        "pink", "black", "white", "grey", "cyan", "magenta", "lime",
        "maroon", "navy", "olive", "teal", "aqua", "fuchsia"];


    const [time, setTime] = useState(5);
    const [guessTime, setGuessTime] = useState(20);
    const [score, setScore] = useState(1);
    const [colors, setColors] = useState(colors_arr);
    const [counter, setCounter] = useState(0);

    const [colorList, setColorList] = useState([...Array(score)].map(() => colors[Math.floor(Math.random() * colors.length)]));
    const [color1, setColor1] = useState(colorList[0]);

    const [colorInput, setColorInput] = useState("");


    const timer = () => {
        setTime(time - 1);
    }

    const guessTimer = () => {
        setGuessTime(guessTime - 1);
    }

    useEffect(() => {
        // display each color in colorList for 5 seconds, and once all colors are displayed, start the guess timer
        if (time > 0) {
            if (time === 5) {
                setGuessTime(20);
            }
            setTimeout(timer, 1000);
        } else if (time === 0) {
            if (counter + 1 < colorList.length) {
                setColor1(colorList[counter + 1]);
                setCounter(counter + 1);
                setTime(5);
            } else {
                if (guessTime > 0) {
                    setTimeout(guessTimer, 1000);
                } else {
                    handleRematch("Game Over!\nDo you want to play again?");
                }
            }
        }
    }, [time, guessTime]);

    const handleReset = () => {
        var newColorList = [...Array(1)].map(() => colors[Math.floor(Math.random() * colors.length)]);
        setScore(1);
        setColors(colors_arr);
        setCounter(0);
        setColorList(newColorList);
        setColor1(newColorList[0]);
        setColorInput("");
        setTime(5);
        setGuessTime(20);
    }

    const handleRematch = (msg) => {

        axios.post("/add_score", {
            email: localStorage.getItem("email"),
            score: score,
            game: "color"
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        if (window.confirm(msg)) {
            handleReset();
        } else {
            navigate("/select_game");
        }
    }

    const handleColorSubmit = (e) => {
        e.preventDefault();
        let colorInput_arr = colorInput.split(",").map((item) => item.trim());

        // check the submitted colors against the colors in colorList
        let correct = true;
        if (colorInput_arr.length === colorList.length) {
            for (let i = 0; i < colorInput_arr.length; i++) {
                if (colorInput_arr[i] !== colorList[i]) {
                    correct = false;
                }
            }
        } else {
            correct = false;
        }

        if (correct) {
            var new_colorList = [...Array(score + 1)].map(() => colors[Math.floor(Math.random() * colors.length)]);
            setScore(score + 1);
            setColorList(new_colorList);
            setColor1(new_colorList[0]);
            setCounter(0);
            setTime(5);
            setColorInput("");
        }
        else {
            handleRematch("Incorrect! Play again?");
        }

    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h1>Color Game</h1>
            </div>
            <div className={classes.body}>
                <div className={classes.gameText}>
                    <p>Score: {score}</p>
                    <h1>{time > 0 ? time : guessTime}</h1>
                </div>
            </div>
            {time > 0 ?
                <div className={classes.body}>
                    <div className={classes.gameText}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ backgroundColor: color1, width: "800px", height: "500px", margin: "10px" }}></div>
                            {/* add color name here in the div */}
                        </ div>
                    </div>
                    <h1 className={classes.gameText}>{color1}</h1>
                </div>
                :
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <div className={classes.input}>
                        <input
                            type="text"
                            value={colorInput}
                            className={classes.inputTextBox}
                            placeholder="Enter four colors separated by commas"
                            onChange={(e) => setColorInput(e.target.value)}
                        />
                    </div>

                    <div className={classes.buttonDiv}>
                        <Button variant="contained" className={classes.button} color="success" onClick={handleColorSubmit}>
                            Check
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default ColorGame2;



