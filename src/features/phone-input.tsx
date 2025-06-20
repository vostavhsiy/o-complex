"use client";

import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { LC_PHONE_KEY } from "@/shared/lib/utils/constants";

//@ts-ignore
interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value = "",
  onChange,
  className = "",
  placeholder,
  type,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(formatPhoneNumber(value));
    }
  }, [value]);

  useEffect(() => {
    const input = localStorage.getItem(LC_PHONE_KEY) || "";
    const cleaned = input.replace(/\D/g, "");

    const formatted = formatPhoneNumber(input);
    setInputValue(formatted);

    if (onChange) {
      localStorage.setItem(LC_PHONE_KEY, cleaned);
      onChange(cleaned);
    }
  }, []);

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");

    let formatted = "";
    if (cleaned.length > 0) {
      formatted = "+7";
      if (cleaned.length > 1) {
        formatted += ` (${cleaned.substring(1, 4)}`;
      }
      if (cleaned.length > 4) {
        formatted += `) ${cleaned.substring(4, 7)}`;
      }
      if (cleaned.length > 7) {
        formatted += `-${cleaned.substring(7, 9)}`;
      }
      if (cleaned.length > 9) {
        formatted += `-${cleaned.substring(9, 11)}`;
      }
    }

    return formatted;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, "").substring(0, 11);

    const formatted = formatPhoneNumber(input);
    setInputValue(formatted);

    if (onChange) {
      localStorage.setItem(LC_PHONE_KEY, cleaned);
      onChange(cleaned);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace") {
      const selectionStart = e.currentTarget.selectionStart;
      if (selectionStart && selectionStart <= 4 && inputValue.length > 4) {
        e.preventDefault();
        const cleaned = inputValue.replace(/\D/g, "").slice(0, -1);
        const formatted = formatPhoneNumber(cleaned);
        setInputValue(formatted);
        if (onChange) {
          onChange(cleaned);
        }
      }
    }
  };

  return (
    <input
      ref={inputRef}
      type="tel"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="+7 (___) ___-__-__"
      className={`px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
};

export default PhoneInput;
