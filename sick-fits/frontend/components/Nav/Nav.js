import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <Link href='/'><a>Home</a></Link>
      <Link href='/shop'><a>Shop</a></Link>
    </nav>
  );
}

export default Nav;