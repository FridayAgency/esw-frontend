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
    title: "Submit an application",
    description:
      "Our talent acquisition team will review your application and provide a response within 14 days of submission if your skills align with our needs.",
  },
  {
    id: 2,
    title: "Initial screening",
    description:
      "A member of our talent acquisition team will reach out to schedule a brief introductory call to discuss your background and the role in more detail.",
  },
  {
    id: 3,
    title: "First interview",
    description:
      "Meet with the hiring manager and a team member for an in-depth conversation about your experience, skills, and how you might contribute to our team.",
  },
  {
    id: 4,
    title: "Skills assessment",
    description:
      "Depending on the role, you may be asked to complete a practical assessment or case study to demonstrate your technical or functional expertise.",
  },
  {
    id: 5,
    title: "Final interview",
    description:
      "A final conversation with senior leadership to ensure alignment on values, culture, and long-term career aspirations within ESW.",
  },
  {
    id: 6,
    title: "Offer & onboarding",
    description:
      "Congratulations! You'll receive a formal offer and be guided through our comprehensive onboarding programme to set you up for success from day one.",
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
