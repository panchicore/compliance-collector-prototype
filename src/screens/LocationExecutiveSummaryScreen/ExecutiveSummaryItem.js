import React, { useState } from 'react';
import { Chip, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { green, pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

export default function ExecutiveSummaryItem({summary_type, label, helper, summary_value}){

  const classes = useStyles();
  const [summary, setSummary] = useState(summary_value);

  const done = summary.length > 160

  return (
      <Grid container alignItems={'center'} spacing={2} style={{marginBottom: 10}}>
        <Grid item xs={6}>
          <Typography variant={'h6'}>{label}</Typography>
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          <Chip label={helper}
                classes={done ? classes.green : classes.pink}
                color={done ? 'primary': 'secondary'}
                deleteIcon={done ? <DoneIcon /> : <CloseIcon />}
                onDelete={() => {}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField variant={'outlined'} multiline fullWidth rows={4} defaultValue={summary}
                     onChange={(e) => setSummary(e.target.value)}
          placeholder={helper}/>
        </Grid>
      </Grid>
  )
}