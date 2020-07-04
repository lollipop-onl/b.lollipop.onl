import React, { FC } from 'react';

type Props = {};

export const config = { amp: true };

export const IndexPage: FC<Props> = () => {
  return <div><p>Hello World.</p><amp-img src="https://i.gyazo.com/4d550f2d023ad0712be31755eb95694c.jpg" width={200} height={200} /></div>
}

export default IndexPage;
