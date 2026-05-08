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

const StayConnected = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    areaOfInterest: "",
    cv: null,
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up form submission
  };

  return (
    <section className={styles.stayConnected}>
      <Container className={styles.stayConnected__container}>
        <div className={styles.stayConnected__card}>
          <div className={styles.stayConnected__header}>
            <h2 className={styles.stayConnected__title}>Stay connected</h2>
            <p className={styles.stayConnected__subtitle}>
              {
                "Didn't find the right role today? Share your details and we'll reach out when the right opportunity comes up."
              }
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
                  onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
                  theme="dark"
                />
                <FormInput
                  id="stay-connected-email"
                  label="Your Email Address"
                  type="email"
                  placeholder="john@email.com"
                  value={form.email}
                  onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                  theme="dark"
                />
                <FormInput
                  id="stay-connected-area"
                  label="Area of Interest"
                  placeholder="e.g Marketing, Sales"
                  value={form.areaOfInterest}
                  onChange={(value) => setForm((prev) => ({ ...prev, areaOfInterest: value }))}
                  theme="dark"
                />
              </div>

              <FileUpload
                id="stay-connected-cv"
                label="Upload your CV"
                onChange={(file) => setForm((prev) => ({ ...prev, cv: file }))}
              />
            </div>

            <div className={styles.stayConnected__cta}>
              <Button type="submit" variant="primary">
                Keep Me Informed
              </Button>
              <p className={styles.stayConnected__disclaimer}>
                {"We'll only contact you about relevant opportunities. You can unsubscribe anytime."}
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default StayConnected;
