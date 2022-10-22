import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import FilterForm from './FilterForm';

const FilterSection = () => {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Filter" />
        <CardContent>
          <FilterForm />
        </CardContent>
      </Card>
    </>
  );
};

export default FilterSection;
