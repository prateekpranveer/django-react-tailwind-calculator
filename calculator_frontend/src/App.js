import React, { useState } from 'react';
import './App.css';


function App() {
  // State to manage the user input expression
  const [expression, setExpression] = useState('');
  // State to store the calculation result
  const [result, setResult] = useState('');


  // Function to handle button click events and update the expression
  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value);
  };


  // Function to clear the last character from the expression
  const clear = () => {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }


  // Function to clear the entire expression
  const clearAll = () => {
    setExpression('');
  }


  // Function to handle the calculation when the '=' button is clicked
  const handleCalculate = async () => {
    try {
      // Sending a POST request to the server for calculation
      const response = await fetch('http://127.0.0.1:8000/calculate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });
      // Parsing the response and updating the result state
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };


  // JSX for rendering the Calculator App
  return (
    <div className="App max-w-3xl mx-auto">
      <div>
        <h1 className='mt-4 mb-4'>Django + React + TailwindCSS Calculator</h1>
        <div className='border border-b-2 p-12 relative rounded-md shadow-sm'>
          {/* Input field to display the expression */}
          <input
            type="text"
            value={expression}
            className="absolute focus:outline-none left-10 text-lg"
          />
          {/* Buttons for Clear and Clear All actions */}
          <div className='flex space-x-4 absolute bottom-4 right-4'>
            <button onClick={clear} className='bg-red-400 text-sm text-white border rounded-full px-4 py-2'>Clear</button>
            <button onClick={clearAll} className='bg-red-400 text-sm text-white border rounded-full px-4 py-2'>Clear All</button>
          </div>
          {/* Displaying the result */}
          <div className='absolute top-3 right-6'>
            <h1>{result}</h1>
          </div>
        </div>
      </div>
      {/* Grid layout for the calculator buttons */}
      <div className="grid grid-cols-4 gap-10 border bg-gray-300 rounded-md p-12 shadow-xl">
        {/* Mapping buttons for digits and operators */}
        {[7, 8, 9, '/'].map((value) => (
          <button className='border p-4 bg-white rounded-full' key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[4, 5, 6, '*'].map((value) => (
          <button className='border p-4 bg-white rounded-full' key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[1, 2, 3, '-'].map((value) => (
          <button className='border p-4 bg-white rounded-full' key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[0, '.', '=', '+'].map((value) => (
          // Special styling for the '=' button
          <button className={`${value === '=' && 'border-red-300 border-8'} border p-4 bg-white rounded-full`}
            key={value}
            onClick={value === '=' ? handleCalculate : () => handleButtonClick(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}


export default App;