import React from 'react'
import { CssBaseline, Container, Grid} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getProjectNameAndSave from '../data/migrate.js';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const names = await getProjectNameAndSave();

console.log(names);

const Projects = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      
      <CssBaseline />
      
      <Navbar />
        
        <Container size="sm" sx={{ mt: "7rem", mb: 4 }}>
            <Grid container spacing={2} gutterBottom>
                {names.map((name) => (
                   <Grid item xs={12} sm={6} md={4} key={name}>
                        <Cards 
                            projectName={name} 
                            imageUrl={'https://picsum.photos/200/300'} 
                            altname={name} 
                            description={`${name} is a project repository`}
                        />
                    </Grid>)
                )}
            </Grid>
        </Container>     
      <Footer />
    </ThemeProvider>
  )
}

export default Projects
