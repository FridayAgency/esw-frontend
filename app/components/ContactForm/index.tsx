"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../Button";
import Icon from "../Icon";
import { useModal } from "@fridayagency/hooks";

import styles from "./ContactForm.module.scss";
import { useContactForm } from "./useContactForm";
import Container from "../Container";
import parse from "html-react-parser";
import { FormInput, FormTextarea, ProgressBar } from "../FormUI";
import formUIStyles from "../FormUI/FormUI.module.scss";
import { useRouter } from "next/navigation";
import { logError } from "@/utils/logError";
// Helper function to focus first error field
const focusFirstError = (errors: Record<string, string | undefined>, idPrefix = "") => {
  const errorKeys = Object.keys(errors).filter((key) => errors[key]);
  if (errorKeys.length > 0) {
    setTimeout(() => {
      const element = document.getElementById(`${idPrefix}${errorKeys[0]}`);
      element?.focus();
    }, 50);
  }
};

// Step configuration
const STEP_FIELDS = {
  1: ["firstName", "surname"] as const,
  2: ["email", "phone"] as const,
  3: ["message"] as const,
} as const;

const TOTAL_STEPS = 3;

// Modal Component
const ContactFormModal = ({
  isOpen,
  onClose,
  initialData,
  modalRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: { firstName: string; surname: string };
  modalRef: React.RefObject<HTMLDivElement>;
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const firstTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, errors, handleChange, validateFields, setInitialData } = useContactForm();

  // Initialize form data and reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(2);
      setInitialData(initialData);
    }
  }, [isOpen, initialData, setInitialData]);

  // Focus first input when step changes
  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [currentStep, isOpen]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const fields = STEP_FIELDS[currentStep as keyof typeof STEP_FIELDS];
    const { isValid, errors: validationErrors } = validateFields([...fields]);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    } else {
      focusFirstError(validationErrors, "modal-");
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      onClose();
      return;
    }

    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateFields(["message"]);

    if (!isValid) {
      focusFirstError(validationErrors, "modal-");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success && result.data) {
        sessionStorage.setItem("contactSubmission", JSON.stringify(result.data));
        // // Navigate to thank you page
        router.push("/contact-thank-you");
      } else {
        logError("Contact submission failed", result.errors || result.message);
        // TODO: Show error message to user
        alert(result.message || "Failed to submit contact form. Please try again.");
      }
    } catch (error) {
      logError("Error submitting contact form", error);
      // TODO: Show error message to user
      alert("An error occurred while submitting your contact form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return { title: "Send a Message", subtitle: "A member of our team will respond within 24 hours" };
      case 2:
        return {
          title: "Next, please share your contact details ",
          subtitle: "So an expert from our team can get back to you.",
        };
      case 3:
        return {
          title: `Thanks ${formData.firstName}. <br /> What would you like to discuss?`,
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  if (!isOpen) return null;

  const { title, subtitle } = getStepTitle();
  const isFinalStep = currentStep === TOTAL_STEPS;

  return (
    <div className={styles.modal} role="presentation">
      <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="contact-form-title">
        <div className={styles.modal__header}>
          <Container className={styles["modal__header-container"]}>
            <button type="button" onClick={handlePrevious} aria-label="Go to previous step">
              <Icon type="back" /> Back
            </button>

            <ProgressBar
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              className={formUIStyles["progress--desktop"]}
            />

            <div className={styles["modal__header-right"]}>
              <button type="button" onClick={onClose} aria-label="Close contact form">
                <Icon type="close" />
              </button>
            </div>
          </Container>
        </div>

        {/* Progress indicator */}
        <div className={styles.modal__content}>
          <ProgressBar
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            className={formUIStyles["progress--mobile"]}
          />

          {/* Form Header */}
          <div className={styles["modal__content-header"]}>
            <h2 id="contact-form-title">{parse(title)}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <form
            className={styles.modal__form}
            onSubmit={isFinalStep ? handleSubmit : handleNext}
            aria-busy={isSubmitting}
            noValidate
          >
            {/* Step 1: Name and Surname */}
            {currentStep === 1 && (
              <div className={styles["modal__form-group"]} role="group" aria-labelledby="step1-heading">
                <span id="step1-heading" className="visuallyhidden">
                  Personal information
                </span>
                <FormInput
                  id="modal-firstName"
                  label="First Name"
                  placeholder="First Name"
                  value={formData.firstName}
                  error={errors.firstName}
                  onChange={(value) => handleChange("firstName", value)}
                  required
                  inputRef={firstInputRef}
                />
                <FormInput
                  id="modal-surname"
                  label="Surname"
                  placeholder="Surname"
                  value={formData.surname}
                  error={errors.surname}
                  onChange={(value) => handleChange("surname", value)}
                  required
                />
              </div>
            )}

            {/* Step 2: Email and Phone */}
            {currentStep === 2 && (
              <div className={styles["modal__form-group"]} role="group" aria-labelledby="step2-heading">
                <span id="step2-heading" className="visuallyhidden">
                  Contact information
                </span>
                <FormInput
                  id="modal-email"
                  label="Email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  error={errors.email}
                  onChange={(value) => handleChange("email", value)}
                  required
                  inputRef={firstInputRef}
                />
                <FormInput
                  id="modal-phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+353 87 123 4567"
                  value={formData.phone}
                  error={errors.phone}
                  onChange={(value) => handleChange("phone", value)}
                  required
                />
              </div>
            )}

            {/* Step 3: Message */}
            {currentStep === 3 && (
              <div className={styles["modal__form-group"]} role="group" aria-labelledby="step3-heading">
                <span id="step3-heading" className="visuallyhidden">
                  Your message
                </span>
                <FormTextarea
                  id="modal-message"
                  label="Message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  error={errors.message}
                  onChange={(value) => handleChange("message", value)}
                  required
                  textareaRef={firstTextareaRef}
                />
              </div>
            )}

            {/* Navigation buttons */}
            <div className={styles.modal__buttons}>
              <Button
                type="submit"
                colour="blue"
                aria-label={isFinalStep ? "Submit form" : "Go to next step"}
                disabled={isSubmitting}
              >
                {isFinalStep ? (isSubmitting ? "Sending..." : "Send Message") : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Inline Contact Form Component
const Contact = () => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const { isOpen, openModal, closeModal } = useModal(modalRef);
  const { formData, errors, handleChange, validateFields } = useContactForm();

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateFields(["firstName", "surname"]);
    if (isValid) {
      openModal();
    } else {
      focusFirstError(validationErrors);
    }
  };

  return (
    <>
      <div className={styles.contact}>
        <form className={styles.contact__form} onSubmit={handleInlineSubmit} noValidate>
          <FormInput
            id="firstName"
            label="First Name"
            placeholder="First Name"
            value={formData.firstName}
            error={errors.firstName}
            onChange={(value) => handleChange("firstName", value)}
            required
          />
          <FormInput
            id="surname"
            label="Surname"
            placeholder="Surname"
            value={formData.surname}
            error={errors.surname}
            onChange={(value) => handleChange("surname", value)}
            required
          />

          <div className={styles.contact__buttons}>
            <Button type="submit" colour="pink" aria-label="Continue to next step">
              Start your Message
            </Button>
          </div>
        </form>
      </div>

      <ContactFormModal
        isOpen={isOpen}
        onClose={closeModal}
        initialData={{ firstName: formData.firstName, surname: formData.surname }}
        modalRef={modalRef}
      />
    </>
  );
};

export default Contact;
