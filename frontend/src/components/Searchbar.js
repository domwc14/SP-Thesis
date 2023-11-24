import { useState} from "react";
// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const SearchBar = () => {

  return (
    <Box sx={{ width: '10%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '10%', md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
              </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          placeholder="Search"
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;