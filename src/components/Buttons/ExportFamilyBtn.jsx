import React, { useState } from "react";
import { Button } from "@mui/material";
import { useSelectedNodeState, useTreeState } from "../../contexts";
import { style } from "./Button";
import "./style.css"

export const ExportFamilyBtn = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useTreeState();

  const selectedNode = useSelectedNodeState();

  const printToPdf = () => {
    handleOpen();
  };

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function onDownload() {
    const data = JSON.stringify(selectedNode[0]);
    delete data.ancentors;
    download(data, "FamilyTree.json", "text/plain");
  }
  return (
    <>
      <Button
        sx={style}
        variant="contained"
        component="label"
        className="xyz"
        onClick={(e) => onDownload()}>
        Export Json
      </Button>
    </>
  );
};
