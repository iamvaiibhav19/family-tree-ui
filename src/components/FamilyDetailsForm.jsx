import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useAddFamily, initialFamilyInfoState } from "../utils";
import { useSearchTextState, useSelectedNodeState } from "../contexts";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#292F38",
  boxShadow: 24,
  maxHeight: "80%",
  overflowY: "auto",
  fontFamily: "Josefin Sans",
  p: 4,
};

export const FamilyDetailsForm = ({
  handleClose = () => {},
  edit,
  setEdit,
}) => {
  // console.log(isEdit, "isEdit");

  const {
    familyInfo,
    setFamilyInfoState,
    addFamily,
    onPicUpload,
    editFamily,
    deleteField,
    fields,
    setFields,
    setFamilyInfo,
    addDeletedField,
    addField,
    removeField,
  } = useAddFamily({
    initialFamilyInfoState,
    afterAdding: handleClose,
    afterEditing: handleClose,
  });

  const selectedNode = useSelectedNodeState();

  console.log(selectedNode, "selectedNode");

  if (edit) {
    console.log("isEdit");
    initialFamilyInfoState["Name"] = selectedNode[0]["Name"];
    initialFamilyInfoState["Family Photo"] = selectedNode[0]["Photo"];
    initialFamilyInfoState["Birth Year"] = selectedNode[0]["Birth Year"];
    initialFamilyInfoState["Location"] = selectedNode[0]["Location"];
    initialFamilyInfoState["Present Address"] =
      selectedNode[0]["Present Address"];
    initialFamilyInfoState["Spouse"] = selectedNode[0]["Spouse"];
  }

  const data = selectedNode?.length ? selectedNode[0] : familyInfo;

  const filteredData =
    data &&
    Object.keys(data)
      .filter(
        (key) => key !== "ancentors" && key !== "id" && key !== "children"
      )
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

  console.log(
    familyInfo,
    "familyInfo in 1st useEffect ----------------------======"
  );

  useEffect(() => {
    if (edit) {
      filteredData && setFamilyInfo(filteredData);
    }
    console.log(fields, "fields ----sadfaskdlfasdfasdfsdf");
  }, [selectedNode]);

  useEffect(() => {
    if (edit) {
      console.log(
        fields,
        "fields ***********************************************"
      );
    }
  }, [fields]);

  console.log(selectedNode, "selectedNode");

  return (
    <Box sx={style}>
      {edit ? (
        <form
          onSubmit={editFamily}
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Josefin Slab, serif",
            gap: "10px",
          }}>
          {[
            "Name",
            "Spouse",
            "Location",
            "Birth Year",
            "Present Address",
            ...Object.keys(familyInfo).filter(
              (key) =>
                key !== "Name" &&
                key !== "Spouse" &&
                key !== "Location" &&
                key !== "Birth Year" &&
                key !== "Present Address"
            ),
          ].map(
            (fieldKey, i) =>
              fieldKey !== "Family Photo" &&
              (familyInfo[fieldKey] || familyInfo[fieldKey] === "") && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <TextField
                    required
                    sx={{
                      width: "90%",
                      border: "1px solid #8F8A8A",
                      color: "#ffffff",
                      input: {
                        "&:focus": {
                          color: "#ffffff",
                          border: "1px solid #8F8A8A",
                        },
                        color: "#ffffff",
                      },
                    }}
                    label={fieldKey}
                    InputLabelProps={{
                      style: {
                        color: "#8F8A8A",
                      },
                    }}
                    name={fieldKey}
                    variant="outlined"
                    onChange={setFamilyInfoState}
                    value={familyInfo[fieldKey]}
                  />
                  <Button
                    onClick={() => {
                      deleteField(fieldKey);
                      addDeletedField(fieldKey);
                    }}>
                    <CloseIcon />
                  </Button>
                </div>
              )
          )}
          {
            //only show the fields if the user clicks on the add field button
            fields.map((field, index) => {
              return (
                <div key={index}>
                  <TextField
                    sx={{
                      border: "1px solid #8F8A8A",
                      color: "#ffffff",
                      input: {
                        "&:focus": {
                          color: "#ffffff",
                          border: "1px solid #8F8A8A",
                        },
                        color: "#ffffff",
                      },
                    }}
                    label="Field Name"
                    InputLabelProps={{
                      style: {
                        color: "#8F8A8A",
                      },
                    }}
                    name="fieldName"
                    variant="outlined"
                    onChange={(e) => {
                      const values = [...fields];
                      values[index][e.target.name] = e.target.value;
                      console.log(values, "values");
                      setFields(values);
                    }}
                  />
                  <TextField
                    sx={{
                      border: "1px solid #8F8A8A",
                      color: "#ffffff",
                      input: {
                        "&:focus": {
                          color: "#ffffff",
                          border: "1px solid #8F8A8A",
                        },
                        color: "#ffffff",
                      },
                    }}
                    label="Field Value"
                    InputLabelProps={{
                      style: {
                        color: "#8F8A8A",
                      },
                    }}
                    name="fieldValue"
                    variant="outlined"
                    onChange={(e) => {
                      const values = [...fields];
                      values[index][e.target.name] = e.target.value;
                      console.log(values, "values");
                      setFields(values);
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#841617",
                      height: "100%",
                      width: "3%",
                      margin: "10px 10px",
                    }}
                    onClick={() => removeField(index)}>
                    <CloseIcon />
                  </Button>
                </div>
              );
            })
          }

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1E90B3",
              textTransform: "capitalize",
              fontFamily: "Josefin Slab",
              fontSize: "1.1rem",
            }}
            onClick={() => {
              addField();
            }}>
            Add Field
          </Button>
          <Button
            variant="contained"
            component="label"
            sx={{
              textTransform: "capitalize",
              fontFamily: "Josefin Slab",
              backgroundColor: "#878093",
              fontSize: "1.1rem",
            }}>
            Upload Pictures
            <input
              type="file"
              onChange={onPicUpload}
              hidden
              multiple
              accept="image/*"
            />
          </Button>
          <div>
            {familyInfo["Family Photo"] &&
              familyInfo["Family Photo"].map((src) => (
                <img
                  style={{ padding: "5px" }}
                  src={src}
                  alt="family"
                  key={src}
                  width={100}
                />
              ))}
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#1E90B3",
            }}>
            Edit
          </Button>
        </form>
      ) : (
        <form
          onSubmit={addFamily}
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Josefin Slab, serif",
            gap: "10px",
          }}>
          {Object.keys(initialFamilyInfoState).map(
            (fieldKey, i) =>
              fieldKey !== "Family Photo" && (
                <TextField
                  required
                  name={fieldKey}
                  variant="outlined"
                  sx={{
                    border: "1px solid #8F8A8A",
                    color: "#ffffff",
                    input: {
                      "&:focus": {
                        color: "#ffffff",
                        border: "1px solid #8F8A8A",
                      },
                      color: "#ffffff",
                    },
                  }}
                  label={fieldKey}
                  InputLabelProps={{
                    style: {
                      color: "#8F8A8A",
                    },
                  }}
                  onChange={setFamilyInfoState}
                />
              )
          )}
          {
            //only show the fields if the user clicks on the add field button
            fields.map((field, index) => {
              return (
                <div key={index}>
                  <TextField
                    sx={{
                      border: "1px solid #8F8A8A",
                      color: "#ffffff",
                      input: {
                        "&:focus": {
                          color: "#ffffff",
                          border: "1px solid #8F8A8A",
                        },
                        color: "#ffffff",
                      },
                    }}
                    label="Field Name"
                    InputLabelProps={{
                      style: {
                        color: "#8F8A8A",
                      },
                    }}
                    name="fieldName"
                    variant="outlined"
                    onChange={(e) => {
                      const values = [...fields];
                      values[index][e.target.name] = e.target.value;
                      setFields(values);
                    }}
                  />
                  <TextField
                    sx={{
                      border: "1px solid #8F8A8A",
                      color: "#ffffff",
                      input: {
                        "&:focus": {
                          color: "#ffffff",
                          border: "1px solid #8F8A8A",
                        },
                        color: "#ffffff",
                      },
                    }}
                    label="Field Value"
                    InputLabelProps={{
                      style: {
                        color: "#8F8A8A",
                      },
                    }}
                    name="fieldValue"
                    variant="outlined"
                    onChange={(e) => {
                      const values = [...fields];
                      values[index][e.target.name] = e.target.value;
                      setFields(values);
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#841617",
                      height: "100%",
                      width: "3%",
                      margin: "10px 10px",
                    }}
                    onClick={() => removeField(index)}>
                    <CloseIcon />
                  </Button>
                </div>
              );
            })
          }

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1E90B3",
              textTransform: "capitalize",
              fontFamily: "Josefin Slab",
              fontSize: "1.1rem",
            }}
            onClick={() => {
              addField();
            }}>
            Add Field
          </Button>

          <Button
            variant="contained"
            component="label"
            sx={{
              textTransform: "capitalize",
              fontFamily: "Josefin Slab",
              backgroundColor: "#878093",
              fontSize: "1.1rem",
            }}>
            Upload Pictures
            <input
              type="file"
              onChange={onPicUpload}
              hidden
              multiple
              accept="image/*"
            />
          </Button>
          <div>
            {familyInfo["Family Photo"] &&
              familyInfo["Family Photo"].map((src) => (
                <img
                  style={{ padding: "5px" }}
                  src={src}
                  alt="family"
                  key={src}
                  width={100}
                />
              ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#1E90B3",
              }}>
              Add
            </Button>
          </div>
        </form>
      )}
    </Box>
  );
};
