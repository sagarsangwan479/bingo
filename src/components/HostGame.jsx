import React, { useEffect, useState } from "react";
import { apiCall } from "../apicall";
import { hostGameUrl } from "../endpoints";


const HostGame = () => {

    const [hostGameForm, setHostGameForm] = useState({
        name: '',
        gameCode: '',
        noOfPlayers: ''
    })

    const [formErrors, setFormErrors] = useState({
        name: [],
        gameCode: [],
        noOfPlayers: []
    })

    const handleFormValues = (e) => {
        setHostGameForm((prevState) => {return {...prevState, [e.target.name]: e.target.value} })
    }

    const submit = async (e) => {
        e.preventDefault();
        if(!hostGameForm.name || !hostGameForm.gameCode || !hostGameForm.noOfPlayers){
            alert('Fill all fields');
            return;
        }
        const host = await apiCall(hostGameUrl, hostGameForm);
        if(host && host.status == 'exists'){
            alert(host.message);
            return;
        }
        if(host && host.token){
            localStorage.setItem('token', host.token);
            localStorage.setItem('gameOngoing', 1);
            localStorage.setItem('ongoingGamePlayerName', hostGameForm.name)
            localStorage.setItem('ongoingGameCode', hostGameForm.gameCode)
            window.location.reload();
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="name">Your Name</label><br/>
                    <input type="text" id="name" name="name" onInput={handleFormValues} /><br/>
                    {formErrors.name.length > 0 && (
                        <span className="error-string">{formErrors.name[0]}</span>
                    )}
                </div><br/>

                <div>
                    <label htmlFor="gameCode">Create Game Code</label><br/>
                    <input type="text" id="gameCode" name="gameCode" onInput={handleFormValues} /><br/>
                    {formErrors.gameCode.length > 0 && (
                        <span className="error-string">{formErrors.gameCode[0]}</span>
                    )}
                </div><br/>

                <div>
                    <label htmlFor="noOfPlayers">Enter Number Of Players</label><br/>
                    <input type="number" id="noOfPlayers" name="noOfPlayers" onInput={handleFormValues} /><br/>
                    {formErrors.noOfPlayers.length > 0 && (
                        <span className="error-string">{formErrors.noOfPlayers[0]}</span>
                    )}
                </div><br/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default HostGame;