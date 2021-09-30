import React from 'react'

export default function AppNavBar({ optdata, pagename }) {
    let curpage = {};
    function getSecretOpt(){
        if(optdata&&optdata.avail){
            return (<li className="nav-item"><a className="nav-link" href={optdata.url}>{optdata.content}</a></li>);
        }
        return '';
    }

    if(pagename){
        curpage[pagename] = 'active';
    }

    function pageActive(pg){
        if(curpage[pg]){
            return 'active'
        }
        return ''
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <a className="navbar-brand" href="/home/">Recruiting System</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className={"nav-link "} href="/application/">Application</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link "} href="/account/">Account</a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
        // <nav className="navbar navbar-dark bg-dark" aria-label="First navbar example">
        //     <div className="container-fluid">
        //         <a className="navbar-brand" href="#">Never expand</a>
        //         <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="navbar-collapse collapse" id="navbarsExample01" >
        //             <ul className="navbar-nav me-auto mb-2">
        //                 <li className="nav-item">
        //                     <a className="nav-link active" aria-current="page" href="#">Home</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#">Link</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link disabled">Disabled</a>
        //                 </li>
        //                 <li className="nav-item dropdown">
        //                     <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
        //                     <ul className="dropdown-menu" aria-labelledby="dropdown01">
        //                         <li><a className="dropdown-item" href="#">Action</a></li>
        //                         <li><a className="dropdown-item" href="#">Another action</a></li>
        //                         <li><a className="dropdown-item" href="#">Something else here</a></li>
        //                     </ul>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    );
}