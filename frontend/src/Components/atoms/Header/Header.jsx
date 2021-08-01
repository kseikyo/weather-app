import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const Header = () => {
  return (
    <Box as="header" w="100%" borderBottom="1px solid black">
      <Flex align="center" justify="center">
        <Text as="h1" fontSize="3xl">WEATHER BUDDY</Text>
      </Flex>
    </Box>
  );
};
