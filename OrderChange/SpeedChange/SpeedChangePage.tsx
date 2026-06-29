import { SpeedChangeContainer } from './SpeedChangeContainer';
import type { SpeedChangeProps } from './SpeedChangePage.types';

export const SpeedChangePage = async (props: SpeedChangeProps) => {
  return <SpeedChangeContainer {...props} />;
};
