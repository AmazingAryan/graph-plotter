import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js';

type GraphPlotterProps = {
  data: number[];
};

const GraphPlotter: React.FC<GraphPlotterProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map((_, index) => index.toString()),
            datasets: [
              {
                label: 'Graph',
                data,
                borderColor: 'blue',
                fill: false,
              },
            ],
          },
        });
      }
    }
  }, [data]);

  return <canvas ref={canvasRef} />;
};

const App: React.FC = () => {
  const [functionString, setFunctionString] = useState('');
  const [data, setData] = useState<number[]>([]);

  const handleFunctionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionString(event.target.value);
  };

  const handlePlotGraph = () => {
    try {
      const parsedFunction = new Function('x', `return ${functionString}`);
      const newData: number[] = [];
      for (let x = 0; x <= 10; x++) {
        newData.push(parsedFunction(x));
      }
      setData(newData);
    } catch (error) {
      console.error('Invalid function:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <input type="text" value={functionString} onChange={handleFunctionChange} placeholder="Enter a function" />
        <button onClick={handlePlotGraph}>Plot Graph</button>
      </div>
      <GraphPlotter data={data} />
    </div>
  );
};

export default App;
