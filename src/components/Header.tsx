import React from 'react';
import { css } from '../../styled-system/css';

interface Props {
   logo: string;
}

export default function Header({ logo }: Props) {
   return (
      <header
         className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         })}
      >
         <img src={logo} alt='logo' />
      </header>
   );
}
