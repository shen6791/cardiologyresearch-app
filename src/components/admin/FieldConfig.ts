export type FieldType = 'text' | 'textarea' | 'number' | 'url' | 'checkbox';

export type Field = {
  name: string;
  label: string;
  type: FieldType;
};
