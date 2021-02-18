import { ReactNode } from 'react';
import { useSkeletonLoading } from 'components/layout/skeletonArea';

export interface CompileSectionProps {
  children: ReactNode
}

const CompileSection = ({ children }: CompileSectionProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <div>
      {isLoading
        ? <div style={{ background: 'gray', width: '100%', height: '100px' }} />
        : children}
    </div>
  );
};

export default CompileSection;
