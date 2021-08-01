import React, { useState } from 'react';
import { Box, ChakraProvider, Container, Flex, theme } from '@chakra-ui/react';
import { Header } from './Components/atoms/Header';
import { Search } from './Components/atoms/Search';
import { CardList } from './Components/molecules/CardList';
import { WeatherCard } from './Components/molecules/WeatherCard';

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <Box mt={12}>
          <Header />
        </Box>
        <Container
          overflow="visible"
          minH="80vh"
          centerContent
          justifyContent="center"
        >
          <Search setSearchInput={setSearchInput} />
          <Box>
            <Flex mt={20} align="center" justify="center">
              <WeatherCard searchInput={searchInput} />
            </Flex>

            <Flex mt={8} align="center" justify="center">
              <CardList searchInput={searchInput} />
            </Flex>
          </Box>
        </Container>
      </Container>
    </ChakraProvider>
  );
}

export default App;
