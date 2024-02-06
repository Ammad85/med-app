import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DarkMode from "./DarkMode";
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Grid, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import CircleIcon from '@mui/icons-material/Circle';
import EastIcon from '@mui/icons-material/East';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });




const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
]



function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [open, setOpen] = React.useState(false);
  const closePopper = () => setOpen(false);
  const openPopper = () => setOpen(true);
  const [textIndex, setTextIndex] = React.useState(0);
  const array = ['What Generic Name / Brand Name?', ' What form?', ' What Strength?', ' What Route?']
  const [dataArray, setDataArray] = React.useState([])
  const [selected, setSelected] = React.useState([])

  const changeCall = (term) => {
    fetch(`http://localhost:8001/api/med/autocomplete?term=${term}`)
    .then(response => response.json())
          .then(responseJson => {
            setDataArray(responseJson.data);
          })
          .catch(error => {
            console.error(error);
          });
   };

  const changeMode = () => {
    colorMode.toggleColorMode()
  }

 const onTagsChange = (event, values) => {
   setSelected(values);
      console.log(selected);
  }

  const renderInput = (params) => {
    if (SearchIcon)
        params.InputProps.startAdornment = (
            <>
                <InputAdornment position="start"><SearchIcon /></InputAdornment>
                {params.InputProps.startAdornment}
            </>
        );
  
    return <TextField {...params} variant="outlined" placeholder={`Drug name`} onChange={event => changeCall(event.target.value)} sx={{
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        
        border: `2px solid ${theme.palette.mode == 'dark' ? '#C7D0D8' : '#C7D0D8'} !important`,
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
      },
      '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
        border: `2px solid ${theme.palette.mode == 'dark' ? '#C7D0D8' : '#C7D0D8'} !important`, 
        borderRadius: '20px'
      },
      '.MuiAutocomplete-root fieldset:hover' :{
        borderColor: `${theme.palette.mode == 'dark' ? '#C7D0D8' : '#C7D0D8'} !important`
     }
    }}   />;
  };

  const NumResultsHeader = ({ children, ...other }) => {
    const headerRef = React.useRef();
    const countRef = React.useRef();
    const paperRef = React.useRef();
    const bottomRef = React.useRef();
    React.useEffect(() => {
      const numOptions = paperRef.current.querySelectorAll(
        "li[data-option-index]"
      ).length;
      countRef.current.innerHTML = numOptions;
      if (numOptions > 0) {
        headerRef.current.style.display = "block";
      } else {
        headerRef.current.style.display = "none";
      }
    });
    return (
      <div style={{border: `2px solid ${theme.palette.mode == 'dark' ? '#C7D0D8' : '#C7D0D8'}`, margin: '-2px 0px', borderTop: 'none', borderBottomRightRadius: '20px',borderBottomLeftRadius: '20px', zIndex: 100, backgroundColor: `${theme.palette.mode=='dark' ? "#1E1E1E" : "#FFFFFF"}` }}>
        <div ref={headerRef} style={{ display: "none", color: `${theme.palette.mode == 'dark' ? '#FFFFFF' : '#000000'}`, padding:'8px 15px 0px' }}>
          <span style={{ fontWeight: 'bold' }}>{array[textIndex]}</span>  <span ref={countRef} style={{float:'right',}} > Skip</span><span ref={countRef} style={{float:'right', display: 'none'}} onClick={console.log('clicked')}> skip</span> 
        </div>
        <Paper {...other} ref={paperRef} style={{border: 'none', borderRadius: '20px', boxShadow: 'none'}}>
          {children}
        </Paper>
        <Grid ref={bottomRef} container
    direction="row"
    justifyContent="center"
    alignItems="center" style={{color: 'white', backgroundColor:'#2749D2', fontWeight: 'bold', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', padding:"8px 15px"  }}>
          powered by <CircleIcon style={{margin:'0px 8px'}} /> NeuroCare.AI
        </Grid>
      </div>
    );
  };

  return (
    <div style={{backgroundColor:`${theme.palette.mode=='dark' ? "black" : "#2749D2"}`, height: '100vh' }}>
    <Grid
    container
    direction="row"
    justifyContent="start"
    alignItems="center"
    sx={{
      bgcolor: `${theme.palette.mode=='dark' ? "black" : "#2749D2"}`,
      color: 'text.primary',
      height: theme.spacing(10),
      padding: `${theme.spacing(2)} ${theme.spacing(4)}`
    }}
      >
        <Grid xs={"auto"} >
          <DarkMode onChange={changeMode}/>
        </Grid>
        <Grid xs={"auto"}>
          <HomeIcon fontSize="medium" sx={{color: "white"}} />
        </Grid>
      </Grid>
      <div style={{height: "100%" , backgroundColor: `${theme.palette.mode=='dark' ? "#1E1E1E" : "#FFFFFF"}`,
      color: 'text.primary',
      padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
      borderRadius: "20px 20px 0px 0px"}}>
      <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="start"
    sx={{
      bgcolor: `${theme.palette.mode=='dark' ? "#1E1E1E" : "#FFFFFF"}`,
      color: 'text.primary',
      padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
      borderRadius: "20px 20px 0px 0px"
    }}
      >
        <Grid xs={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography style={{ color: 'text.primary', fontSize: 32, fontWeight: "bold" }}> Medication Search Plugin</Typography>
        </Grid>
        </Grid>
      <Grid xs={12}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: `${theme.palette.mode == 'dark' ? "#1E1E1E" : "#FFFFFF"}`,
          color: 'text.primary',
          padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
        }}
        >
        <div style={{width: "30%", }}>
        <Autocomplete
        multiple
        id="size-small-filled-multi"
              size="small"
              onOpen={openPopper}
              onClose={closePopper}
              forcePopupIcon={false}
              options={dataArray}
              PaperComponent={NumResultsHeader}
              onChange={onTagsChange}
              getOptionLabel={(option) => option.manufacturedProduct_asEntityWithGeneric_genericMedicine_name}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant=""
              label={option.manufacturedProduct_asEntityWithGeneric_genericMedicine_name}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        sx={{
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
            border: `2px solid ${theme.palette.mode == 'dark' ? '#C7D0D8' : '#C7D0D8'}`,
            borderBottomLeftRadius: `${open ? '0px' : '20px'}`,
            borderBottomRightRadius: `${open ? '0px' : '20px'}`
          },
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none',
            border: `2px solid ${theme.palette.mode == 'dark' ? '#C7D0D8' : '#C7D0D8'}`, 
            borderRadius: '20px'
          },
          '.MuiAutocomplete-root fieldset:hover' :{
            borderColor: `${theme.palette.mode == 'dark' ? '#C7D0D8' : '#C7D0D8'} !important`
         }
        }}  
        renderInput={renderInput}
            />
            </div>
        </Grid>
        </div>
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
