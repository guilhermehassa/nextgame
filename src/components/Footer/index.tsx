import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <Image
          src="/logo.svg"
          alt="Next Game"
          width={100}
          height={30}
          className="mb-2"
        />
        <p className="mb-0">Seu guia de recomendação de jogos © 2025</p>
        <small className="text-white">
          Desenvolvido por Guilherme Hassã
        </small>
      </div>
    </footer>
  );
}
