import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

interface MainWrapperProps {
  children: JSX.Element
}

const MainWrapper = ({ children }: MainWrapperProps): JSX.Element => (
  <div>
    <Header
      isFaculty
      isReviewer
    />

    <main>
      {children}
    </main>

    <Footer />
  </div>
);

export default MainWrapper;
