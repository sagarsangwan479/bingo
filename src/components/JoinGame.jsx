import React, { useState } from "react";

const JoinGame = () => {

    const [joinGameForm, setJoinGameForm] = useState({
        name: '',
        gameCode: ''
    })

    return (
        <div>
            <form>
                <label htmlFor="name">Your Name</label><br/>
                <input type="text" id="name" name="name" /><br/><br/>

                <label htmlFor="gameCode">Enter Game Code</label><br/>
                <input type="text" id="gameCode" name="gameCode" /><br/><br/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default JoinGame;