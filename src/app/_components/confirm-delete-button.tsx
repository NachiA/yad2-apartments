"use client";

type ConfirmDeleteButtonProps = {
  className: string;
  message?: string;
};

export function ConfirmDeleteButton({
  className,
  message = "האם למחוק את המודעה הזאת?",
}: ConfirmDeleteButtonProps) {
  return (
    <button
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
      type="submit"
    >
      מחיקת דירה
    </button>
  );
}
