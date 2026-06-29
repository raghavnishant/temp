export interface BaseContentGroup {
  name: string;
  content_parameters: Record<string, string>;
  content_groups: BaseContentGroup[];
}

export interface OrderChangeHeaderContentGroup extends BaseContentGroup {
  content_parameters: {
    page_title: string;
    last_updated_label: string;
  };
}

export interface OrderChangeStatusContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    description_1: string;
    description_2?: string;
    description_3?: string;
    current_step: string;
    step_1: string;
    step_2: string;
    step_3: string;
    qr_code_button_label?: string;
  };
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

export interface OrderChangeFaqContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    q1: string;
    q1_answer?: string;
    q2: string;
    q2_answer?: string;
    q3: string;
    q3_answer?: string;
    q4?: string;
    q4_answer?: string;
    q5?: string;
    q5_answer?: string;
  };
}

export interface OrderChangeQuestionsContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    description: string;
    hours_1: string;
    hours_2: string;
    cta_label: string;
    cta_link: string;
    cta_2_label: string;
    cta_2_link: string;
  };
}
