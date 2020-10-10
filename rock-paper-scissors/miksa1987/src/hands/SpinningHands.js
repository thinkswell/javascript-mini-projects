import React from 'react';

import { Image } from '../common/Image';
import { SpinningAnimation } from './SpinningAnimation';

export const SpinningRock = ({ big }) => (
  <SpinningAnimation>
    <Image big={big} src="/img/rock.png" />
  </SpinningAnimation>
);

export const SpinningPaper = ({ big }) => (
  <SpinningAnimation>
    <Image big={big} src="/img/paper.png" />
  </SpinningAnimation>
);

export const SpinningScissors = ({ big }) => (
  <SpinningAnimation>
    <Image big={big} src="/img/scissors.png" />
  </SpinningAnimation>
);
