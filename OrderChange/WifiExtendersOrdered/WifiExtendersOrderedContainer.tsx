'use client';

import { OrderChangeLayout } from '../OrderChangeLayout';
import type { WifiExtendersOrderedProps } from './WifiExtendersOrderedPage.types';

export const WifiExtendersOrderedContainer = ({
  content_groups,
  application,
}: WifiExtendersOrderedProps) => {
  return (
    <OrderChangeLayout
      contentGroups={content_groups}
      application={application}
    />
  );
};
