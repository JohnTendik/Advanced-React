import Nav from '../Nav/Nav';

const Header = () => {

  return (
    <div>
      <div className='bar'>
        <a href="#">Sick Fits</a>
        <Nav />
      </div>

      <div className="sub-bar">
        <p>Search!</p>
      </div>
    </div>
  );

}

export default Header;