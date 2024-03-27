import React from 'react';
import { Container, Typography } from '@mui/material';
import TagList from './components/TagList';

function App() {
  return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          StackOverflow Tag Browser
        </Typography>
        <TagList />
      </Container>
  );
}

export default App;
