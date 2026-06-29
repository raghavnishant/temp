import type { BaseContentGroup } from '../OrderChangeLayout.types';

export interface WifiExtendersOrderedProps {
  application: 'simpel_order_change_wifi_extenders_ordered';
  content_parameters: Record<string, unknown>;
  content_groups: BaseContentGroup[];
}

export interface SubscriptionContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    product_name: string;
    product_description?: string;
  };
}

export interface OrderContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    order_number_label: string;
    order_date_label: string;
    address_label: string;
  };
}
