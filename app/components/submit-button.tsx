'use client';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type={pending ? 'button' : 'submit'}
      aria-disabled={pending}
      disabled={pending}
      className={`flex h-10 w-full items-center disabled:cursor-not-allowed justify-center rounded-md border text-sm transition-all focus:outline-none ${className}`}
    >
      
      {pending ? (
        <>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </>
      ): <>{children}</>}
    </button>
  );
}
