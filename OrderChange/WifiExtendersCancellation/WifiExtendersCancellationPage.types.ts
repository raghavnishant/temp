import type { BaseContentGroup } from '../OrderChangeLayout.types';

export interface WifiExtendersCancellationProps {
  application: 'simpel_order_change_wifi_extenders_cancelled';
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

export interface ReturnProductsContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    return_before_label: string;
    received_on_label: string;
  };
}

export interface ReturnInfoContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    link_1_label: string;
    link_2_label: string;
    link_3_label: string;
    link_4_label: string;
  };
}

export interface OrderContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    order_number_label: string;
    order_date_label: string;
  };
}
