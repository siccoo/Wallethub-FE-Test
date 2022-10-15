/**
 * In the following React template, display an unordered list (UL) with list items (LI) within it. 
 * The content of each list item should contain two spans (SPAN), one with the name and the other with the age passed in to the DataList function. 
 * The span elements should be separated by a single space.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  data: {
    name: string;
    age: number;
  }[];
}

function DataList(props: Props) {
  const { data } = props
  return (
    <ul>
      {data?.map(({ name, age }) => (
        <li key={name}>
          <span>{name}</span>&nbsp;<span>{age}</span>
        </li>
      ))}
    </ul>
  );
}

const data = [
  { name: 'Daniel', age: 25 },
  { name: 'John', age: 24 },
  { name: 'Jen', age: 31 },
];

ReactDOM.render(
  <DataList data={data} />,
  document.getElementById('test-01')
);