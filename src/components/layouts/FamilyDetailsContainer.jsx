import { red } from "@mui/material/colors";
import { borderRadius } from "@mui/system";
import React, { useEffect } from "react";
import { useSelectedNodeState } from "../../contexts";
import { initialFamilyInfoState } from "../../utils";
import { LayoutHeader } from "../LayoutHeader";
import "./style.css";

const Label = ({ label, value }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px",
        width: "100%",
      }}
      className="row">
      <div
        style={{
          minWidth: "25%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="field1">
        {label} <span>:</span>
      </div>
      {label !== "Family Photo" ? (
        <div style={{ marginLeft: "8px" }} className="field2">
          {value}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            fontSize: "20px",
            height: "170px",
            // border: "1px solid #718093",
            maxWidth: "600px",
            overflowX: "auto",
            marginLeft: "8px",
          }}>
          {value?.map((src) => (
            <img
              src={src}
              alt={"Family"}
              key={src}
              style={{
                width: "150px",
                height: "130px",
                marginLeft: "18px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FamilyDetails = React.memo(() => {
  const [selectedNode] = useSelectedNodeState();

  console.log("selected node default", selectedNode);

  useEffect(() => {
    console.log("selected node", selectedNode);
  }, [selectedNode]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        fontSize: "20px",
        height: "90%",
        overflowY: "auto",
        scrollbarColor: "#1D222B #718093",
      }}>
      <div className="container-details">
        {selectedNode &&
          [
            ...[
              "Name",
              "Spouse",
              "Location",
              "Birth Year",
              "Present Address",
              ...Object.keys(selectedNode).filter((key) => {
                return (
                  key !== "Name" &&
                  key !== "Spouse" &&
                  key !== "Location" &&
                  key !== "Birth Year" &&
                  key !== "Present Address" &&
                  key !== "ancentors" &&
                  key !== "children" &&
                  key !== "id"
                );
              }),
            ],
            selectedNode["Family Photo"]
              ? [
                  <Label
                    key="familyPhoto"
                    label="Family Photo"
                    value={selectedNode["Family Photo"]}
                  />,
                ]
              : [],
          ]
            .filter((key) => {
              return (
                (selectedNode[key] !== undefined || key === "Family Photo") &&
                key !== "ancentors" &&
                key !== "children" &&
                key !== "id"
              );
            })
            .map((key) => {
              if (
                !key ||
                (key === "Family Photo" && !selectedNode["Family Photo"])
              ) {
                return null;
              }
              const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <>
                  {selectedNode[key] !== undefined && (
                    <Label
                      key={key}
                      label={capitalizedKey}
                      value={selectedNode[key]}
                    />
                  )}
                </>
              );
            })}
      </div>
    </div>
  );
});

export const FamilyDetailsContainer = () => {
  return (
    <div className="box-details">
      <LayoutHeader style={{ marginTop: "12px" }} header={"Family Details"} />

      <FamilyDetails />
    </div>
  );
};
