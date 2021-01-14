import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  isFaculty?: boolean,
  isReviewer?: boolean
}

const Header = ({ isFaculty = false, isReviewer = false }: HeaderProps): JSX.Element => (
  <header>
    <div id="app-brand-container">
      <Image
        src="/dPineWhite.svg"
        alt="Vox Daily"
        width={40}
        height={40}
      />
      <h1>VOX DAILY</h1>
    </div>

    <nav>
      <Link href="/"><a>Home</a></Link>
      {(isFaculty || isReviewer) && <Link href="/submissions"><a>Submissions</a></Link>}
      {isReviewer && <Link href="/review"><a>Review</a></Link>}
      {isReviewer && <Link href="/compile"><a>Compile</a></Link>}
    </nav>
  </header>
);

export default Header;
