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
  SpeedChangeProps,
  SubscriptionContentGroup,
} from './SpeedChangePage.types';

export const SpeedChangeContainer = ({ content_groups }: SpeedChangeProps) => {
  const subscriptionContent = content_groups.find(
    (grp) => grp.name === 'my_subscription_section',
  ) as SubscriptionContentGroup;
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
                addOn: <Addon name='Wifi' size='sm' />,
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
