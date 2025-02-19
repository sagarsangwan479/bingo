import React, { useEffect, useState } from "react";
import { apiCall } from "../apicall";
import jwt from 'jsonwebtoken';
import { hostGameUrl } from "../endpoints";


const HostGame = () => {

    const [hostGameForm, setHostGameForm] = useState({
        name: '',
        gameCode: '',
        noOfPlayers: ''
    })

    const handleFormValues = (e) => {
        setHostGameForm((prevState) => {return {...prevState, [e.target.name]: e.target.value} })
    }

    const submit = async (e) => {
        e.preventDefault();
        // console.log('dddd')
        // return;
        // const token = jwt.sign({ foo: 'bar' }, 'nnjbdw909090123908^^', { algorithm: 'HS256' });
        const token = jwt.sign({ foo: 'bar'},'hjojjhewhew', {algorithm: 'ES256'});
        console.log(token)
        // const host = await apiCall(hostGameUrl, hostGameForm, token);
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label htmlFor="name">Your Name</label><br/>
                <input type="text" id="name" name="name" onInput={handleFormValues} /><br/><br/>

                <label htmlFor="gameCode">Create Game Code</label><br/>
                <input type="text" id="gameCode" name="gameCode" onInput={handleFormValues} /><br/><br/>

                <label htmlFor="noOfPlayers">Enter Number Of Players</label><br/>
                <input type="number" id="noOfPlayers" name="noOfPlayers" onInput={handleFormValues} /><br/><br/>

                {/* <button type="submit">Submit</button> */}
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default HostGame;