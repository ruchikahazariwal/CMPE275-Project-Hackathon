import React, { Component } from 'react'
import {Accordion,AccordionItem,AccordionItemTitle,AccordionItemBody,AccordionItemHeading,AccordionItemButton,AccordionItemPanel} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Navbar from '../Navbar/Navbar';
import Table from "react-bootstrap/Table";
import axios from "axios";

class Results extends Component {
    constructor(props){
        super(props);
        this.state={

            data:[
                {
                    headline:"headline1",
                    description:"description1",
                    perHackResults:[
                        {
                            teamName:"H1",
                            grade:"4"
                        },
                        {
                            teamName:"H2",
                            grade:"5"
                        },
                        {
                            teamName:"H3",
                            grade:"6"
                        }
                    ]

                },
                {   
                    headline:"headline2",
                    description:"description2"
                },
                {   
                    headline:"headline2",
                    description:"description2"
                }
            
            ]
        }
    }

    componentDidMount=(e)=>{
        console.log("Hackathon details from backend");
        axios.get("/hackathon/result")
        .then(response=>{
            console.log("Hackathon details from backend");
            console.log(response);
        })
    }




  render() {
    console.log(this.state.data)
    //const detailsmenu = "this.state.data";
   
    
    const details= this.state.data!==undefined?(this.state.data.map((hResults,i)=>{
        
        
        return(
            <div>
                <Accordion allowZeroExpanded >
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                            {hResults.headline} 
                    </AccordionItemButton> 
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        
                        <Table
                        bordered
                        responsive="sm"
                        responsive="md"
                        responsive="lg"
                        responsive="xl"
                        >
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Team Name</th>
                            <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                         {
                             
                             hResults.perHackResults!==undefined?(hResults.perHackResults.map((team,key)=>{
                            return(<tr>
                            <td>{key + 1}</td>
                            <td>{team.teamName}</td>
                            <td>{team.grade}</td>
                            
                          </tr>)
                        })):null
                        }
                        </tbody>
                        </Table>
                        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
        </Accordion>
            </div>
        )
    })):null
    console.log("Jsut before restun",this.state.data)
    return (
      <div>
          <Navbar />
        <div className="row">
          <div className="col">
            
          </div>


          <div className="col-6 pt-5 pl-0">
            <div className="row">
                
            <h1 className="hackathon-header">Hackathon Results</h1>
            
            <p className="header">
                <br/>
              Check all the hackathon results 
              See where you are standing with the people you are competing with 
              ....
              <br />
              Get started by clicking on one of the hackathons
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


export default Results;