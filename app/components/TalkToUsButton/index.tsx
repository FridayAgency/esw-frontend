"use client";

import { useRef } from "react";
import { useModal } from "@fridayagency/hooks";

import CtaButton from "../CtaButton";
import TalkToUsModal from "../Navigation/TalkToUsModal";

const TalkToUsButton: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const { isOpen, openModal, closeModal } = useModal(modalRef);

  return (
    <>
      <CtaButton onClick={openModal} aria-haspopup="dialog" aria-expanded={isOpen}>
        Talk to Us
      </CtaButton>
      {isOpen && <TalkToUsModal ref={modalRef} onClose={closeModal} />}
    </>
  );
};

export default TalkToUsButton;
