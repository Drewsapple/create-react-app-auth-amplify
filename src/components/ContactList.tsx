import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { API, graphqlOperation } from 'aws-amplify';
import { updateSignedInUser } from '../graphql/mutations';

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
        <Select
          labelId="demo-mutiple-name-label"
          id="contact-list"
          multiple
          value={names}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {props.names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, names, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}