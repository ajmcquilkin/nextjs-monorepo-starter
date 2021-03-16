export interface FormErrorProps {
  message: string,
  className?: string
}

const FormError = ({ message, className = '' }: FormErrorProps): JSX.Element => (
  <p
    aria-live="polite"
    aria-relevant="text"
    className={['genericError', className].join(' ')}
  >
    {message}
  </p>
);

export default FormError;
