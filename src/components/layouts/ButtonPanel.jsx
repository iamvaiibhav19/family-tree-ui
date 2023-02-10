import React from 'react'
import { PrintFamilyTreeBtn } from '../Buttons/PrintFamilyTreeBtn'
import { AddFamilyBtn } from '../Buttons/AddFamilyBtn'
import { ExportFamilyBtn } from '../Buttons/ExportFamilyBtn'
import { ImportFamilyBtn } from '../Buttons/ImportFamilyBtn';
export const ButtonPanel = () => {

  return (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: "auto auto",
            width: '100%',
            height:"90px",
            gap: '20px',
            padding: '5px'
        }}
        className="box-container"
    >
        <AddFamilyBtn/>
        <PrintFamilyTreeBtn/>
        <ImportFamilyBtn/>
        <ExportFamilyBtn/>
    </div>
  )
}