import React from 'react'
import { ButtonPanel } from './ButtonPanel'
import { FolderStructure } from './FolderStructure'
import SearchBar from './../SearchBar.jsx';
import "./style.css"

export const SidePanel = () => {

    return (
        <div className="view">
            <div 
            className='box-tree'           
            >
                <SearchBar/>
                <FolderStructure/>
            </div>
         <ButtonPanel/>
        </div>
    )
}
