import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/join-game">Join Game</Link>
      <Link href="/create-game">Create Game</Link>
      <button>rules</button>
    </div>
  );
}
