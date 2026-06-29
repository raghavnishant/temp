'use client';

import { Addon } from '@odido-portals/glow-react-web/addon';
import { AddonList } from '@odido-portals/glow-react-web/addon-list';
import { List, ListItem } from '@odido-portals/glow-react-web/list';
import {
  MySection,
  MySectionGrid,
} from '@odido-portals/glow-react-web/my-section';
import { OrderChangeLayout } from '../OrderChangeLayout';
import type {
  OrderContentGroup,
  ReturnInfoContentGroup,
  ReturnProductsContentGroup,
  SubscriptionContentGroup,
  WifiExtendersCancellationProps,
} from './WifiExtendersCancellationPage.types';

export const WifiExtendersCancellationContainer = ({
  content_groups,
}: WifiExtendersCancellationProps) => {
  const subscriptionContent = content_groups.find(
    (grp) => grp.name === 'my_subscription_section',
  ) as SubscriptionContentGroup;
  const returnProductsContent = content_groups.find(
    (grp) => grp.name === 'return_products_section',
  ) as ReturnProductsContentGroup;
  const returnInfoContent = content_groups.find(
    (grp) => grp.name === 'return_info_section',
  ) as ReturnInfoContentGroup;
  const orderContent = content_groups.find(
    (grp) => grp.name === 'my_order_section',
  ) as OrderContentGroup;

  return (
    <OrderChangeLayout contentGroups={content_groups}>
      <MySection
        title={{
          text: subscriptionContent?.content_parameters?.title ?? '',
          size: 'md',
        }}
      >
        <MySectionGrid>
          <AddonList
            items={[
              {
                addOn: <Addon name='Remote Setting' size='sm' />,
                attention: {
                  text:
                    subscriptionContent?.content_parameters
                      ?.product_description ?? '',
                  variant: 'success',
                },
                title:
                  subscriptionContent?.content_parameters?.product_name ?? '',
                variant: 'added',
              },
            ]}
            onListItemClick={() => {}}
          />
        </MySectionGrid>
      </MySection>

      <MySection
        title={{
          text: returnProductsContent?.content_parameters?.title ?? '',
          size: 'md',
        }}
      >
        <MySectionGrid>
          <List background='none'>
            <ListItem
              bottomDivider={true}
              text={
                returnProductsContent?.content_parameters
                  ?.return_before_label ?? ''
              }
            />
            <ListItem
              bottomDivider={true}
              text={
                returnProductsContent?.content_parameters?.received_on_label ??
                ''
              }
            />
          </List>
        </MySectionGrid>
      </MySection>

      <MySection
        title={{
          text: returnInfoContent?.content_parameters?.title ?? '',
          size: 'md',
        }}
      >
        <MySectionGrid>
          <List background='none'>
            <ListItem
              bottomDivider={true}
              clickable
              iconRight='arrow-right'
              text={returnInfoContent?.content_parameters?.link_1_label ?? ''}
            />
            <ListItem
              bottomDivider={true}
              clickable
              iconRight='arrow-right'
              text={returnInfoContent?.content_parameters?.link_2_label ?? ''}
            />
            <ListItem
              bottomDivider={true}
              clickable
              iconRight='arrow-right'
              text={returnInfoContent?.content_parameters?.link_3_label ?? ''}
            />
            <ListItem
              bottomDivider={true}
              clickable
              iconRight='arrow-right'
              text={returnInfoContent?.content_parameters?.link_4_label ?? ''}
            />
          </List>
        </MySectionGrid>
      </MySection>

      <MySection
        title={{
          text: orderContent?.content_parameters?.title ?? '',
          size: 'md',
        }}
      >
        <MySectionGrid>
          <List background='none'>
            <ListItem
              bottomDivider={true}
              text={orderContent?.content_parameters?.order_number_label ?? ''}
            />
            <ListItem
              bottomDivider={true}
              text={orderContent?.content_parameters?.order_date_label ?? ''}
            />
          </List>
        </MySectionGrid>
      </MySection>
    </OrderChangeLayout>
  );
};
