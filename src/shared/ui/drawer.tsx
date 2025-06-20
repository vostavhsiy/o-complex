"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "@/shared/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "./button";

const drawerVariants = cva("fixed z-50 bg-dark shadow-lg", {
  variants: {
    side: {
      top: "inset-x-0 top-0 sm:border-b",
      bottom: "inset-x-0 bottom-0 sm:border-t",
      left: "inset-y-0 left-0 h-full w-full sm:border-r sm:max-w-2xl",
      right: "inset-y-0 right-0 h-full w-full sm:border-l sm:max-w-2xl",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

interface DrawerProps extends VariantProps<typeof drawerVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
}

const Drawer = ({
  isOpen,
  onClose,
  children,
  side = "right",
  className,
  overlayClassName,
  closeOnOverlayClick = true,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnOverlayClick &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose, closeOnOverlayClick]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(5px)" }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          <div
            className={cn(
              "fixed inset-0 bg-black/80 transition-opacity",
              isOpen ? "opacity-100" : "opacity-0",
              overlayClassName,
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            ref={drawerRef}
            className={cn(drawerVariants({ side }), className)}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DrawerTriggerProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const DrawerTrigger = ({
  onClick,
  children,
  className,
}: DrawerTriggerProps) => {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

interface DrawerCloseProps {
  onClick: () => void;
  className?: string;
}

const DrawerClose = ({ onClick, className }: DrawerCloseProps) => {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
      className={className}
    >
      <X />
    </Button>
  );
};

interface DrawerContentProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerContent = ({ children, className }: DrawerContentProps) => {
  return <div className={cn(className)}>{children}</div>;
};

interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerHeader = ({ children, className }: DrawerHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left bg-dark",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerFooter = ({ children, className }: DrawerFooterProps) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface DrawerTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerTitle = ({ children, className }: DrawerTitleProps) => {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
};

interface DrawerDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerDescription = ({ children, className }: DrawerDescriptionProps) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
