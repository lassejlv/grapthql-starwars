import React from 'react';
import { BeatLoader } from 'react-spinners';

export default function Loader({ size = 15 }: { size?: number }) {
   return <BeatLoader size={size} color='#5f8598' />;
}
