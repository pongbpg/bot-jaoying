import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Money from '../../selectors/money';
moment.locale('th');
export class LiveShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            live: props.live,
            date: moment()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.live != this.state.live) {
            this.setState({ live: nextProps.live });
        }
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({ date: moment() })
    }
    render() {
        return (
            <div className="hero is-danger is-fullheight">
                <div className="hero-head" style={{ marginTop: '100px' }}>
                    <div className="container">
                        <div className="columns">
                            <div className="column is-6">
                                <h1 className="title is-1 has-text-white">ร้านเจ้าหญิง SHOP!</h1>
                            </div>
                            <div className="column is-6 has-text-right" style={{ paddingTop: '25px' }}>
                                <h1 className="title has-text-white is-2">
                                    วันที่ {moment(this.state.date).format('LL')}
                                    <br />เวลา {moment(this.state.date).format('LTS')}
                                </h1>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-body" style={{ paddingTop: '-250px' }}>
                        <div className="container">
                            <div className="columns">
                                <div className="column is-full">
                                    <h1 className="title is-1 has-text-white" style={{ fontSize: 80 }}>รหัส {this.state.live.id}</h1>
                                </div>
                            </div>
                            <div className="columns" style={{ paddingTop: '70px' }}>
                                <div className="column is-full">
                                    <h1 className="title is-2 has-text-white" style={{ fontSize: 70 }}>{this.state.live.name}</h1>
                                </div>
                            </div>
                            <div className="columns" style={{ marginTop: '70px' }}>
                                <div className="column is-full">
                                    <h1 className="title is-2 has-text-white" style={{ fontSize: 80 }}>ราคา {Money(this.state.live.price, 0)} บาท</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        }
const mapStateToProps = (state, props) => ({
                    live: state.live
            });
const mapDispatchToProps = (dispatch, props) => ({
                });
export default connect(mapStateToProps, mapDispatchToProps)(LiveShowPage);