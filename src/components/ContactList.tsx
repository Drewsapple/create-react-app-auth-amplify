import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Autocomplete } from '@material-ui/lab';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { API, graphqlOperation } from 'aws-amplify';
import { updateSignedInUser } from '../graphql/mutations';
import { Chip, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ContactList(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [names, setNames] = React.useState<string[]>(props.selected);

  const handleChange = props.handleChange ? props.handleChange : 
  async (event: React.ChangeEvent<{ value: unknown }>) => {
    let names = event.target.value as string[]
    console.log(await API.graphql(graphqlOperation(updateSignedInUser, {input: {id: props.id, contacts: names}})))
    setNames(names);
    props.onSelectedChange(names);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Contacts</InputLabel>
        <Autocomplete
          multiple
          freeSolo
          id="tags-outlined"
          autoComplete={true}
          autoHighlight={true}
          options={names}
          onChange={handleChange}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />
          )}
        />
      </FormControl>
    </div>   
  );
}