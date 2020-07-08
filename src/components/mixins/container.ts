import { css } from 'styled-components';
import * as C from '~/const';
import { cssUnit } from '~/utils';

type ContainerProps = {
  width?: number | string;
};

export const containerMixin = ({ width = C.$containerWidth }: ContainerProps) => css`
  box-sizing: border-box;
  width: 100%;
  max-width: calc(${cssUnit(width)} + ${cssUnit(C.$containerMargin * 2)});
  padding: 0 ${cssUnit(C.$containerMargin)};
  margin: 0 auto;
`;
