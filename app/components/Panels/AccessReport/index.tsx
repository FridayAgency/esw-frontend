"use client";

import { useState } from "react";
import Container from "../../Container";
import FormInput from "../../FormUI/FormInput";
import Button from "../../Button";
import styles from "./AccessReport.module.scss";

const AccessReport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles["access-report"]}>
      <div className={styles["access-report__dots"]} aria-hidden="true" />
      <Container className={styles["access-report__container"]}>
        <div className={styles["access-report__card"]}>
          <div className={styles["access-report__inner"]}>
            <div className={styles["access-report__heading"]}>
              <div className={styles["access-report__title-group"]}>
                <h2 className={styles["access-report__title"]}>Access the Full Report</h2>
                <p className={styles["access-report__subtitle"]}>
                  Get instant access to the complete findings and analysis.
                </p>
              </div>
              {!submitted && (
                <form id="access-report-form" onSubmit={handleSubmit} className={styles["access-report__fields"]} noValidate>
                  <FormInput
                    id="access-report-name"
                    label="Name"
                    placeholder="John Smith"
                    value={name}
                    onChange={setName}
                    required
                    theme="dark"
                  />
                  <FormInput
                    id="access-report-email"
                    label="Business Email"
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={setEmail}
                    required
                    theme="dark"
                  />
                </form>
              )}
            </div>
            {submitted ? (
              <p className={styles["access-report__success"]}>
                Thank you! The report has been sent to {email}.
              </p>
            ) : (
              <div className={styles["access-report__footer"]}>
                <Button variant="primary" type="submit" form="access-report-form">
                  Email the Report
                </Button>
                <p className={styles["access-report__note"]}>Instant download. No spam.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AccessReport;
