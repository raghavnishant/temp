import { HardwareSwapContainer } from './HardwareSwapContainer';
import type { HardwareSwapProps } from './HardwareSwapPage.types';

export const HardwareSwapPage = async (props: HardwareSwapProps) => {
  return <HardwareSwapContainer {...props} />;
};
