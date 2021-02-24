import { ReactNode } from 'react';
import { useSkeletonLoading } from 'components/helpers/skeletonArea';

export interface CompileSectionProps {
  title: string,
  loadingComponent: () => ReactNode,
  children: ReactNode,
  className?: string
}

const CompileSection = ({
  title, loadingComponent, children, className = ''
}: CompileSectionProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <section className={className}>
      <h2>{title}</h2>
      <div>
        {isLoading
          ? loadingComponent()
          : children}
      </div>
    </section>
  );
};

export default CompileSection;
