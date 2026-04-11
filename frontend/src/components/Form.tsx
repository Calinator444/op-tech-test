import { InputHTMLAttributes, forwardRef } from 'react';

const FormRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="form-row">{children}</div>;
};

const FormSubmit = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="submit"
      className="form-submit button"
      {...props}
    />
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
