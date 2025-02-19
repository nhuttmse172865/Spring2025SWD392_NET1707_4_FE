import React from 'react'
import Item from '../item/Item'

const Body = ({listTitle}) => {
  return (
    <div className='bg-white rounded-[.375rem] mt-1 scroll-hidden overflow-x-hidden p-0.5 flex flex-col gap-2.5'
    style={{ height: "calc(100vh - 184px - 3.5rem" }}
    >   
        <Item listTitle={listTitle} />
        <Item listTitle={listTitle} />
        <Item listTitle={listTitle} />
        <Item listTitle={listTitle} />
        <Item listTitle={listTitle} />
        <Item listTitle={listTitle} />
        <Item listTitle={listTitle} />
        <Item listTitle={listTitle} />
    </div>
  )
}

export default Body