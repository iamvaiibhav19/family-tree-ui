import { selectClasses } from "@mui/material";
import { useState } from "react";
import {
  useSelectedNodeState,
  useTreeState,
  useSearchTextState,
  useFilteredIdState,
} from "../contexts";
import { SearchText } from "./../contexts/SearchText";

export function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
}

export const initialFamilyInfoState = {
  Name: "",
  Spouse: "",
  Location: "",
  "Birth Year": "",
  "Present Address": "",
  "Family Photo": null,
};

export const useDeleteFamily = (afterAdding = () => {}) => {
  //code to delete family
  const [selectedNode] = useSelectedNodeState();
  const [treeState, setTreeDataState] = useTreeState();

  const deleteFamily = (e) => {
    const uId = selectedNode.id;
    e.preventDefault();
    selectedNode &&
      setTreeDataState((prevTree) => {
        const clone = { ...prevTree };
        let currentNode = clone;
        selectedNode.ancentors.forEach((node, i) => {
          if (i !== 0) {
            // console.log(node,"this is the flow of ancestor ",i);
            let parent = currentNode;
            currentNode = currentNode.children[node];
            if (currentNode.id == uId) {
              delete parent.children[uId];
            }
          }
        });

        return clone;
      });

    // handleClose()
    //afterAdding();
  };
  return { deleteFamily };
};

export const useAddFamily = ({
  initialFamilyInfoState,
  afterAdding = () => {},
  afterEditing = () => {},
}) => {
  const [familyInfo, setFamilyInfo] = useState(initialFamilyInfoState);

  const [fields, setFields] = useState([]);

  const [deletedFields, setDeletedFields] = useState([]);

  //function to add deleted fields to the deletedFields array
  const addDeletedField = (field) => {
    const newDeletedFields = [...deletedFields];
    newDeletedFields.push(field);
    setDeletedFields(newDeletedFields);
  };

  console.log(deletedFields, "this is the deleted fields");

  const addField = () => {
    const newFields = [...fields];
    newFields.push({ fieldName: "", fieldValue: "" });
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    console.log(newFields, "newFields");
    setFields(newFields);
  };

  const [selectedNode, setSelectedNode] = useSelectedNodeState();
  const [treeState, setTreeDataState] = useTreeState();

  console.log(treeState, "this is the tree state");

  const addFamily = (e) => {
    e.preventDefault();
    console.log(fields, "this is the fields");
    console.log(familyInfo, "this is the family info");
    selectedNode &&
      setTreeDataState((prevTree) => {
        const clone = { ...prevTree };
        const uId = uid();
        let currentNode = clone;
        selectedNode.ancentors.forEach((node, i) => {
          if (i !== 0) {
            currentNode = currentNode.children[node];
          }
        });
        currentNode.children = currentNode.children
          ? {
              ...currentNode.children,
              [uId]: {
                id: uId,
                ...familyInfo,
                //if there are fields in fields array, only push name and value to the familyInfo object
                ...fields.reduce((acc, field) => {
                  return {
                    ...acc,
                    [field.fieldName]: field.fieldValue,
                  };
                }, {}),
              },
            }
          : {
              [uId]: {
                id: uId,
                ...familyInfo,
                //if there are fields in fields array, only push name and value to the familyInfo object
                ...fields.reduce((acc, field) => {
                  return {
                    ...acc,
                    [field.fieldName]: field.fieldValue,
                  };
                }, {}),
              },
            };
        const dataToshow = {
          ...familyInfo,
          ...fields.reduce((acc, field) => {
            return {
              ...acc,
              [field.fieldName]: field.fieldValue,
            };
          }, {}),
        };
        setSelectedNode(dataToshow);
        return clone;
      });

    !selectedNode &&
      Object.keys(treeState).length === 0 &&
      setTreeDataState(() => {
        const dataToshow = {
          ...familyInfo,
          ...fields.reduce((acc, field) => {
            return {
              ...acc,
              [field.fieldName]: field.fieldValue,
            };
          }, {}),
        };
        setSelectedNode(dataToshow);
        return {
          id: uid(),
          ...familyInfo,
          //if there are fields in fields array, only push name and value to the familyInfo object with fieldName and fieldValue
          ...fields.reduce((acc, field) => {
            return {
              ...acc,
              [field.fieldName]: field.fieldValue,
            };
          }, {}),
        };
      });

    // handleClose()

    afterAdding();
    setFields([]);
    setFamilyInfo(initialFamilyInfoState);
    console.log(familyInfo, "this is the family info");
    // setSearchText("sad");
    // setSearchText(SearchText);
  };

  const editFamily = (e) => {
    e.preventDefault();
    console.log(familyInfo, "this is the family info");
    selectedNode &&
      setTreeDataState((prevTree) => {
        let clone = { ...prevTree };
        console.log(clone, "this is the clone ------------");
        let updatedNode;
        if (selectedNode.id === clone.id) {
          const { id, children, ...restOfClone } = clone;
          updatedNode = {
            id,
            children,
            ...familyInfo,
            ...fields.reduce((acc, field) => {
              return {
                ...acc,
                [field.fieldName]: field.fieldValue,
              };
            }, {}),
          };
          clone = updatedNode;
        } else {
          let currentNode = clone;
          selectedNode.ancentors.forEach((node, i) => {
            if (i !== 0) {
              let parent = currentNode;
              currentNode = currentNode.children[node];
              if (currentNode.id === selectedNode.id) {
                const { id, children, ...restOfCurrentNode } = currentNode;
                updatedNode = {
                  id,
                  children,
                  ...familyInfo,
                  ...fields.reduce((acc, field) => {
                    return {
                      ...acc,
                      [field.fieldName]: field.fieldValue,
                    };
                  }, {}),
                };
                parent.children[selectedNode.id] = updatedNode;
              }
            }
          });
        }
        setSelectedNode(updatedNode);
        return clone;
      });
    afterEditing();
    setFamilyInfo(initialFamilyInfoState);
  };

  const deleteField = (fieldName) => {
    setFamilyInfo((prevFamilyInfo) => {
      const clone = { ...prevFamilyInfo };
      delete clone[fieldName];
      console.log(clone, "this is the clone" + fieldName);
      return clone;
    });
  };

  const setFamilyInfoState = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "this is the name and value");

    setFamilyInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onPicUpload = (e) => {
    // const picUrls = e.target.files.map(file => URL.createObjectURL(file))
    const picUrls = [];

    const allSelectedImgs = e.target.files;

    for (let index = 0; index < allSelectedImgs.length; index++) {
      const currentImg = allSelectedImgs[index];
      picUrls.push(URL.createObjectURL(currentImg));
    }

    console.log(picUrls, "this is the picUrls");

    picUrls.length > 0 &&
      setFamilyInfo((prevState) => {
        return {
          ...prevState,
          "Family Photo": picUrls,
        };
      });

    console.log(familyInfo, "this is the family info after pic");
  };

  return {
    familyInfo,
    setFamilyInfoState,
    addFamily,
    onPicUpload,
    editFamily,
    fields,
    setFields,
    addField,
    setFamilyInfo,
    removeField,
    deleteField,
    addDeletedField,
  };
};
