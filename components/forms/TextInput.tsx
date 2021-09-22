import { FormItem, Input } from "formik-antd";
import React from "react";
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default function TextInput({ name, label, ...props }) {
  return (
    <FormItem  {...layout} name={name} label={label}>
      <Input name={name} {...props}  />
    </FormItem>
  );
}
