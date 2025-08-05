import { useEffect, useState } from "react";
import HostGame from "./HostGame";
import JoinGame from "./JoinGame";
import Board from "./Board";
import { apiCall } from "../apicall";
import { exitGame } from "../endpoints";

const styles = {
    topDiv: {
        height: '90vh'
    },
    parentDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 'x-large',

        button: {
            border: '2px black solid',
            padding: '1rem',
            borderRadius: '10rem',
            cursor: 'pointer'
        }
    }
}

const Home = () => {

    const [hostButtonClick, setHostButtonClick] = useState(null);
    const [joinButtonClick, setJoinButtonClick] = useState(null);
    const [exitButtonClick, setExitButtonClick] = useState(null);

    const [hostGameActive, setHostGameActive] = useState(false);
    const [joinGameActive, setJoinGameActive] = useState(false);

    const [gameHostedOrJoined, setGameHostedOrJoined] = useState(false);

    const handleExitButtonClick = async () => {
        const exit = await apiCall(exitGame, { gameCode: localStorage.getItem('ongoingGameCode') });

        localStorage.removeItem('token');
        localStorage.removeItem('gameOngoing');
        localStorage.removeItem('ongoingGamePlayerName');
        localStorage.removeItem('ongoingGameCode');
        localStorage.removeItem('dataArr');
        localStorage.removeItem('bingoCombinations');
        localStorage.removeItem('chosenNumbersArr');
        localStorage.removeItem('areItemsChosen');
        localStorage.removeItem('bingoCounter');

        window.location.reload();
    }

    useEffect(() => {
        if(localStorage.getItem('gameOngoing') == 1){
            setGameHostedOrJoined(true);
        }
    }, [])

    return (
        <div style={styles.topDiv}>
            <div style={styles.parentDiv}>
                <div style={styles.mainDiv}>
                    {!gameHostedOrJoined && !hostGameActive && (<p style={{...styles.mainDiv.button, border: hostButtonClick === 1 ? '' : '2px black solid'}} onMouseDown={() => { setHostButtonClick(1) }} onMouseUp={() => { setHostButtonClick(null); setHostGameActive(true); setJoinGameActive(false) }}>Host a game</p>)}

                    {!gameHostedOrJoined && !joinGameActive && (<p style={{...styles.mainDiv.button, border: joinButtonClick === 1 ? '' : '2px black solid'}} onMouseDown={() => { setJoinButtonClick(1) }} onMouseUp={() => { setJoinButtonClick(null); setJoinGameActive(true); setHostGameActive(false) }}>Join a game</p>)}

                    {gameHostedOrJoined && (
                        <p style={{...styles.mainDiv.button, border: exitButtonClick === 1 ? '' : '2px black solid'}} onMouseDown={() => { setExitButtonClick(1) }}
                        onMouseUp={() => { setExitButtonClick(null); handleExitButtonClick() }}>Exit game</p>
                    )}
                </div>
            </div>

            {!gameHostedOrJoined && hostGameActive && (
                <HostGame />
            )}

            {!gameHostedOrJoined && joinGameActive && (
                <JoinGame />
            )}

            {gameHostedOrJoined && (
                <Board />
            )}
        </div>
    )
}

export default Home;