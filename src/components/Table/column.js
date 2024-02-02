import { DateTime } from 'luxon';

export const columnDefinition = [
  // {
  //   header: 'ID',
  //   accessorKey: 'id',
  //   footer: 'ID',
  // },
  {
    header: 'Type',
    accessorKey: 'type',
    footer: 'Type',
  },
  {
    header: 'Source',
    accessorKey: 'source',
    footer: 'Source',
  },
  {
    header: 'Unit',
    accessorKey: 'unit',
    footer: 'Unit',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    footer: 'Unit',
  },
  {
    header: 'Created By',
    accessorKey: 'createdBy',
    footer: 'Created By',
  },
  {
    header: 'Date of Record',
    accessorKey: 'createdAt',
    footer: 'Date of Record',
    cell: (info) =>
      DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
  },
  // {
  //   header: 'Actions',
  //   id: 'actions',
  //   // cell: ({ row }) => <button onClick={() => handleEdit(row.original)}>Edit</button>,
  //   cell: ({ row }) => <button onClick={() => {}}>Edit</button>,
  // },
];

export const columnDefinitionUsers = [
  {
    header: 'Username',
    accessorKey: 'username',
    footer: 'Username',
  },
  {
    header: 'Full Name',
    accessorKey: 'name',
    footer: 'Full Name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
    footer: 'Email',
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
    footer: 'Gender',
  },
  {
    header: 'User Role',
    accessorKey: 'userRole',
    footer: 'User Role',
  },
];
