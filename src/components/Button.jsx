
const styles = {
    border: '2px black solid',
    padding: '1rem',
    borderRadius: '10rem',
    cursor: 'pointer'
}

const Button = () => {
    const [buttonClick, setButtonClick] = useState(null);

    return (
        <p
            style={{ ...styles, border: buttonClick === 1 ? "" : "2px black solid" }}
            onMouseDown={() => {
            setButtonClick(1);
            }}
            onMouseUp={() => {
            setButtonClick(null);
            }}
        >
            Exit game
        </p>
    )
};

export default Button;
