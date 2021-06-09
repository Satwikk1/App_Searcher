import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects({state, setState}) {
  const classes = useStyles();
//   const [state, setState] = React.useState('');

  const handleChange = (event) => {
    const name = event.target.value;
    setState(name);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Application Store</InputLabel>
        <Select
          native
          value={state}
          onChange={handleChange}
          label="Application_Store"
          inputProps={{
            id: 'outlined-age-native-simple',
          }}
        >
            <option value={''}></option>
          <option value={'Play Store'}>Play Store</option>
          <option value={'App Store'}>App Store</option>
        </Select>
      </FormControl>
    </div>
  );
}


