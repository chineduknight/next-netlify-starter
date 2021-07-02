import { FC } from 'react';

/**
 * Properties required of a route
 * @type
 */
export type AppRoute = {
  path: string;
  exact?: boolean;
  page: FC;
}