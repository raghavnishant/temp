'use client';

import { Addon } from '@odido-portals/glow-react-web/addon';
import { AddonList } from '@odido-portals/glow-react-web/addon-list';
import { Box } from '@odido-portals/glow-react-web/box';
import { Button } from '@odido-portals/glow-react-web/button';
import { DefaultList } from '@odido-portals/glow-react-web/default-list';
import { Heading } from '@odido-portals/glow-react-web/heading';
import {
  MySection,
  MySectionGrid,
} from '@odido-portals/glow-react-web/my-section';
import { Paragraph } from '@odido-portals/glow-react-web/paragraph';
import { Stack } from '@odido-portals/glow-react-web/stack';
import { useState } from 'react';
import { OrderChangeLayout } from '../OrderChangeLayout';
import type {
  HardwareDevicesSection,
  HardwareSwapContentGroup,
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

  const swapContent = content_groups.find(
    (grp) => grp.name === 'hardware_swap_section',
  ) as HardwareSwapContentGroup | undefined;

  const devicesSection = content_groups.find(
    (grp) => grp.name === 'hardware_devices_section',
  ) as HardwareDevicesSection | undefined;

  const cp = swapContent?.content_parameters;
  const devices = devicesSection?.content_groups ?? [];

  const [selectedDeviceName, setSelectedDeviceName] = useState<string | null>(
    null,
  );
  const [swapReason, setSwapReason] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedDevice = devices.find((d) => d.name === selectedDeviceName);

  const swapReasons = [
    cp?.reason_1,
    cp?.reason_2,
    cp?.reason_3,
    cp?.reason_4,
  ].filter(Boolean) as string[];

  const handleSwapSubmit = () => {
    if (selectedDeviceName && swapReason) {
      setIsSubmitted(true);
    }
  };

  const details = (
    <>
      {returnContent && (
        <MySection
          title={{ text: returnContent.content_parameters.title ?? '', size: 'md' }}
        >
          <MySectionGrid>
            <Paragraph>{returnContent.content_parameters.description}</Paragraph>
            {devices.length > 0 && (
              <AddonList
                items={devices.map((device) => ({
                  addOn: <Addon name='Wifi' size='sm' />,
                  title: device.content_parameters.device_name,
                  attention: {
                    text: returnContent.content_parameters.return_label,
                    variant: 'warning' as const,
                  },
                }))}
                onListItemClick={() => {}}
              />
            )}
          </MySectionGrid>
        </MySection>
      )}

      {!isSubmitted ? (
        <>
          <MySection
            title={{ text: cp?.select_device_title ?? '', size: 'md' }}
          >
            <MySectionGrid>
              <Paragraph>{cp?.select_device_description}</Paragraph>
              <AddonList
                items={devices.map((device) => {
                  const dcp = device.content_parameters;
                  return {
                    addOn: (
                      <Addon
                        name={
                          dcp.icon_name === 'Modem' ? 'Wifi' : 'Remote Setting'
                        }
                        size='sm'
                      />
                    ),
                    title: dcp.device_name,
                    attention:
                      selectedDeviceName === device.name
                        ? { text: cp?.selected_label ?? '', variant: 'success' as const }
                        : dcp.status
                          ? { text: dcp.status, variant: 'warning' as const }
                          : undefined,
                    variant:
                      selectedDeviceName === device.name ? 'added' : undefined,
                  };
                })}
                onListItemClick={(index) => {
                  const device = devices[index];
                  if (device) {
                    setSelectedDeviceName(device.name);
                    setIsSubmitted(false);
                  }
                }}
              />
            </MySectionGrid>
          </MySection>

          {selectedDeviceName && (
            <MySection title={{ text: cp?.reason_title ?? '', size: 'md' }}>
              <MySectionGrid>
                <Stack gap='default'>
                  <Paragraph>
                    {cp?.reason_description_before_name}{' '}
                    <strong>
                      {selectedDevice?.content_parameters.device_name}
                    </strong>{' '}
                    {cp?.reason_description_after_name}
                  </Paragraph>
                  <Stack
                    direction={{ mobile: 'column', tablet: 'row' }}
                    gap='default'
                  >
                    {swapReasons.map((reason) => (
                      <Button
                        key={reason}
                        prominence={
                          swapReason === reason ? 'primary' : 'secondary'
                        }
                        onClick={() => setSwapReason(reason)}
                      >
                        {reason}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </MySectionGrid>
            </MySection>
          )}

          {selectedDeviceName && swapReason && (
            <MySection
              title={{ text: cp?.instructions_title ?? '', size: 'md' }}
            >
              <MySectionGrid>
                <Stack gap='default'>
                  <Box palette='blue' prominence='color' size='default'>
                    <Stack gap='default'>
                      <Heading size='xs' as='h4'>
                        {cp?.instructions_box_heading}
                      </Heading>
                      <DefaultList
                        items={[
                          { text: cp?.instruction_1 ?? '' },
                          { text: cp?.instruction_2 ?? '' },
                          { text: cp?.instruction_3 ?? '' },
                          { text: cp?.instruction_4 ?? '' },
                        ]}
                        variant='icon'
                      />
                    </Stack>
                  </Box>
                  <Button prominence='primary' onClick={handleSwapSubmit}>
                    {cp?.confirm_button_label}
                  </Button>
                </Stack>
              </MySectionGrid>
            </MySection>
          )}
        </>
      ) : (
        <MySection title={{ text: cp?.success_title ?? '', size: 'md' }}>
          <MySectionGrid>
            <Stack gap='default'>
              <Box palette='purple' prominence='color' size='default'>
                <Stack gap='default'>
                  <Heading size='xs' as='h4'>
                    {cp?.success_box_heading_before_name}{' '}
                    {selectedDevice?.content_parameters.device_name}{' '}
                    {cp?.success_box_heading_after_name}
                  </Heading>
                  <Paragraph>{cp?.success_description}</Paragraph>
                  <Paragraph size='xs'>
                    {cp?.success_reason_label} {swapReason}
                  </Paragraph>
                </Stack>
              </Box>
              <Button
                prominence='secondary'
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedDeviceName(null);
                  setSwapReason('');
                }}
              >
                {cp?.success_reset_button_label}
              </Button>
            </Stack>
          </MySectionGrid>
        </MySection>
      )}
    </>
  );

  return (
    <OrderChangeLayout
      contentGroups={content_groups}
      application={application}
      details={details}
    />
  );
};
