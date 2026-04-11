import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FormRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="form-row">{children}</div>;
};

const FormSubmit = ({ loading, ...props }: InputHTMLAttributes<HTMLInputElement> & { loading?: boolean }) => {
  return (
    <div className='form-submit-wrapper'>
        {loading && <AiOutlineLoading3Quarters className='form-submit-loader' />}
        <input
        aria-busy={loading}
        type="submit"
        className={clsx("form-submit button", loading && "form-submit-loading")}
        {...props}
    />
    </div>
  );
};

const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { error?: string, label?: string }
>(({ className, label, ...props }, ref) => {
  return (
    <div className="form-control-container">
      {label && <label className='form-label' htmlFor={props.name}>{label}</label>}
      <input
        id={props.name}
        ref={ref}
        className="form-input"
        {...props}
      />
      {props.error && <span className="form-error">{props.error}</span>}
    </div>
  );
});

export { FormInput, FormRow, FormSubmit };
