import React, { memo } from 'react';

import { Text } from '@chakra-ui/react';

import { useCityWeather } from '../../../hooks';
import { Card } from '../../atoms/Card';

export const WeatherCard = memo(({ searchInput }) => {
  const { data, loading, error } = useCityWeather(searchInput);

  if (error) {
    return (
      <Text w="64rem" color="red" as="h1" fontSize="6xl" textAlign="center">
        {error}
      </Text>
    );
  }

  return <Card {...data} loading={loading} />;
});
