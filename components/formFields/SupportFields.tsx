// components/formFields/SupportFields.tsx
import { useState } from 'react';
import { FieldsType, FieldType, KeyboardType } from '@/types/Types';

const SupportFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: 'name',
      type: FieldType.STRING,
      placeHolder: 'Name',
      label: 'Name',
      error: false,
      value: '',
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: 'email',
      type: FieldType.STRING,
      placeHolder: 'john@example.com',
      label: 'Email Address',
      error: false,
      value: '',
      required: true,
      keyboard: KeyboardType.EMAIL_ADDRESS,
    },
    {
      name: 'subject',
      type: FieldType.STRING,
      placeHolder: 'Subject',
      label: 'Subject',
      error: false,
      value: '',
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: 'message',
      type: FieldType.STRING,
      placeHolder: 'Describe your issue or question...',
      label: 'Message',
      error: false,
      value: '',
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);

  return { fields, setFields };
};

export default SupportFields;
