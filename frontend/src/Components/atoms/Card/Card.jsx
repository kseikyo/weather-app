import { Flex, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

const CardLoader = ({ loading }) => {
  return <Skeleton w={36} h={36} isLoaded={!loading}></Skeleton>;
};

export const Card = ({ city, temperature, description, loading }) => {
  if (loading) {
    return <CardLoader loading={loading} />;
  }

  if (!city || !temperature || !description) {
    return null;
  }

  return (
    <Flex
      boxShadow="md"
      w={40}
      py={6}
      rounded="md"
      bg="white"
      align="center"
      justify="center"
      flexDir="column"
    >
      <Text as="h2" fontSize="xl">
        {city}
      </Text>
      <Text as="span" fontSize="3xl" fontWeight="extrabold">
        {temperature}
        °C
      </Text>
      <Text textTransform="capitalize" as="span" fontSize="lg">
        {description}
      </Text>
    </Flex>
  );
};
