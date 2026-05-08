"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Container from "../../Container";
import ImageWithTexture from "../../ImageWithTexture/Index";
import styles from "./ApplicationProcess.module.scss";
import { ClassName } from "@fridayagency/classnames";

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Apply",
    description:
      "Start by applying for a role that matches your skills and interests.",
  },
  {
    id: 2,
    title: "Recruiter Review",
    description:
      "If your profile looks like a good fit, a member of our Talent Acquisition team will reach out for a first conversation.",
  },
  {
    id: 3,
    title: "Interview",
    description:
      "Our interview process is designed to be structured, fair and relevant to the role. Depending on the position, this may include one or more interviews, typically a mix of virtual and in‑person conversations.",
  },
  {
    id: 4,
    title: "Feedback",
    description:
      "After each stage, we aim to keep you informed and provide an update on next steps as quickly as possible.",
  },
  {
    id: 5,
    title: "Offer",
    description:
      "If everything aligns, we’ll be delighted to make you an offer.",
  },
];

const ApplicationProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      newIndex = (index + 1) % steps.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      newIndex = (index - 1 + steps.length) % steps.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = steps.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveStep(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <section className={styles["application-process"]}>
      <Container className={styles["application-process__container"]}>
        <div className={styles["application-process__content"]}>
          <div className={styles["application-process__divider"]} aria-hidden="true" />
          <h2 className={styles["application-process__heading"]}>Our Application Process</h2>

          <div role="tablist" aria-label="Application process steps" className={styles["application-process__tabs"]}>
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const tabClass = new ClassName([styles["application-process__tab"]]);
              if (isActive) tabClass.add(styles["application-process__tab--active"]);

              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  role="tab"
                  id={`step-tab-${step.id}`}
                  aria-selected={isActive}
                  aria-controls={`step-panel-${step.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={tabClass.toString()}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {step.id}
                </button>
              );
            })}
          </div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              role="tabpanel"
              id={`step-panel-${step.id}`}
              aria-labelledby={`step-tab-${step.id}`}
              hidden={activeStep !== index}
              className={styles["application-process__panel"]}
            >
              <h3 className={styles["application-process__step-title"]}>{step.title}</h3>
              <p className={styles["application-process__step-description"]}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles["application-process__image"]} aria-hidden="true">
          {/* <ImageWithTexture /> */}
        </div>
      </Container>
    </section>
  );
};

export default ApplicationProcess;
