import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Board from './components/Board';
import Home from './components/Home';

const root = createRoot(document.getElementById('root'));

const App = () => {

    return (
        // <Board />
        <Home />
    )
}

root.render(<App />);