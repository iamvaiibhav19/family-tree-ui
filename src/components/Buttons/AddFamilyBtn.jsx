import { Button, Modal } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { AddFamilyModalView } from '../AddFamilyModalView';
import {style} from './Button';
import "./style.css"
export const AddFamilyBtn = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
 
  console.log(style);
  return (
    <>
      <Button sx={style} className="xyz"  variant="contained" component="label" onClick={handleOpen} >
        Add Family
      </Button>
      
      <AddFamilyModalView open={open} setOpen={setOpen} />
      
    </>
  )
}
