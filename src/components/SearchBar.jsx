import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { LayoutHeader } from './LayoutHeader'
import {SearchFamily} from '../utils/search.js';
import './SearchBar.css';
import "./style.css";
import { useSelectedNodeState, useTreeState,useFilteredIdState,useSearchTextState } from "../contexts";
export default function SearchBar(props) {
    const [treeState, setTreeDataState] = useTreeState()

    const [filteredId,setFilteredIdState]= useFilteredIdState();

    const [searchText,setSearchTextState]= useFilteredIdState();

    const contains = (text, searchText) => {
        console.log(text,"THIS IS WHAT I AM SEARCHING FOR ",searchText, "type of",typeof(searchText));
        if(text===undefined||searchText===undefined)return true;
        return ( (text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) || searchText===" ");
    }
    

    const searchLogicReverse=(searchText)=>{
            

        console.log("THIS IS THE UPDATED SEARCH TERM",searchText);
           
           
            var filtered = new Set();

            //true means it shold not add to the set
            //false means it shsould
            const recur=(family)=>{
               
                if(family==='undefined')return false;

                console.log("RECURSION HAPPENING ",family);

                const id=family.id;
                
               
                var containChild=true;

                    if (contains(family.Name, searchText)) {
            
                        containChild=false;
                       
                    }

                    if (family?.children) {
                 
                        console.log(Object.entries(family.children),"CHILLDREN of",family.Name);

                        for( const [key,val] of Object.entries(family.children)){
                            console.log("INSIDE ",val);
                            containChild&=recur(val);
                        }
                       
                        
                       
                    }
                    if(containChild){
                      
                        filtered.add(id);
                        
                    }
                    
                   
                    return containChild;
                   
                    
            }
            const ret=recur(treeState);
           
            setFilteredIdState(filtered);
           
            return filtered;
            
            
        
    }
    
    console.log("THIS IS THE SEARCH TERM HERE IN COL",searchText);
   
    const handleFilter=(e)=>{
        setSearchTextState(e.target.value);
        searchLogicReverse(e.target.value);
    }

 

    return (
        <>
            <LayoutHeader header={'Family Tree'} />
            
           
          
              
            <input  id="input" className="search"  type="text" placeholder='Search Family Member' onChange={handleFilter}/>
          
           

        </>
    )
}
