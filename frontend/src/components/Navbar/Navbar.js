import React, { Component } from 'react'
import "./Navbar.css";

 class Navbar extends Component {
     constructor(props){
         super(props);

         this.state={
             search:""
         }

         this.changeSearch=this.changeSearch.bind(this);
         this.submitSearch=this.submitSearch.bind(this);
     }


     changeSearch=(e)=>{

        this.setState({
            search:e.target.value
        })
     }

     submitSearch=(e)=>{
        e.preventDefault();
        console.log("Button clcicked");
     }

  render() {
    return (
      <div>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand" href="#">
            <img src="./logo.png" width="30" height="30" alt="Openhack alt" />
            </a> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{'paddingLeft':'20%','fontSize':'20px'}}>
                <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#">Home<span class="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="#">Features</a>
                <a className="nav-item nav-link" href="#">Pricing</a>
                <a className="nav-item nav-link disabled" href="#">Disabled</a>
                </div>
            </div>
            <form className="form-inline" >
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{'height':'27px'}} onChange={this.changeSearch} />
            <input onClick={this.submitSearch} className="btn btn-outline-success my-2 my-sm-4" type="submit" placeholder="Search" style={{'height':'25px'}} />
            </form>
        </nav>
           
      </div>
    )
  }
}


export default Navbar;