import type { BaseContentGroup } from '../OrderChangeLayout.types';

export interface HardwareSwapProps {
  application: 'simpel.order.change.wifi.extenders.hardware.swap';
  content_parameters: Record<string, unknown>;
  content_groups: BaseContentGroup[];
}

export interface ReturnSectionContentGroup extends BaseContentGroup {
  content_parameters: {
    title: string;
    description: string;
    return_label: string;
  };
}

export interface HardwareSwapItem {
  id: string;
  name: string;
  serialNumber: string;
  status: string;
  iconName: 'Modem' | 'TV Box' | 'Wifi';
}

export interface HardwareSwapContentGroup extends BaseContentGroup {
  content_parameters: {
    select_device_title: string;
    select_device_description: string;
    selected_label: string;
    reason_title: string;
    reason_description_before_name: string;
    reason_description_after_name: string;
    reason_1: string;
    reason_2: string;
    reason_3: string;
    reason_4: string;
    instructions_title: string;
    instructions_box_heading: string;
    instruction_1: string;
    instruction_2: string;
    instruction_3: string;
    instruction_4: string;
    confirm_button_label: string;
    success_title: string;
    success_box_heading_before_name: string;
    success_box_heading_after_name: string;
    success_description: string;
    success_reason_label: string;
    success_reset_button_label: string;
  };
}

export interface HardwareDeviceContentGroup extends BaseContentGroup {
  content_parameters: {
    device_name: string;
    serial_number: string;
    status: string;
    icon_name: string;
  };
}

export interface HardwareDevicesSection extends BaseContentGroup {
  content_groups: HardwareDeviceContentGroup[];
}
