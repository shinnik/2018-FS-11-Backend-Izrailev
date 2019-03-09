import React from 'react';
import Aux from '../../hoc/Aux1/Aux1'
import classes from './Layout.module.css';
import Header from './../../containers/Header/Header'

const layout = ({children}) => (
  <Aux>
    <Header />
    <main className={classes.Content}>
      {children}
    </main>
  </Aux>
);
export default layout;
