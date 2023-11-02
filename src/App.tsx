import React from 'react';
import GraphPlotter from './GraphPlotter';

const App: React.FC = () => {
  const data = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]; // Example data for the graph

  return (
    <div className="App">
      <GraphPlotter/>
    </div>
  );
};

export default App;
