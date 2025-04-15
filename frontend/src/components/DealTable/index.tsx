import React from 'react';
import { Sale } from '../../hooks/queries/sales/sales';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Badge } from '@mantine/core';
import { useMediaQuery } from 'react-responsive';

interface IProps {
  sales: Sale[];
}

const DealTable: React.FC<IProps> = ({ sales }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 36em)' });

  const badgeColor: Record<string, string> = {
    'Closed Won': 'lime',
    'In Progress': 'yellow',
    'Closed Lost': 'red',
  };
  const columns: GridColDef[] = [
    {
      field: 'client',
      headerName: 'Client',
      ...(isMobile ? { width: 130 } : { flex: 1 }),
    },
    {
      field: 'salesRep',
      headerName: 'Sales Rep',
      ...(isMobile ? { width: 130 } : { flex: 1 }),
    },
    {
      field: 'value',
      headerName: 'Deal Value',
      ...(isMobile ? { width: 130 } : { flex: 1 }),
      valueGetter: (value: number) => value.toLocaleString(),
    },
    {
      field: 'status',
      headerName: 'Status',
      ...(isMobile ? { width: 130 } : { flex: 1 }),
      renderCell: params => (
        <Badge color={badgeColor[params.value]}>{params.value}</Badge>
      ),
    },
  ];

  const rows = sales
    .flatMap(sale => sale.deals.map(deal => ({ ...deal, salesRep: sale.name })))
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

export default DealTable;
