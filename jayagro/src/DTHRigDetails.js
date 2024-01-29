import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Enquiry from "./Enquiry";

export default function DTHRigDetails(props) {
    let arraw = ">";
    const [showModel, setShowModel] = useState(false);
    const dthdetails =
    {
        dthname: "",
        a: '',
        b: ''
    }
    //

    const { id } = useParams();
    const [dthdetail, setDthdetail] = useState(dthdetails);
    let [pasingdthname, setPasingdthname] = useState({});
    const passdthname = async (e) => {
        const { id } = e.target;
        await setPasingdthname({ type: "merge", prop1: id });
        setShowModel(true)
    }

    const Mymodal = () => {
        return (
            <div className="modal-wrapper">

                <div className="modal-container container">
                    <div className="modal-header">
                        <h5></h5>
                        <button className="btn btn-warning" onClick={() => {
                            setShowModel(false)
                        }}>X</button>
                    </div>
                    <Enquiry name={pasingdthname.prop1} />
                </div>
            </div>
        )
    }


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(process.env.REACT_APP_GETDTHDETAILS + props.name);
            setDthdetail({
                dthname: response.data[0].dthname,
                a: response.data[0].a,
                b: response.data[0].b
            });
        }
        fetchData();
    }, []);
    var string1 = dthdetail.a
    var string2 = dthdetail.b
    var Array1 = string1.split(',');
    var Array2 = string2.split(',');
    let TS = Array1.map((e1) => {
        return (
            <>
                <tr>
                    <td className="text-left ps-2">{e1}</td>
                </tr>
            </>
        )
    })
    let DSD = Array2.map((e2) => {
        return (
            <>
                <tr>
                    <td className="text-left ps-2">{e2}</td>
                </tr>
            </>
        )
    });
    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <h1 className="p-3 text-warning">{dthdetail.dthname} DTH Rig </h1>
                    <div className="bg-warning"><Link className="p-2" id="homelink" to="/">Home </Link>{arraw}<Link className="p-2" id="homelink" to="/DTHrig">DTH Rig </Link>{arraw}{dthdetail.dthname} DTH Rig</div>
                </div>
                <div className="row shadow mt-5">
                    <div className="row img">
                        <div className="row">
                            <h2 className="text-warning text-center">{dthdetail.dthname} DTH Rig</h2>
                        </div>
                        <div className="row">
                            <img className="img-fluid" src={require('./img/DTH.png')} />
                        </div>
                    </div>
                    <div className="row pt-1">
                        <div className="row">
                            <table className="col-lg col-sm-12 table border border-1 border-black">
                                <thead>
                                    <tr>
                                        <th className="text-warning"><h4>Drilling Rig Structure Description</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TS}
                                </tbody>
                            </table>
                            <table className="col-lg col-sm-12 table border border-1 border-black">
                                <thead>
                                    <tr>
                                        <th className="text-warning"><h4>Technical Specifications</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DSD}
                                </tbody>
                            </table>

                        </div>


                        <div class="row mt-4 pb-5">
                            <div class="col-md-6 col-sm-12 mx-auto text-center">
                                <Link class="btn btn-warning btn-lg text-truncate" id={dthdetail.dthname} onClick={passdthname} >Enquiry Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {showModel && <Mymodal />};
        </>
    );
}