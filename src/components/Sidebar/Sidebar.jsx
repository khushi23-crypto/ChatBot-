import React from 'react'
import './Sidebar.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaPlus, FaRegMessage } from 'react-icons/fa6'
import { useState } from 'react'
function Sidebar() {
    const[open,setOpen]=useState(false)
    return (
        <div className='sidebar'>
            <GiHamburgerMenu id='ham'onClick={()=>{
                setOpen(!open)
            }}/>
            <div className="newchat" >
                <FaPlus />
                {open?<p>New Chat</p>:""}
            </div>
            <div className="recent">
                <FaRegMessage/>
                {open?<p>who are you?</p>:""}
            </div>
        </div>
    )
}

export default Sidebar