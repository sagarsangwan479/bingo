import { useState } from "react";
import { joinGameUrl } from '../endpoints';
import { apiCall } from '../apicall';

const JoinGame = () => {

    const [joinGameForm, setJoinGameForm] = useState({
        name: '',
        gameCode: ''
    })

    const [formErrors, setFormErrors] = useState({
        name: [],
        gameCode: []
    })

    const handleFormValues = (e) => {
        setJoinGameForm((prevState) => {return {...prevState, [e.target.name]: e.target.value} })
    }

    const submit = async (e) => {
        e.preventDefault();
        if(!joinGameForm.name || !joinGameForm.gameCode){
            alert('Fill all fields');
            return;
        }
        const host = await apiCall(joinGameUrl, joinGameForm);
        if(host && host.status == 'error'){
            alert(host.message);
            return;
        }
        if(host && host.token){
            localStorage.setItem('token', host.token);
            localStorage.setItem('gameOngoing', 1);
            localStorage.setItem('ongoingGamePlayerName', joinGameForm.name)
            localStorage.setItem('ongoingGameCode', joinGameForm.gameCode)
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
                    <label htmlFor="gameCode">Enter Game Code</label><br/>
                    <input type="text" id="gameCode" name="gameCode" onInput={handleFormValues} /><br/>
                    {formErrors.gameCode.length > 0 && (
                        <span className="error-string">{formErrors.gameCode[0]}</span>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default JoinGame;