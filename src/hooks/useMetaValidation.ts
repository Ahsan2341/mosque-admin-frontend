import { Rule } from "antd/lib/form";

export const useMetaValidation = () => {
  const validateLength = (min: number, max: number, fieldName: string): Rule => ({
    validator: (_, value) => {
      if (!value || (value.length >= min && value.length <= max)) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(`${fieldName} must be between ${min} and ${max} characters!`)
      );
    },
  });

  const metaTitleRules: Rule[] = [
    { required: true, message: "Please enter the meta title!" },
    validateLength(50, 60, "Meta Title"),
  ];

  const metaDescriptionRules: Rule[] = [
    { required: true, message: "Please enter the meta description!" },
    validateLength(5, 160, "Meta Description"),
  ];

  return {
    metaTitleRules,
    metaDescriptionRules,
  };
};
