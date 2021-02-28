import { ReactNode } from 'react';

export interface CompileSectionProps {
  title: string,
  children: ReactNode,
  className?: string
}

const CompileSection = ({
  title, children, className = ''
}: CompileSectionProps): JSX.Element => (
  <section className={className}>
    <h2>{title}</h2>
    <div>{children}</div>
  </section>
);

export default CompileSection;
