import { Button } from "@mui/material";
import React, { useMemo, useRef } from "react";
import { Tree } from "react-organizational-chart";
import { useSelectedNodeState, useTreeState } from "../contexts";
import { TreeNode, ChartDiv } from "./TreeNode";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import { Modal } from "@mui/material";

import { Portal } from "./Portal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "4px",
  overflow: "auto",
  maxHeight: "90vh",
};

export const TreePreviewModal = ({ open, handleClose }) => {
  const [treeState] = useTreeState();
  const [selectedNode] = useSelectedNodeState();

  const selectedLevelTree = useMemo(() => {
    const clone = { ...treeState };
    let currentNode = clone;
    selectedNode?.ancentors &&
      selectedNode.ancentors.forEach((node, i) => {
        if (i !== 0) {
          currentNode = currentNode.children[node];
        }
      });
    return currentNode;
  }, [treeState, selectedNode]);

  const treeContainerEl = useRef();

  const savePdf = () => {
    console.log(document.getElementById("tree-chart").innerHTML);
    html2canvas(document.getElementById("tree-chart")).then((canvas) => {
      const data = canvas.toDataURL();
      const pdfExportSetting = {
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [40, 60, 40, 60],
        content: [
          {
            image: data,
            width: treeContainerEl.current?.clientWidth || 500,
            height: treeContainerEl.current?.clientHeight || 500,
            overflow: "auto",
            keepAspectRatio: true,
            alignment: "center",
          },
        ],
      };
      pdfMake.createPdf(pdfExportSetting).download("family-tree.pdf");
    });
  };

  return (
    <Portal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div>
          <div style={style}>
            <div
              style={{
                height: "80vh",
                width: "34vw",
                overflowX: "scroll",
                overflowY: "scroll",
              }}
              id="tree-chart"
              ref={treeContainerEl}>
              <Tree label={<ChartDiv>{selectedLevelTree?.Name}</ChartDiv>}>
                {selectedLevelTree?.children &&
                  Object.values(selectedLevelTree.children).map((childNode) => (
                    <TreeNode key={childNode.id} node={childNode} />
                  ))}
              </Tree>
            </div>
            <Button onClick={savePdf}>Save PDF</Button>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
