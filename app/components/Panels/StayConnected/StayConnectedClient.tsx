"use client";

import { useState } from "react";
import Container from "../../Container";
import Button from "../../Button";
import FormInput from "../../FormUI/FormInput";
import FileUpload from "../../FileUpload";
import styles from "./StayConnected.module.scss";

interface FormState {
  name: string;
  email: string;
  areaOfInterest: string;
  cv: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  areaOfInterest?: string;
  cv?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name";
  if (!form.email.trim()) {
    errors.email = "Please enter your email address";
  } else if (!EMAIL_RE.test(form.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!form.areaOfInterest.trim()) errors.areaOfInterest = "Please enter your area of interest";
  if (!form.cv) errors.cv = "Please upload your CV";
  return errors;
}

interface StayConnectedClientProps {
  title?: string;
  copy?: string;
}

const StayConnectedClient: React.FC<StayConnectedClientProps> = ({ title, copy }) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    areaOfInterest: "",
    cv: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleChange = (field: keyof FormErrors) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setSubmitStatus("submitting");

    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("areaOfInterest", form.areaOfInterest);
      if (form.cv) body.append("cv", form.cv);

      const response = await fetch("/api/greenhouse", { method: "POST", body });

      console.log(response);

      if (!response.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <section className={styles.stayConnected}>
      <Container className={styles.stayConnected__container}>
        <div className={styles.stayConnected__card}>
          {submitStatus === "success" ? (
            <div className={styles.stayConnected__header}>
              <h2 className={styles.stayConnected__title}>{"Great! Thanks for sharing your details."}</h2>
              <p className={styles.stayConnected__subtitle}>
                {"We'll reach out if or when the right opportunity comes up."}
              </p>
            </div>
          ) : (
            <>
              <div className={styles.stayConnected__header}>
                <h2 className={styles.stayConnected__title}>{title ?? "Stay connected"}</h2>
                <p className={styles.stayConnected__subtitle}>
                  {copy ??
                    "Didn't find the right role today? Share your details and we'll reach out when the right opportunity comes up."}
                </p>
              </div>
              <form className={styles.stayConnected__form} onSubmit={handleSubmit} noValidate>
                <div className={styles.stayConnected__section}>
                  <div className={styles.stayConnected__fields}>
                    <FormInput
                      id="stay-connected-name"
                      label="Your Name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                      theme="dark"
                    />
                    <FormInput
                      id="stay-connected-email"
                      label="Your Email Address"
                      type="email"
                      placeholder="john@email.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      error={errors.email}
                      theme="dark"
                    />
                    <FormInput
                      id="stay-connected-area"
                      label="Area of Interest"
                      placeholder="e.g Marketing, Sales"
                      value={form.areaOfInterest}
                      onChange={handleChange("areaOfInterest")}
                      error={errors.areaOfInterest}
                      theme="dark"
                    />
                  </div>

                  <FileUpload
                    id="stay-connected-cv"
                    label="Upload your CV"
                    accept=".pdf,.doc,.docx,.rtf,.odt"
                    hint="PDF, DOC, DOCX, RTF or ODT up to 10MB"
                    error={errors.cv}
                    onChange={(file) => {
                      setForm((prev) => ({ ...prev, cv: file }));
                      if (file) setErrors((prev) => ({ ...prev, cv: undefined }));
                    }}
                  />
                </div>

                <div className={styles.stayConnected__cta}>
                  <Button type="submit" variant="primary" disabled={submitStatus === "submitting"}>
                    {submitStatus === "submitting" ? "Sending…" : "Keep Me Informed"}
                  </Button>
                  {submitStatus === "error" && (
                    <p className={styles["stayConnected__error-message"]}>
                      {"Something went wrong. Please try again."}
                    </p>
                  )}
                  <p className={styles.stayConnected__disclaimer}>
                    {"We'll only contact you about relevant opportunities. You can unsubscribe anytime."}
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default StayConnectedClient;
