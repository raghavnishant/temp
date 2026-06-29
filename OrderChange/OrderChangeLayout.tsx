'use client';

import { RichText } from '@odido-portals/cms-content-view/render';
import {
  Accordion,
  AccordionPanel,
} from '@odido-portals/glow-react-web/accordion';
import { Addon } from '@odido-portals/glow-react-web/addon';
import { AddonList } from '@odido-portals/glow-react-web/addon-list';
import { Box } from '@odido-portals/glow-react-web/box';
import { Button } from '@odido-portals/glow-react-web/button';
import { DefaultList } from '@odido-portals/glow-react-web/default-list';
import { Heading } from '@odido-portals/glow-react-web/heading';
import { List, ListItem } from '@odido-portals/glow-react-web/list';
import {
  MySection,
  MySectionGrid,
} from '@odido-portals/glow-react-web/my-section';
import { Paragraph } from '@odido-portals/glow-react-web/paragraph';
import {
  ProgressBar,
  ProgressBarStep,
} from '@odido-portals/glow-react-web/progressbar';
import { Stack } from '@odido-portals/glow-react-web/stack';
import { TextLink } from '@odido-portals/glow-react-web/text-link';
import { type ReactNode, useState } from 'react';
import type {
  BaseContentGroup,
  OrderChangeFaqContentGroup,
  OrderChangeHeaderContentGroup,
  OrderChangeQuestionsContentGroup,
  OrderChangeStatusContentGroup,
  OrderContentGroup,
  SubscriptionContentGroup,
} from './OrderChangeLayout.types';

const STEP_PROGRESS_MAP: Record<string, 20 | 50 | 100> = {
  '1': 20,
  '2': 50,
  '3': 100,
};

type Step = '1' | '2' | '3';

interface OrderChangeLayoutProps {
  contentGroups: BaseContentGroup[];
  details?: ReactNode;
  application?: string;
}

