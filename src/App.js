import './App.css';
import { FamilyDetailsContainer, SidePanel } from './components';
import { SelectionContext, TreeStateContext,FilteredIDs } from './contexts';
import { SearchText } from './contexts/SearchText';
import {Box} from '@mui/material';
import { ButtonPanel } from "./components";

function App() {

  return (
    <div id='App' >
      <TreeStateContext>
        <SelectionContext>
          <FilteredIDs>
            <SearchText>
              <Box className="box">
                <SidePanel/>              
                <FamilyDetailsContainer/>
              </Box>
            </SearchText>
          </FilteredIDs>
        </SelectionContext>
      </TreeStateContext>
    </div>
  );
}

export default App;