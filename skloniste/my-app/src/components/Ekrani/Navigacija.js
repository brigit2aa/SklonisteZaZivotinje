function Navigacija() {
    return (
      <div className="container-navigacija">
        <img className="logoSklonista"/>
        <div className="wrapper">
          <a href="#">Osnovni podatci o životinjama</a>
          <a href="#">Udomitelji</a>
          <a href="#">Udomljene životinje</a>
          <form id="search" action="">
            <input className="trazi" type="search" placeholder="Pretraži..."/>
            <i className="fa fa-search"></i>
          </form>
        </div>
        
      </div>
    );
  }
  
  export default Navigacija;