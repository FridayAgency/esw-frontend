import { useState, FormEvent } from "react";

interface FormData {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: string | undefined;
}

type ValidationRule = {
  required?: string;
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
};

const validationRules: Record<keyof FormData, ValidationRule> = {
  firstName: {
    required: "First name is required",
    minLength: { value: 2, message: "First name must be at least 2 characters" },
  },
  surname: {
    required: "Surname is required",
    minLength: { value: 2, message: "Surname must be at least 2 characters" },
  },
  email: {
    required: "Email is required",
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" },
  },
  phone: {
    required: "Phone number is required",
    pattern: { value: /^[\d\s\-+()]{10,}$/, message: "Please enter a valid phone number" },
  },
  message: {
    required: "Message is required",
    minLength: { value: 10, message: "Message must be at least 10 characters" },
  },
};

const validateField = (field: keyof FormData, value: string): string | undefined => {
  const rules = validationRules[field];
  const trimmedValue = value.trim();

  if (rules.required && !trimmedValue) {
    return rules.required;
  }

  if (rules.minLength && trimmedValue.length < rules.minLength.value) {
    return rules.minLength.message;
  }

  if (rules.pattern && !rules.pattern.value.test(value)) {
    return rules.pattern.message;
  }

  return undefined;
};

export const useContactForm = (onSubmitSuccess?: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateFields = (fields: (keyof FormData)[]): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (fields: (keyof FormData)[], onSuccess: () => void) => (e: FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateFields(fields);

    if (isValid) {
      onSuccess();
    } else {
      return validationErrors;
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
  };

  const setInitialData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    validateFields,
    resetForm,
    setInitialData,
  };
};
