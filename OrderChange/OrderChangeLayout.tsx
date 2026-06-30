'use client';

import { Addon } from '@odido-portals/glow-react-web/addon';
import { AddonList } from '@odido-portals/glow-react-web/addon-list';
import {
  MySection,
  MySectionGrid,
} from '@odido-portals/glow-react-web/my-section';
import { Paragraph } from '@odido-portals/glow-react-web/paragraph';
import { OrderChangeLayout } from '../OrderChangeLayout';
import type {
  HardwareDevicesSection,
  HardwareSwapProps,
  ReturnSectionContentGroup,
} from './HardwareSwapPage.types';

export const HardwareSwapContainer = ({
  content_groups,
  application,
}: HardwareSwapProps) => {
  const returnContent = content_groups.find(
    (grp) => grp.name === 'return_section',
  ) as ReturnSectionContentGroup | undefined;

  const devicesSection = content_groups.find(
    (grp) => grp.name === 'hardware_devices_section',
  ) as HardwareDevicesSection | undefined;

  const returnDevice = devicesSection?.content_groups?.[0];

  const details = returnContent ? (
    <MySection
      title={{ text: returnContent.content_parameters.title ?? '', size: 'md' }}
    >
      <MySectionGrid>
        <Paragraph>{returnContent.content_parameters.description}</Paragraph>
        {returnDevice && (
          <AddonList
            items={[
              {
                addOn: <Addon name='Wifi' size='sm' />,
                title: returnDevice.content_parameters.device_name,
                attention: {
                  text: returnContent.content_parameters.return_label,
                  variant: 'warning' as const,
                },
              },
            ]}
            onListItemClick={() => {}}
          />
        )}
      </MySectionGrid>
    </MySection>
  ) : null;

  return (
    <OrderChangeLayout
      contentGroups={content_groups}
      application={application}
      details={details}
    />
  );
};
