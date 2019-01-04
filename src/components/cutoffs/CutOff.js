import React from 'react';
import { connect } from 'react-redux';
import { startCutOff } from '../../actions/cutoff';
import moment from 'moment';
moment.locale('th');
export class CutOff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cutoff: props.cutoff,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cutoff != this.state.cutoff) {
            this.setState({ cutoff: nextProps.cutoff });
        }
    }
    onCutOffClick = () => {
        var r = confirm("ต้องการจะปิดรอบใช่หรือไม่?");
        if (r == true) {
            alert("ปิดรอบแล้ว!");
            this.props.startCutOff(this.state.cutoff.id)
            // this.props.history.push('/home')
        }
    }
    render() {
        if (this.state.cutoff) {
            return (
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">ปิดรอบ</h1>
                            <h2 className="subtitle">วันที่ {moment(this.state.cutoff.id).format('ll')}</h2>
                        </div>
                    </div>
                    <nav className="level">
                        <p className="level-item has-text-centered">
                            <button className="button is-info is-centered is-large"
                                onClick={this.onCutOffClick}>
                                ปิดรอบจ้า
                        </button>
                        </p>
                    </nav>
                </section>
            )
        } else {
            return <p>xxx</p>
        }

    }
}
const mapStateToProps = (state, props) => ({
    // cutoffs: state.cutoffs
});
const mapDispatchToProps = (dispatch, props) => ({
    // startGetCutOff: () => dispatch(startGetCutOff()),
    startCutOff: (id) => dispatch(startCutOff(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(CutOff);