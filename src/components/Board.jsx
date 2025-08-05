import React, { useEffect, useState } from 'react';
import { apiCall } from '../apicall';
import { saveBoardData } from '../endpoints';


const Board = () => {

    const [firstRenderDone, setFirstRenderDone] = useState(false);

    const startingNumber = 1;
    const numberOfRows = 5;
    const numberOfColumns = 5;
    const [chosenNumbersArr, setChosenNumbersArr] = useState([]);
    const [dataArr, setDataArr] = useState([]);
    const [reload, setReload] = useState(1);
    const [bingoCounter, setBingoCounter] = useState(0);
    const [arrayOfBingoCombinations, setArrayOfBingoCombinations] = useState([]);
    const [totalNumberOfBingoCombinations, setTotalNumberOfBingoCombinations] = useState(0);

    const styles = {
        mainDiv: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        bingoCounterDiv: {
            self: {
                marginRight: '2rem',
                width: '4rem',
                display: 'flex',
                flexDirection: 'column'
            },
            bingoCounterNumber: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4c004c',
                color: 'white',
                marginBottom: '1rem',
                height: '5rem',
                borderRadius: '1rem',
                // width: '8rem',
                // marginLeft: 'auto',
                // marginRight: 'auto'
                spanElement: {
                    fontSize: 'x-large'
                }
            }
        },
        parentDiv: {
            display: 'grid',
            gridTemplateColumns: `repeat(${numberOfColumns}, 5rem)`,
            gridTemplateRows: `repeat(${numberOfRows}, 5rem)`,
            gap: '2rem 2rem',
            border: '5px solid #d7cdcd',
            padding: '1rem',
            borderRadius: '2rem'
        },
        numberDiv: {
            // height: '2rem',
            // width: '2rem',
            // backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
        },
        buttonElement: {
            color: 'white',
            backgroundColor: '#0077b6',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '19px',
            marginLeft: '86px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
        }
    }

    const createRandomNumberArr = (start, end) => {
        let numberArr = [];
        while(numberArr.length < end){
            const randomNumber = Math.floor((Math.random() * end) + 1);
            if(!numberArr.includes(randomNumber)){
                numberArr.push(randomNumber);
            }
        }

        return numberArr;
    }

    const createArr = () => {
        const randomNumberArr = createRandomNumberArr(startingNumber, numberOfRows * numberOfColumns);

        let arr = randomNumberArr.map((value) => {
            return {
                number: value,
                color: 'pink'
            }
        })

        setDataArr(arr);
        setBingoCounter(0);
        createArrOfBingoCombinations([...arr]);
        localStorage.setItem('dataArr', JSON.stringify(arr));
        localStorage.setItem('chosenNumbersArr', JSON.stringify(chosenNumbersArr));
        localStorage.setItem('areItemsChosen', chosenNumbersArr.length);
        localStorage.setItem('bingoCounter', 0);
    } 

    const createArrOfBingoCombinations = (data) => {
        let tempArr = [];
        for(let i = 0; i < numberOfColumns * numberOfRows; i = i + 5){

            let y = i;
            let arr = [];
            while(y < numberOfColumns + i){
                arr.push(data[y].number);
                y++;
            }

            tempArr.push(arr);
        }

        for(let i = 0; i < numberOfColumns; i++){

            let y = i;
            let arr = [];
            while(y < numberOfColumns * numberOfRows){
                arr.push(data[y].number);
                y = y + numberOfColumns;
            }

            tempArr.push(arr);
        }

        let primaryDiagonalArr = [];
        let secondaryDiagonalArr = [];
        for(let i = 0; i < numberOfColumns; i++){
            primaryDiagonalArr.push(data[i * (numberOfColumns + 1)].number);
            secondaryDiagonalArr.push(data[(i + 1) * (numberOfColumns - 1)].number);
        }
        tempArr.push(primaryDiagonalArr, secondaryDiagonalArr);

        setArrayOfBingoCombinations(tempArr);
        setTotalNumberOfBingoCombinations(tempArr.length);
        localStorage.setItem('bingoCombinations', JSON.stringify(tempArr));1
    }

    const choseNumber = (chosenNumber) => {
        const newDataArr = dataArr.map((item) => {
            return {
                number: item.number,
                color: (item.number === chosenNumber && item.color === 'pink') ? 'skyblue' : item.color
            };
        })

        setChosenNumbersArr((prevState) => [...prevState, chosenNumber])

        setDataArr(newDataArr);
        localStorage.setItem('dataArr', JSON.stringify(newDataArr));
    }

    const newGame = () => {
        localStorage.removeItem('dataArr');
        localStorage.removeItem('bingoCombinations');
        localStorage.removeItem('chosenNumbersArr');
        localStorage.removeItem('areItemsChosen');
        localStorage.removeItem('bingoCounter');

        setChosenNumbersArr([]);
        if(reload == 1){
            setReload(2);
        } else {
            setReload(1);
        }
    }


    const checkSubArr = (subArr, chosenNumbersArr) => {
        const result = subArr.every(element => chosenNumbersArr.includes(element));
        return result;
    }

    const saveData = async () => {
        const data = {
            dataArr: localStorage.getItem('dataArr'),
            bingoCombinations: localStorage.getItem('bingoCombinations'),
            chosenNumbersArr: localStorage.getItem('chosenNumbersArr'),
            bingoCounter: localStorage.getItem('bingoCounter'),
            areItemsChosen: localStorage.getItem('areItemsChosen'),
            gameCode: localStorage.getItem('ongoingGameCode')
        }
        const save = await apiCall(saveBoardData, data);
    }

    useEffect(() => {
    
        if(localStorage.getItem('areItemsChosen') && localStorage.getItem('areItemsChosen') > 0){
            setDataArr(JSON.parse(localStorage.getItem('dataArr')));
            setArrayOfBingoCombinations(JSON.parse(localStorage.getItem('bingoCombinations')));
            setChosenNumbersArr(JSON.parse(localStorage.getItem('chosenNumbersArr')));
            setBingoCounter(localStorage.getItem('bingoCounter'));
            saveData();
        } else {
            createArr();
            saveData();
        }
    
        return () => {
            localStorage.removeItem('dataArr');
            localStorage.removeItem('bingoCombinations');
            localStorage.removeItem('chosenNumbersArr');
            localStorage.removeItem('areItemsChosen');
            localStorage.removeItem('bingoCounter');
        }
    }, [reload]);

    useEffect(() => {
        if(firstRenderDone === true){
            // localStorage.setItem('bingoCounter', bingoCounter);
            if(bingoCounter === numberOfRows){
                alert("BINGO");
            }
        }
    
        if(firstRenderDone === false){
            setFirstRenderDone(true);
        }
    }, [bingoCounter]);
    
    
    useEffect(() => {
        localStorage.setItem('chosenNumbersArr', JSON.stringify(chosenNumbersArr));
        localStorage.setItem('areItemsChosen', chosenNumbersArr.length);
    
        const fulfilledSubArrays =  arrayOfBingoCombinations.filter(subArr => checkSubArr(subArr, chosenNumbersArr));
        setBingoCounter(fulfilledSubArrays.length);
        localStorage.setItem('bingoCounter', fulfilledSubArrays.length);
        if(firstRenderDone === true){
            saveData();
        }
    }, [chosenNumbersArr])

    return (
        <div style={styles.mainDiv}>
            <div style={styles.bingoCounterDiv.self}>
                <div style={styles.bingoCounterDiv.bingoCounterNumber}>
                    <span style={styles.bingoCounterDiv.bingoCounterNumber.spanElement}>{bingoCounter}</span>
                </div>
            </div>
            <div style={styles.parentDiv}>
                {dataArr.map((item) => (
                    <div key={item.number} style={{...styles.numberDiv, backgroundColor: `${item.color}`, cursor: `${!chosenNumbersArr.includes(item.number) ? 'pointer' : ''}`}}onClick={() => {
                        if(!chosenNumbersArr.includes(item.number) && bingoCounter < numberOfRows){
                            choseNumber(item.number);
                        }
                    }}>
                    <span>{item.number}</span>
                </div>
                ))}
            </div>
            {/* <button style={styles.buttonElement} onClick={newGame}>New Game</button> */}
        </div>
    )
}

export default Board;