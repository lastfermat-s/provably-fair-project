import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { getBetData, getBetDataStake, getBetDataPrimeDice, getBetDataCryptoGames } from '../services/verificationService';
import { getServerSeed } from '../services/verificationService';
import { getServerSeedPrimeDice } from '../services/verificationService';
import { getServerSeedCryptoGames } from '../services/verificationService';
import { getServerSeedHash } from '../services/verificationService';
import { getServerSeedHashPrimeDice } from '../services/verificationService';
import { getServerSeedHashCryptoGames } from '../services/verificationService';

class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gettingStarted: false,
            settings: false,
            verification: false,
            operators: false,
            primeDice: false,
            
            verify: false,
            showAlert: false,
            diceVerify: '',

            betData: [],
            serverSeed: '',
            serverSeedHash: '',
            clientSeed: '',
            nonce: '',
            numberBetsVerFailed: 0,
            isNonceManipulated: false,
            active_game: '',
            popupResult: [],
            cryptoGames: false,
            apiKey: '',
            

        }
    }

    componentDidMount() {
        this.setState({ verification: this.props.verification });
    }

    handleVerifyBet = (serverSeed, clientSeed, nonce) => {
        this.setState({ verify: true });
        this.setState({ diceVerify: this.verifyBet(serverSeed, clientSeed, nonce) });

    };


    handleVerifyBetPrimeDice = (serverSeed, clientSeed, nonce) => {

        this.setState({ verify: true });

        this.setState({ diceVerify: this.verifyBetPrimeDice(serverSeed, clientSeed, nonce) });
    };



    handleVerifyBetCryptoGames = (serverSeed, clientSeed, nonce) => {
        this.setState({ verify: true });
        this.setState({ diceVerify: this.verifyBetCryptoGames(serverSeed, clientSeed, nonce) });
    };

    verifyBet = (serverSeed, clientSeed, nonce) => {
        let hash = getServerSeedHash(serverSeed, clientSeed, nonce);
        let roll = parseInt(hash.substr(0, 8), 16);
        let result = roll % 10000;


        return result;

    };

    verifyBetPrimeDice = (serverSeed, clientSeed, nonce) => {
        let hash = getServerSeedHashPrimeDice(serverSeed, clientSeed, nonce);
        let roll = parseInt(hash.substr(0, 8), 16);
        let result = roll % 10000;

        return result;

    };

    verifyBetCryptoGames = (serverSeed, clientSeed, nonce) => {
        let hash = getServerSeedHashCryptoGames(serverSeed, clientSeed, nonce);
        let roll = parseInt(hash.substr(0, 8), 16);
        let result = roll % 10000;

        return result;

    };



    processBets = () => {
        let betData = getBetData();
        let numberBetsVerFailed = 0;
        let isNonceManipulated = false;
        betData.forEach((element) => {
            let hash = getServerSeedHash(this.state.serverSeed, element.clientSeed, element.nonce);
            let roll = parseInt(hash.substr(0, 8), 16);
            let result = roll % 10000;
            element.isVerified = result < element.target;
            if (!element.isVerified) {
                numberBetsVerFailed++;
            }

            if (element.nonce !== this.state.nonce) {
                isNonceManipulated = true;
            }

        });


        this.setState({ betData, numberBetsVerFailed, isNonceManipulated });

    };

    processBetsStake = () => {

        let betData = getBetDataStake();



        let numberBetsVerFailed = 0;


        let isNonceManipulated = false;

        betData.forEach((element) => {
            let hash = getServerSeedHash(this.state.serverSeed, element.clientSeed, element.nonce);
            let roll = parseInt(hash.substr(0, 8), 16);
            let result = roll % 10000;

            element.isVerified = result < element.target;

            if (!element.isVerified) {
                numberBetsVerFailed++;
            }



            if (element.nonce !== this.state.nonce) {

                isNonceManipulated = true;
            }

        });

        this.setState({ betData, numberBetsVerFailed, isNonceManipulated });



    };




    processBetsPrimeDice = () => {
        let betData = getBetDataPrimeDice();
        let numberBetsVerFailed = 0;
        let isNonceManipulated = false;
        betData.forEach((element) => {
            let hash = getServerSeedHashPrimeDice(this.state.serverSeed, element.clientSeed, element.nonce);
            let roll = parseInt(hash.substr(0, 8), 16);

            let result = roll % 10000;

            element.isVerified = result < element.target;



            if (!element.isVerified) {
                numberBetsVerFailed++;

            }

            if (element.nonce !== this.state.nonce) {
                isNonceManipulated = true;
            }


        });

        this.setState({ betData, numberBetsVerFailed, isNonceManipulated });

    };

    processBetsCryptoGames = () => {
        let betData = getBetDataCryptoGames();
        let numberBetsVerFailed = 0;
        let isNonceManipulated = false;
        betData.forEach((element) => {
            let hash = getServerSeedHashCryptoGames(this.state.serverSeed, element.clientSeed, element.nonce);
            let roll = parseInt(hash.substr(0, 8), 16);
            let result = roll % 10000;
            element.isVerified = result < element.target;
            if (!element.isVerified) {
                numberBetsVerFailed++;
            }

            if (element.nonce !== this.state.nonce) {
                isNonceManipulated = true;
            }

        });


        this.setState({ betData, numberBetsVerFailed, isNonceManipulated });

    };

    getServerSeed = (apiKey) => {
        let serverSeed = getServerSeed(apiKey);
        this.setState({ serverSeed });
    };

    getServerSeedPrimeDice = (apiKey) => {
        let serverSeed = getServerSeedPrimeDice(apiKey);
        this.setState({ serverSeed });
    };

    getServerSeedCryptoGames = (apiKey) => {
        let serverSeed = getServerSeedCryptoGames(apiKey);
        this.setState({ serverSeed });
    };

    hideAlertConfirm = () => {
        this.setState({ showAlert: false });
    };


    render() {
        const { verification, betData, numberBetsVerFailed, isNonceManipulated, diceVerify, verify, showAlert, serverSeed, clientSeed, nonce, cryptoGames, primeDice, apiKey } = this.state;

        return (



<><div className="VerificationUI-Stake table-responsive" style={{ display: verification ? 'block' : 'none', fontSize: '11px' }}>

    <span className="alert alert-success p-2">
        <span>Nonce</span>
        <span className={"badge badge-md badge-circle badge-floating badge-danger border-white"}>{isNonceManipulated ? "Fail" : "Ok"}</span>
    </span>
    <span className="alert alert-danger p-2">
        <span>Bets Fail</span>
        <span className="badge badge-md badge-circle badge-floating badge-danger border-white">{numberBetsVerFailed}</span>
    </span>
    <div className="form-group">
        <button type="button" className="btn btn-secondary m-2" onClick={this.processBetsStake}> Verify Recent Bets</button>
    </div>
    <div className="Bitvest" style={{ display: 'none' }}>
        <table className="table align-items-center table-flush table-hover">
            <thead className="thead-light">
                <tr>
                    <th>Id</th>
                    <th>Game</th>
                    <th>Roll</th>
                    <th>Side</th>
                    <th>Target</th>
                    <th>Nonce</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {betData.map((item, i) => {
                    return <tr key={i}>
                        <td>
                            {item.element.id}
                        </td>
                        <td>
                            {item.element.game}
                        </td>
                        <td>
                            {item.element.roll}
                        </td>
                        <td>
                            {item.element.side}
                        </td>
                        <td>
                            {item.element.target}
                        </td>
                        <td>
                            {item.element.nonce}
                        </td>
                        <td>
                            {item.element.isVerified
                                ? <a href="#" className="badge badge-pill badge-success">Success</a>
                                : <a href="#" className="badge badge-pill badge-danger">Failed</a>}
                        </td>
                    </tr>;
                })}
            </tbody>
        </table>
    </div>
    <div className="Stake" style={{ display: verification ? 'block' : 'none' }}>
        <table className="table align-items-center table-flush table-hover">
            <thead className="thead-light">
                <tr>
                    <th>Id</th>
                    <th>Game</th>
                    <th>Payout/Side</th>
                    <th>Nonce</th>
                    <th>Result</th>
                </tr>
            </thead>

            <tbody>
                {betData.map((item, i) => {
                    return <tr key={i}>
                        <td>
                            {item.element.id}
                        </td>
                        <td>
                            {item.element.game}
                        </td>
                        <td>
                            {item.element.payout}{item.element.side}
                        </td>
                        <td>
                            {item.element.nonce}
                        </td>
                        <td>
                            {(item.element.game === 'baccarat' || item.element.game === 'hilo' || item.element.game === 'blackjack' || item.element.game === 'diamondPoker' || item.element.game === 'videoPoker' || item.element.game === 'mines' || item.element.game === 'keno' || item.element.game === 'plinko')
                                ? <button className="btn btn-info" onClick={() => {
                                    this.setState({ showAlert: true, active_game: item.element.game, popupResult: item.element.isVerified });
                                } } title="Results"> </button>
                                : item.element.isVerified}

                            {showAlert &&
                                <SweetAlert
                                    confirmBtnText="Ok"
                                    confirmBtnBsStyle="info"
                                    title="Bet Results"
                                    onConfirm={this.hideAlertConfirm}
                                    style={{ marginLeft: '0', left: '0%', width: '400px', marginTop: '-255px', overflowX: 'scroll', overflowY: 'scroll', height: '406px' }}
                                >
                                    {(active_game === 'diamondPoker' || active_game === 'plinko') ?
                                        popupResult.map((item, i) => {
                                            return <p style={{ fontSize: 'x-small' }}>{item + " "}</p>;
                                            <img src={require('./images/diamonds/diamonds/1x/' + item + '.png')} style={{ width: "10%" }} />;
                                        })
                                        : active_game === 'mines' ?
                                            <table>
                                                <tbody>
                                                    {numOfRows.map((j) => {
                                                        return (<tr key={nonce + '' + j}>
                                                            {numOfRows.map((i) => {
                                                                return <td key={nonce + '' + j * 5 + i}>
                                                                    <img src={require((popupResult[0] === ((j) * 5 + (i))) || (popupResult[1] === ((j) * 5 + (i))) || (popupResult[2] === ((j) * 5 + (i))) ? './images/mine.png' : './images/gem.png')} style={{ width: "90%" }} />
                                                                </td>;
                                                            })}
                                                        </tr>);
                                                    })}
                                                </tbody>
                                            </table>
                                            : active_game === 'keno' ?
                                                <table>
                                                    <tbody>
                                                        {numOfRows.map((j) => {
                                                            return (<tr key={nonce + '' + j}>
                                                                {numOfColumnsKeno.map((i) => {
                                                                    return (<td key={(nonce + '' + j * 8 + i)}>
                                                                        <button className={(popupResult[0] === ((j) * 8 + (i))) || (popupResult[1] === ((j) * 8 + (i))) || (popupResult[2] === ((j) * 8 + (i))) || (popupResult[4] === ((j) * 8 + (i))) || (popupResult[4] === ((j) * 8 + (i))) || (popupResult[5] === ((j) * 8 + (i))) || (popupResult[6] === ((j) * 8 + (i))) || (popupResult[7] === ((j) * 8 + (i))) || (popupResult[8] === ((j) * 8 + (i))) || (popupResult[9] === ((j) * 8 + (i))) ? 'btn btn-success' : 'btn btn-info'}>{(j) * 8 + i + 1} </button>
                                                                    </td>);
                                                                })}
                                                            </tr>);
                                                        })}
                                                    </tbody>
                                                </table>

                                                :
                                                popupResult.map((item, i) => {
                                                    return <img src={'/images/cards-png/' + item + '.png'} alt="Card" style={{ width: "10%" }} />;
                                                })}
                                </SweetAlert>}
                        </td>
                    </tr>;
                })}
            </tbody>
        </table>
    </div>

</div><div className="VerificationUI-CryptoGames table-responsive" style={{ display: verification && cryptoGames ? 'block' : 'none', fontSize: '11px' }}>
        <div className="nav-wrapper">
            <ul className="nav nav-pills nav-fill flex-md-row" id="tabs-icons-text" role="tablist">
                <li className="nav-item" onClick={() => {
                    this.setState({ gettingStarted: false, settings: true, verification: false, operators: false });
                    this.getServerSeed(apiKey);
                } }>
                    <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i className="fa fa-cloud-upload-96 mr-2"></i>Settings</a>
                </li>
                <li className="nav-item show" onClick={() => {
                    this.setState({ gettingStarted: false, settings: false, verification: true, operators: false });
                } }>
                    <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i className="fa fa-bell-55 mr-2"></i>Veri-----fication</a>
                </li>
                <li className="nav-item" onClick={() => {
                    this.setState({ gettingStarted: false, settings: false, verification: false, operators: true });
                } }>
                    <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><i className="fa fa-calendar-grid-58 mr-2"></i>Casinos</a>
                </li>
            </ul>
        </div>

        <div className="primeDice" style={{ display: primeDice ? 'block' : 'none' }}>
            <div className="form-group">
                <button type="button" className="btn btn-secondary m-2" onClick={() => {
                    this.handleVerifyBetPrimeDice(serverSeedHash, clientSeed, nonce);
                    console.log(serverSeedHash, clientSeed, nonce);
                } }> Verify</button>

            </div>

        </div>

        <div style={{ display: verify ? 'block' : 'none' }}>
            <div className="alert alert-info" role="alert">
                <strong>Your verified result : {diceVerify}</strong>
            </div>
            <div className="alert alert-primary" role="alert" style={{ fontSize: '11px' }}>
                ServerSeed : {serverSeedHash}
            </div>
            <div className="alert alert-warning" role="alert" style={{ fontSize: '11px' }}>
                Client Seed : {clientSeed}
            </div>
        </div>
    </div></>
        )
    }
}

export default Verification;