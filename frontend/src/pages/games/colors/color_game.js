import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';


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


const ColorGame = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    const colors_arr = ["red", "blue", "green", "yellow", "orange", "brown", "purple",
        "pink", "black", "white", "grey", "cyan", "magenta", "lime",
        "maroon", "navy", "olive", "teal", "aqua", "fuchsia"];


    const [time, setTime] = useState(5);
    const [guessTime, setGuessTime] = useState(20);
    const [colors, setColors] = useState(colors_arr);

    const [color1, setColor1] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const [color2, setColor2] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const [color3, setColor3] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const [color4, setColor4] = useState(colors[Math.floor(Math.random() * colors.length)]);

    const [colorInput, setColorInput] = useState("");


    const timer = () => {
        setTime(time - 1);
    }

    const guessTimer = () => {
        setGuessTime(guessTime - 1);
    }

    useEffect(() => {
        if (time > 0) {
            if (time === 5) {
                setGuessTime(20);
            }
            setTimeout(timer, 1000);
        } else {
            if (guessTime > 0) {
                setTimeout(guessTimer, 1000);
            }
            else {
                handleRematch("Times Up! Do you want to play again?");
            }
        }
    }, [time, guessTime]);

    const handleReset = () => {
        setTime(5);
        setColor1(colors[Math.floor(Math.random() * colors.length)]);
        setColor2(colors[Math.floor(Math.random() * colors.length)]);
        setColor3(colors[Math.floor(Math.random() * colors.length)]);
        setColor4(colors[Math.floor(Math.random() * colors.length)]);
        setColorInput("");
    }

    const handleRematch = (msg) => {
        if (window.confirm(msg)) {
            handleReset();
        } else {
            navigate("/select_game");
        }
    }

    const handleColorSubmit = (e) => {
        e.preventDefault();
        let colorInput_arr = colorInput.split(",").map((item) => item.trim());
        if (colorInput_arr.length === 4) {
            if (colorInput_arr[0] === color1 && colorInput_arr[1] === color2
                && colorInput_arr[2] === color3 && colorInput_arr[3] === color4
            ) {
                handleRematch("Congratulations! You Won.\n Do you want to play again?");
            } else {
                handleRematch("You lost! Do you want to play again?");
            }
        } else {
            alert("You must enter four colors!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h1>Color Game</h1>
            </div>
            <div className={classes.body}>
                <div className={classes.gameText}>
                    <h1>{time > 0 ? time : guessTime}</h1>
                </div>
            </div>
            {time > 0 ?
                <div className={classes.body}>
                    <div className={classes.gameText}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ backgroundColor: color1, width: "100px", height: "100px", margin: "10px" }}></div>
                            <div style={{ backgroundColor: color2, width: "100px", height: "100px", margin: "10px" }}></div>
                            <div style={{ backgroundColor: color3, width: "100px", height: "100px", margin: "10px" }}></div>
                            <div style={{ backgroundColor: color4, width: "100px", height: "100px", margin: "10px" }}></div>
                        </ div>
                    </div>
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

export default ColorGame;



