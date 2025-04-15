import React from 'react';
import { Sale } from '../../hooks/queries/sales/sales';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMediaQuery } from 'react-responsive';

interface IProps {
  sales: Sale[];
}

const ClientTable: React.FC<IProps> = ({ sales }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 36em)' });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      ...(isMobile ? { width: 130 } : { flex: 3 }),
    },
    {
      field: 'industry',
      headerName: 'Industy',
      ...(isMobile ? { width: 130 } : { flex: 3 }),
    },
    {
      field: 'contact',
      headerName: 'Contact',
      ...(isMobile ? { width: 130 } : { flex: 4 }),
    },
  ];

  const rows = sales
    .flatMap(sale => sale.clients)
    .map((client, idx) => ({ id: idx + 1, ...client }));
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
    />
  );
};

export default ClientTable;
