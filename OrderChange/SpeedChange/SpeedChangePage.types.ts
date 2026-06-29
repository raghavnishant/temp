import type { BaseContentGroup } from '../OrderChangeLayout.types';

export interface SpeedChangeProps {
  application:
    | 'simpel_order_change_speed_downgrade'
    | 'simpel_order_change_speed_upgrade';
  content_parameters: Record<string, unknown>;
  content_groups: BaseContentGroup[];
}

export interface SubscriptionContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    product_name: string;
    product_description: string;
  };
}

export interface OrderContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    order_number_label: string;
    order_date_label: string;
  };
}
