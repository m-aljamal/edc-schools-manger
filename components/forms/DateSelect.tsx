import { DatePicker, FormItem } from "formik-antd";

export default function DateSelect({ name, label }) {
  return (
    <FormItem name={name} label={label}>
      <DatePicker name={name} placeholder="اختر تاريخ" />
    </FormItem>
  );
}
