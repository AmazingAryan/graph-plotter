import React, { useState } from 'react';

// this code doesnt uses an external library
type GraphPlotterProps = {
  width: number;
  height: number;
};

const GraphPlotter: React.FC<GraphPlotterProps> = ({ width, height }) => {
  const [functionString, setFunctionString] = useState('');
  const [data, setData] = useState<number[]>([]);

  const handleFunctionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionString(event.target.value);
  };

  const handlePlotGraph = () => {
    try {
      const parsedFunction = new Function('x', `return ${functionString}`);
      const newData: number[] = [];
      for (let x = -10; x <= 10; x++) {
        newData.push(parsedFunction(x));
      }
      setData(newData);
    } catch (error) {
      console.error('Invalid function:', error);
    }
  };

  const plotPath = data.map((y, index) => `${index * (width / 20)},${height / 2 - y}`).join(' ');

  return (
    <div className="GraphPlotter">
      <div>
        <input type="text" value={functionString} onChange={handleFunctionChange} placeholder="Enter a function" />
        <button onClick={handlePlotGraph}>Plot Graph</button>
      </div>
      <svg width={width} height={height}>
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="black" />
        <line x1={width / 2} y1="0" x2={width / 2} y2={height} stroke="black" />
        <polyline points={plotPath} fill="none" stroke="blue" />
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <GraphPlotter width={400} height={300} />
    </div>
  );
};

export default App;
