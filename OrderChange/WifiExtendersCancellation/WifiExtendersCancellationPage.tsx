import { WifiExtendersCancellationContainer } from './WifiExtendersCancellationContainer';
import type { WifiExtendersCancellationProps } from './WifiExtendersCancellationPage.types';

export const WifiExtendersCancellationPage = async (
  props: WifiExtendersCancellationProps,
) => {
  return <WifiExtendersCancellationContainer {...props} />;
};
