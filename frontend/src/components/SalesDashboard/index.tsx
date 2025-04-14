import { Center, Container, Loader } from '@mantine/core';
import { useSales } from '../../hooks/queries/sales/sales';
import { SalesOverview } from '../SalesOverview';

export const SalesDashboard = () => {
  const { data: sales, isFetching: isSalesFetching } = useSales();

  return (
    <Container size={'md'}>
      {isSalesFetching && (
        <Center>
          <Loader />
        </Center>
      )}
      {!isSalesFetching && (
        <>
          <SalesOverview sales={sales} />
        </>
      )}
    </Container>
  );
};
