import React, { Component } from 'react'
import Navbar from "../Navbar/Navbar"
class EarningReport extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[

                {
                    eventName: "HACK 2015",
                    teamsParticipated:
                      100,
                    totalPaid:200,
                    totalUnpaid:100,
                    totalSponsorshipAmount:4000,

                  },
                  {
                    eventName: "HACK 2016",
                    teamsParticipated:
                      150,
                    totalPaid:200,
                    totalUnpaid:100,
                    totalSponsorshipAmount:4000
                  },
                  {
                    eventName: "HACK 2017",
                    teamsParticipated:
                      200,
                    totalPaid:20000,
                    totalUnpaid:10,
                    totalSponsorshipAmount:10000
                  }
            ]
        }


    }
    render() {

        let details=this.state.data!==undefined ? (this.state.data.map((data,key)=>{

            return(
                <div style={{'marginBottom':'30px'}}  >
                    <div class="card mb-3 text-center" width="250" >
            <div class="card-body">
              <h5 class="card-title">
                <h2>{data.eventName}</h2>
              </h5>
            </div>

            <div class="card-body" >
                                         
            </div>
            <div className="card-deck" style={{'padding':'20px'}}>    
            <div class="card border-primary mb-3" style={{'max-width': '40rem'}}>
                <div class="card-header">Teams Participated</div>
                    <div class="card-body text-primary">
                    <h5 class="card-title">{data.teamsParticipated}</h5>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    </div>
            </div>


            <div class="card border-primary mb-3" style={{'max-width': '40rem'}}>
                <div class="card-header">Total Amount that Teams paid </div>
                    <div class="card-body text-primary">
                    <h5 class="card-title">${data.totalPaid}</h5>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    </div>
            </div>

            
            </div>

            <div className="card-deck" style={{'padding':'20px'}}>
            <div class="card border-primary mb-3" style={{'max-width': '40rem'}}>
                <div class="card-header">Total Amount that teams have not paid</div>
                    <div class="card-body text-primary">
                    <h5 class="card-title">${data.totalUnpaid}</h5>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    </div>
            </div>

            <div class="card border-primary mb-3" style={{'max-width': '40rem'}}>
                <div class="card-header">Sponsorship for {data.eventName}</div>
                    <div class="card-body text-primary">
                    <h5 class="card-title">${data.totalSponsorshipAmount}</h5>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    </div>
            </div>
            </div>

          </div>
                </div>
            )
        })):null
      
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col">
            
          </div>

          <div className="col-7 pt-5 pl-0" >
          <br/>
          <div className="row">
                
                <h1 className="hackathon-header">Earning Reports</h1>
              </div>
              <div className="row">

                <p className="header">
                  
                  Get all you earnings according to certain hackathons...

                    <br/>
                </p>    
                </div>
                <br/>
              {details}
          </div>

          <div className="col" />
        </div>
      </div>
    )
  }
}

export default EarningReport;
