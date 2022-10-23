import React from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: 'amount' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          defaultValue: '1',
        }}
        type="text"
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
