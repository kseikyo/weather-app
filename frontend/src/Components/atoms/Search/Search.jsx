import React from 'react';
import { Flex, Input, Text } from '@chakra-ui/react';

export const Search = ({ setSearchInput }) => {
  const handleInputChange = event => setSearchInput(event.target.value);

  return (
    <Flex align="center">
      <Text w="100%" as="label" htmlFor="search" fontSize="xl">
        How is the weather in
      </Text>
      <Input
        autoFocus
        name="search"
        variant="flushed"
        onChange={handleInputChange}
      />
      <Text fontSize="xl">now?</Text>
    </Flex>
  );
};
