export interface ErrorModalProps {
  content: string
}

const ErrorModal = ({ content }: ErrorModalProps): JSX.Element => (
  <div>
    Error:
    {' '}
    {content}
  </div>
);

export default ErrorModal;