export const OrderChangeLayout = ({
  contentGroups,
  details,
  application,
}: OrderChangeLayoutProps) => {
  const headerContent = contentGroups.find(
    (grp) => grp.name === 'header_section',
  ) as OrderChangeHeaderContentGroup;
  const statusContent = contentGroups.find(
    (grp) => grp.name === 'status_section',
  ) as OrderChangeStatusContentGroup;
  const faqContent = contentGroups.find(
    (grp) => grp.name === 'faq_section',
  ) as OrderChangeFaqContentGroup;
  const questionsContent = contentGroups.find(
    (grp) => grp.name === 'questions_section',
  ) as OrderChangeQuestionsContentGroup;
  const subscriptionContent = contentGroups.find(
    (grp) => grp.name === 'my_subscription_section',
  ) as SubscriptionContentGroup;
  const orderContent = contentGroups.find(
    (grp) => grp.name === 'my_order_section',
  ) as OrderContentGroup;

  const [currentStep, _setCurrentStep] = useState<Step>(
    (statusContent?.content_parameters?.current_step as Step) ?? '1',
  );
  const progress = STEP_PROGRESS_MAP[currentStep] ?? 20;

  // Handle both dot-separated (simpel.order.change.wifi.extenders.*) and
  // underscore-separated (simpel_order_change_wifi_extenders_*) application keys.
  const isWifiExtenders =
    application?.includes('wifi_extenders') ||
    application?.includes('wifi.extenders');
  const isHardwareSwap =
    application?.includes('hardware_swap') ||
    application?.includes('hardware.swap');
  const subscriptionIcon =
    isWifiExtenders && !isHardwareSwap ? 'Remote Setting' : 'Wifi';

  return (
    <>
      <MySection>
        <MySectionGrid>
          <Stack gap='default'>
            <div>
              <TextLink href='#'>&lt; Terug</TextLink>
            </div>
            <Heading size='xl' as='h1'>
              {headerContent?.content_parameters?.page_title}
            </Heading>
            <Paragraph size='xs'>
              {headerContent?.content_parameters?.last_updated_label}
            </Paragraph>
          </Stack>
        </MySectionGrid>
      </MySection>

      <MySection
        title={{
          text: statusContent?.content_parameters?.title ?? '',
          size: 'lg',
        }}
      >
        <MySectionGrid>
          <Paragraph>
            {statusContent?.content_parameters?.[`description_${currentStep}`]}
          </Paragraph>
          {statusContent?.content_parameters?.qr_code_button_label ? (
            <Button prominence='secondary'>
              {statusContent.content_parameters.qr_code_button_label}
            </Button>
          ) : null}

          <ProgressBar palette='default' progress={progress}>
            <ProgressBarStep
              active={currentStep === '1'}
              title={statusContent?.content_parameters?.step_1 ?? ''}
            />
            <ProgressBarStep
              active={currentStep === '2'}
              title={statusContent?.content_parameters?.step_2 ?? ''}
            />
            <ProgressBarStep
              active={currentStep === '3'}
              title={statusContent?.content_parameters?.step_3 ?? ''}
            />
          </ProgressBar>
        </MySectionGrid>
      </MySection>

      {subscriptionContent && (
        <MySection
          title={{
            text: subscriptionContent.content_parameters.title ?? '',
            size: 'lg',
          }}
        >
          <MySectionGrid>
            <AddonList
              items={[
                {
                  addOn: <Addon name={subscriptionIcon} size='sm' />,
                  attention: subscriptionContent.content_parameters
                    .product_description
                    ? {
                        text: subscriptionContent.content_parameters
                          .product_description,
                        variant: 'success',
                      }
                    : undefined,
                  title: subscriptionContent.content_parameters.product_name,
                },
              ]}
              onListItemClick={() => {}}
            />
          </MySectionGrid>
        </MySection>
      )}

      {details}

      {orderContent && (
        <MySection
          title={{
            text: orderContent.content_parameters.title ?? '',
            size: 'lg',
          }}
        >
          <MySectionGrid>
            <List background='none'>
              <ListItem
                bottomDivider={true}
                text={orderContent.content_parameters.order_number_label}
                detail='1402 3721'
              />
              <ListItem
                bottomDivider={true}
                text={orderContent.content_parameters.order_date_label}
                detail='9 april 2026'
              />
              {orderContent.content_parameters.address_label ? (
                <ListItem
                  bottomDivider={true}
                  text={orderContent.content_parameters.address_label}
                  detail={'Charlie Smith\nVan der Duinstraat 187\n3456NH Haarlem'}
                />
              ) : null}
            </List>
          </MySectionGrid>
        </MySection>
      )}

      <MySection
        title={{
          text: faqContent?.content_parameters?.title ?? '',
          size: 'lg',
        }}
      >
        <MySectionGrid>
          <Accordion>
            <AccordionPanel title={faqContent?.content_parameters?.q1 ?? ''}>
              <Paragraph>{faqContent?.content_parameters?.q1_answer}</Paragraph>
            </AccordionPanel>
            <AccordionPanel title={faqContent?.content_parameters?.q2 ?? ''}>
              {faqContent?.content_parameters?.q2_answer ? (
                typeof faqContent.content_parameters.q2_answer === 'string' ? (
                  <Paragraph>
                    {faqContent.content_parameters.q2_answer}
                  </Paragraph>
                ) : (
                  <RichText content={faqContent.content_parameters.q2_answer} />
                )
              ) : null}
            </AccordionPanel>
            <AccordionPanel title={faqContent?.content_parameters?.q3 ?? ''}>
              <Paragraph>{faqContent?.content_parameters?.q3_answer}</Paragraph>
            </AccordionPanel>
            {faqContent?.content_parameters?.q4 && (
              <AccordionPanel title={faqContent.content_parameters.q4}>
                <Paragraph>{faqContent.content_parameters.q4_answer}</Paragraph>
              </AccordionPanel>
            )}
            {faqContent?.content_parameters?.q5 && (
              <AccordionPanel title={faqContent.content_parameters.q5}>
                <Paragraph>{faqContent.content_parameters.q5_answer}</Paragraph>
              </AccordionPanel>
            )}
          </Accordion>
        </MySectionGrid>
      </MySection>

      <MySection>
        <MySectionGrid>
          <Box palette='purple' prominence='color' size='default'>
            <Stack gap='default' alignItems='stretch'>
              <Heading size='md' as='h3'>
                {questionsContent?.content_parameters?.title ?? ''}
              </Heading>
              <Paragraph>
                {questionsContent?.content_parameters?.description}
              </Paragraph>
              <DefaultList
                items={[
                  {
                    icon: 'checkmark',
                    text: questionsContent?.content_parameters?.hours_1 ?? '',
                  },
                  {
                    icon: 'checkmark',
                    text: questionsContent?.content_parameters?.hours_2 ?? '',
                  },
                ]}
                variant='icon'
              />
              <Stack
                direction={{ mobile: 'column', tablet: 'row' }}
                gap='default'
                alignItems='stretch'
              >
                <Button
                  as='a'
                  href={questionsContent?.content_parameters?.cta_link ?? ''}
                  fill={{ mobile: true, tablet: false }}
                >
                  {questionsContent?.content_parameters?.cta_label}
                </Button>
                <Button
                  as='a'
                  href={questionsContent?.content_parameters?.cta_2_link ?? ''}
                  prominence='secondary'
                  fill={{ mobile: true, tablet: false }}
                >
                  {questionsContent?.content_parameters?.cta_2_label}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </MySectionGrid>
      </MySection>
    </>
  );
};
