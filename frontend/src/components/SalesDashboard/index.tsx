import { Center, Container, Loader } from '@mantine/core';
import { useSales } from '../../hooks/queries/sales/sales';
import { Sales } from '../Sales';

export const SalesDashboard = () => {
  const { data: sales, isFetching: isSalesFetching } = useSales();

  return (
    <Container size="xl" mb={'md'}>
      {isSalesFetching && (
        <Center>
          <Loader />
        </Center>
      )}
      {!isSalesFetching && (
        <>
          <Sales sales={sales} />
        </>
      )}
    </Container>
  );
};
