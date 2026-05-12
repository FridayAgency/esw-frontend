"use client";

import { useRef, useState, useEffect, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import styles from "./LanguageSwitcher.module.scss";

interface GlopalMarket {
  countryCode: string;
  locale: string;
  label?: string;
  url: string;
}

declare global {
  interface Window {
    glopal?: {
      config?: {
        target?: {
          countryCode: string;
          locale: string;
        };
        markets?: GlopalMarket[];
      };
    };
  }
}

const FALLBACK_MARKETS: GlopalMarket[] = [
  { countryCode: "GB", locale: "EN-UK", label: "EN-UK", url: "#" },
  { countryCode: "US", locale: "EN-US", label: "EN-US", url: "#" },
  { countryCode: "ES", locale: "ES", label: "ES", url: "#" },
  { countryCode: "DE", locale: "DE", label: "DE", url: "#" },
  { countryCode: "FR", locale: "FR", label: "FR", url: "#" },
  { countryCode: "PT", locale: "PT", label: "PT", url: "#" },
];

interface LanguageSwitcherProps {
  className?: string;
}

interface DropdownPos {
  top: number;
  right: number;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<DropdownPos | null>(null);
  const [currentLabel, setCurrentLabel] = useState("EN");
  const [markets, setMarkets] = useState<GlopalMarket[]>([]);

  useEffect(() => {
    const glopalConfig = window.glopal?.config;

    const target = glopalConfig?.target;
    const availableMarkets = glopalConfig?.markets ?? FALLBACK_MARKETS;

    if (target?.locale) {
      setCurrentLabel(target.locale.toUpperCase());
    }
    setMarkets(availableMarkets);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = ref.current?.contains(target);
      const insideDropdown = listRef.current?.contains(target);
      if (!insideTrigger && !insideDropdown) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Move focus to active or first option when menu opens
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const active = listRef.current.querySelector<HTMLButtonElement>('[aria-current="true"]');
    const first = listRef.current.querySelector<HTMLButtonElement>("button");
    (active ?? first)?.focus();
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  }, []);

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const items = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
      const idx = items.indexOf(document.activeElement as HTMLButtonElement);

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowDown":
          e.preventDefault();
          items[(idx + 1) % items.length]?.focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length]?.focus();
          break;
        case "Home":
          e.preventDefault();
          items[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
        case "Tab":
          close();
          break;
      }
    },
    [close],
  );

  const handleSwitch = useCallback((url: string) => {
    window.location.href = url;
  }, []);

  const localeToLang = (locale: string, countryCode: string): string => {
    const lang = locale.split("-")[0].toLowerCase();
    return countryCode ? `${lang}-${countryCode.toUpperCase()}` : lang;
  };

  return (
    <div ref={ref} className={`${styles["language-switcher"]} ${className ?? ""}`}>
      <button
        suppressHydrationWarning
        ref={triggerRef}
        className={styles["language-switcher__trigger"]}
        onClick={() => {
          if (!isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setDropdownPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
          }
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Select language, current language: ${currentLabel}`}
      >
        <svg
          className={styles["language-switcher__globe"]}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="10" cy="10" rx="3.5" ry="7.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span aria-hidden="true" suppressHydrationWarning>{currentLabel}</span>
        <svg
          className={`${styles["language-switcher__chevron"]} ${isOpen ? styles["language-switcher__chevron--up"] : ""}`}
          width="17"
          height="17"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M10.0001 13.0343L10.5314 12.5718L15.5314 8.17182L14.4689 6.96558L10.0001 10.8968L5.53125 6.96558L4.46875 8.17182L9.46875 12.5718L10.0001 13.0343Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen &&
        markets.length > 0 &&
        dropdownPos &&
        createPortal(
          <ul
            ref={listRef}
            className={styles["language-switcher__dropdown"]}
            role="menu"
            aria-label="Select language"
            onKeyDown={handleMenuKeyDown}
            style={{ top: dropdownPos.top, right: dropdownPos.right }}
          >
            {markets.map((market) => {
              const label = market.label ?? market.locale.toUpperCase();
              const isActive = market.locale.toUpperCase() === currentLabel;
              return (
                <li key={market.locale} role="none">
                  <button
                    className={`${styles["language-switcher__option"]} ${isActive ? styles["language-switcher__option--active"] : ""}`}
                    role="menuitem"
                    aria-current={isActive ? "true" : undefined}
                    lang={localeToLang(market.locale, market.countryCode)}
                    onClick={() => handleSwitch(market.url)}
                    tabIndex={-1}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
};

export default LanguageSwitcher;
