import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardHeader, Grid } from '@mui/material';
import FilterForm from './FilterForm';

interface Props {
  showActions?: boolean;
  onSearch?: () => void;
  onReset?: () => void;
}

const FilterSection = ({ showActions = true, onSearch, onReset }: Props) => {
  const handleOnResetClick = () => {
    if (onReset !== undefined) {
      onReset();
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Filter" />
        <CardContent>
          <FilterForm />
        </CardContent>
        {showActions && (
          <CardActions>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    if (onSearch !== undefined) {
                      onSearch();
                    }
                  }}
                  color="success"
                  variant="contained"
                >
                  Search
                </Button>
                <Button
                  onClick={handleOnResetClick}
                  color="error"
                  variant="outlined"
                  sx={{ marginLeft: '5px' }}
                >
                  Clear table
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default FilterSection;
