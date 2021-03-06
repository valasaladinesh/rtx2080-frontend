import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import arrow from '../src/darrow.jpg';
// import Board from './Board'
import Card from './Card'
import ModalComponent from './ModalComponent'
import { URL } from "./test/constants";

export default function Relationships() {
    const [show, setShow] = useState(false);
    
    const itemStyle = {
        height: '200px',
    };
    const imgStyle = {
        width: '50px',
    };
    const [services, setServices] = useState([]);
    const [relationdata, setRelationdata] = useState([]);
    const servicecallForServices = ()=> {
        const apiUrl = URL+'services';
        fetch(apiUrl)
          .then((res) => {
              console.log("HEYYY");
                return res.json();
            })
          .then((data) => data.result)
          .then((arr) => {
            // console.log("Array - ", arr);
            setServices(arr)
          }).catch((e) => {
                
        });
        // setThings(dummy[0]);
        // console.log("##services - ", services);
    }
    const servicecallForRelationships = ()=> {
        const apiUrl = URL+'relationships';
        fetch(apiUrl)
          .then((res) => {
              console.log("HEYYY");
                return res.json();
            })
          .then((data) => data.result)
          .then((arr) => {
            // console.log("Array relations - " ,arr)
            setRelationdata(arr)
          }).catch((e) => {
                
        });
        // setThings(dummy[0]);
        // console.log("##services - ", relationdata);
    }
    useEffect(()=>{

        servicecallForServices();
        servicecallForRelationships();
    }, [])

    useEffect(()=>{
        if(!show) {
            servicecallForRelationships();
        }
    }, [show])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const services = [{"id":1,"thingId":1, "name":"Service 1", "icon": "", "desc":"","column":"Services"}, {"id":3,"thingId":1, "name":"Service 3", "icon": "", "desc":"","column":"Services"},{"id":2,"thingId":2, "name":"Service 2", "icon": "", "desc":"","column":"Services"}];
    // const relationdata = [{"id":1,"name":"relationship1","service1":{"id":1,"thingId":1,"name":"Service1","icon":"","desc":""},"service2":{"id":2,"thingId":2,"name":"Service2","icon":"","desc":""}},{"id":2,"name":"relationship2","service1":{"id":2,"thingId":2,"name":"Service2","icon":"","desc":""},"service2":{"id":3,"thingId":3,"name":"Service3","icon":"","desc":""}},{"id":3,"name":"relationship3","service1":{"id":3,"thingId":3,"name":"Service3","icon":"","desc":""},"service2":{"id":4,"thingId":4,"name":"Service4","icon":"","desc":""}}];
    return (
        <Container className="mt-5">
            Relations : &nbsp;&nbsp;
            <Button onClick={handleShow}> Create Relationship</Button>
            {show ? (<ModalComponent show={show} list={services} setShow={setShow}></ModalComponent>) : ""}
            {relationdata.map(function (i) {
                // {console.log("Inside : ", i)}
                return (
                <>
                    <Row className="mt-5 justify-content-md-center">
                        <h4 className="mb-2 text-center">{i.id}</h4>
                        <Col xs={4} className="border rounded border-secondary" style={itemStyle}>
                            {/* <h5 className="mt-3 text-center">Service {i.service1.id}</h5>
                            <div className="col-md-5 text-start pt-2">
                                <p><i className="bi bi-caret-right-fill"></i> <strong>ID: </strong>{i.service1.id}</p>
                                <p><i className="bi bi-caret-right-fill"></i> <strong>Name: </strong>{i.service1.name}</p>
                                <p><i className="bi bi-caret-right-fill"></i> <strong>Description: </strong>{i.service1.desc}</p>
                            </div> */}
                            <Card id={i.service1.id} name={i.service1.id} desc={i.service1.desc} showDesc='true'>
                            </Card>
                        </Col>
                        <Col xs={2} className="justify-content-center d-flex flex-wrap align-items-center">
                            <img style={imgStyle} src={arrow} alt="BigCo Inc. logo"/>
                        </Col>
                        <Col xs={4} className="border rounded border-secondary">
                            <Card id={i.service2.id} name={i.service2.id} desc={i.service2.desc}  showDesc='true'>
                            </Card>
                            {/* <h5 className="mt-3 text-center">Service {i.service2.id}</h5>
                            <div className="col-md-5 text-start pt-2">
                                <p><i className="bi bi-caret-right-fill"></i> <strong>ID: </strong>{i.service2.id}</p>
                                <p><i className="bi bi-caret-right-fill"></i> <strong>Name: </strong>{i.service2.name}</p>
                                <p><i className="bi bi-caret-right-fill"></i> <strong>Description: </strong>{i.service2.desc}</p>
                            </div> */}
                        </Col>
                    </Row>
                    
                </>
                );
            })} 
            </Container>
    )
}
