"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Container from "../../Container";
import ImageWithTexture from "../../ImageWithTexture/Index";
import styles from "./ApplicationProcess.module.scss";
import { ClassName } from "@fridayagency/classnames";
import { PagePanelsPagePanelsApplicationProcessLayout } from "@/types/graphql";
import Divider from "../../Divider";
import parse from "html-react-parser";

interface ApplicationProcessClientProps {
  panel: PagePanelsPagePanelsApplicationProcessLayout;
}

const ApplicationProcessClient: React.FC<ApplicationProcessClientProps> = ({ panel }) => {
  const { title, process, image } = panel;
  const steps = process ?? [];

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
          <Divider />
          <h2 className={styles["application-process__heading"]}>{title ?? "Our Application Process"}</h2>

          <div role="tablist" aria-label="Application process steps" className={styles["application-process__tabs"]}>
            {steps.map((step, index) => {
              if (!step) return null;
              const isActive = activeStep === index;
              const tabClass = new ClassName([styles["application-process__tab"]]);
              if (isActive) tabClass.add(styles["application-process__tab--active"]);

              return (
                <button
                  key={index}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  role="tab"
                  id={`step-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls={`step-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  className={tabClass.toString()}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {steps.map((step, index) => {
            if (!step) return null;
            return (
              <div
                key={index}
                role="tabpanel"
                id={`step-panel-${index}`}
                aria-labelledby={`step-tab-${index}`}
                hidden={activeStep !== index}
                className={styles["application-process__panel"]}
              >
                <h3 className={styles["application-process__step-title"]}>{step.title}</h3>
                <span suppressHydrationWarning className={styles["application-process__step-description"]}>
                  {parse(step.copy ?? "")}
                </span>
              </div>
            );
          })}
        </div>
        {image && image.node && (
          <div className={styles["application-process__image"]} aria-hidden="true">
            <ImageWithTexture image={image?.node} variant="frame" />
          </div>
        )}
      </Container>
    </section>
  );
};

export default ApplicationProcessClient;
