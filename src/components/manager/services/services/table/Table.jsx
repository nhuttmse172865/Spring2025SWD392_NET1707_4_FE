import React from 'react'
import Header from '../../../../common/table/header/Header';
import Body from './body/Body';

const listTitle = [
    {
      name: "No.",
      column: 0.5,
    },
    {
      name: "Name",
      column: 1.5,
    },
    {
      name: "Category",
      column: 2,
    },
    {
      name: "Description",
      column: 3,
    },
    {
      name: "Issue Skin",
      column: 2,
    },
    {
      name: "Skin Type",
      column: 1.5,
    },
    {
      name: "Therapist",
      column: 1,
    },
    {
      name: "",
      column: 0.5,
    },
  ];

const Table = () => {
  return (
    <div className='mt-5'>
        <Header listTitle={listTitle} />
        <Body listTitle={listTitle} />
    </div>
  )
}

export default Table