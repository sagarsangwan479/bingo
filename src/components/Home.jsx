import React, { useState } from "react";
import HostGame from "./HostGame";
import JoinGame from "./JoinGame";

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

    const [hostGameActive, setHostGameActive] = useState(false);
    const [joinGameActive, setJoinGameActive] = useState(false);

    return (
        <div style={styles.topDiv}>
            <div style={styles.parentDiv}>
                <div style={styles.mainDiv}>
                    {!hostGameActive && (<p style={{...styles.mainDiv.button, border: hostButtonClick === 1 ? '' : '2px black solid'}} onMouseDown={() => { setHostButtonClick(1) }} onMouseUp={() => { setHostButtonClick(null); setHostGameActive(true); setJoinGameActive(false) }}>Host a game</p>)}
                    {!joinGameActive && (<p style={{...styles.mainDiv.button, border: joinButtonClick === 1 ? '' : '2px black solid'}} onMouseDown={() => { setJoinButtonClick(1) }} onMouseUp={() => { setJoinButtonClick(null); setJoinGameActive(true); setHostGameActive(false) }}>Join a game</p>)}
                </div>
            </div>

            {hostGameActive && (
                <HostGame />
            )}

            {joinGameActive && (
                <JoinGame />
            )}
        </div>
    )
}

export default Home;