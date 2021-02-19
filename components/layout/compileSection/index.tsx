import { ReactNode } from 'react';
import { useSkeletonLoading } from 'components/helpers/skeletonArea';

export interface CompileSectionProps {
  title: string,
  children: ReactNode,
  className?: string
}

const CompileSection = ({ title, children, className = '' }: CompileSectionProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <section className={className}>
      <h2>{title}</h2>
      <div>
        {isLoading
          ? <div style={{ background: 'gray', width: '100%', height: '100px' }} />
          : children}
      </div>
    </section>
  );
};

export default CompileSection;
