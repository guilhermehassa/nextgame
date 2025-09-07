import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={`py-2 ${styles.header}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3 d-flex justify-content-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="NextGame Logo"
                width={140}
                height={40}
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
