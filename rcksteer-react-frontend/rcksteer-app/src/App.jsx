import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import './App.css';

const App = () => {
  const [logs, setLogs] = useState({});
  const [depth, setDepth] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload-las/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      setDepth(data.DEPT);
      setLogs(data);
      setError(null);
    } catch (err) {
      setError('Failed to upload file');
    }
  };

  useEffect(() => {
    const logKeys = Object.keys(logs).filter(log => log !== 'DEPT' && log !== 'wellInfo');
    if (logKeys.length === 0) return;

    const firstLogKey = logKeys[0];
    const firstLogData = logs[firstLogKey];

    const svg = d3.select('#chart');
    svg.selectAll('*').remove(); // Clear existing content

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const yScale = d3.scaleLinear()
      .domain([d3.min(depth), d3.max(depth)])
      .range([0, height]);

    const logData = firstLogData.filter(value => !isNaN(value));
    const xScale = d3.scaleLinear()
      .domain([d3.min(logData), d3.max(logData)])
      .range([0, width]);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .call(d3.axisLeft(yScale));

    g.append('path')
      .datum(logData.map((value, index) => ({ depth: depth[index], value })))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => xScale(d.value))
        .y(d => yScale(d.depth))
      );
  }, [logs, depth]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="file" onChange={handleFileChange} />
      <svg id="chart" width={1000} height={600}></svg>
    </div>
  );
};

export default App;
