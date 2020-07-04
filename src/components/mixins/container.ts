import { css } from 'styled-components';
import * as C from '~/const';
import { cssUnit } from '~/utils';

type ContainerProps = {
  width?: number | string;
};

export const containerMixin = ({ width = C.$containerWidth }: ContainerProps) => css`
  width: 100%;
  margin: 0 auto;
  max-width: ${cssUnit(width)};
`;
