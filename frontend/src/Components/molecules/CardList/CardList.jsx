import React, { memo } from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';
import { Card } from '../../atoms/Card';
import { useLatestSearched } from '../../../hooks';

const CardListLoading = ({ loading }) => {
  return (
    <Flex bg="teal.50" p={5} maxW="56rem" style={{ gap: 12 }}>
      <Skeleton w={36} h={36} isLoaded={!loading} />
      <Skeleton w={36} h={36} isLoaded={!loading} />
      <Skeleton w={36} h={36} isLoaded={!loading} />
      <Skeleton w={36} h={36} isLoaded={!loading} />
      <Skeleton w={36} h={36} isLoaded={!loading} />
    </Flex>
  );
};

export const CardList = memo(({ searchInput }) => {
  const { data, loading, error } = useLatestSearched(searchInput);

  if (loading) {
    return <CardListLoading loading={loading} />;
  }

  if ((data.length < 1 && !loading) || error) {
    return null;
  }

  return (
    <Flex bg="teal.50" p={5} maxW="56rem" style={{ gap: 12 }}>
      {data.map((item, idx) => (
        <Card key={idx} {...item} loading={loading} />
      ))}
    </Flex>
  );
});
