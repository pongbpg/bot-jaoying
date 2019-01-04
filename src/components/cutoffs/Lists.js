import React from 'react';
import { connect } from 'react-redux';
// import { startCutOff } from '../../actions/cutoff';
import moment from 'moment';
moment.locale('th');
export class CutOff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cutoffs: props.cutoffs,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cutoffs != this.state.cutoffs) {
            this.setState({ cutoffs: nextProps.cutoffs });
        }
    }
    render() {
        return (
            <table className="table is-fullwidth is-striped is-narrow">
                <thead>
                    <tr>
                        <th className="has-text-centered">ลำดับ</th>
                        <th className="has-text-left">รอบ</th>
                        <th className="has-text-centered">สถานะ</th>
                        <th className="has-text-centered">ยอดขาย</th>
                        <th className="has-text-centered">เลขพัสดุ</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.cutoffs.sort((a, b) => a.id > b.id ? -1 : 1).map((ct, i) => {
                        return <tr key={ct.id}>
                            <td className="has-text-centered">{++i}</td>
                            <td className="has-text-left">{moment(ct.id).format('ll')}</td>
                            <td className="has-text-centered">{ct.cutoff ? 'ปิดรอบแล้ว' : 'ยังไม่ปิดรอบ'}</td>
                            <td className="has-text-centered">
                                <button className="button is-small">PDF</button>
                            </td>
                            <td className="has-text-centered">
                                <input type="file" />
                            </td>
                        </tr>;
                    })
                    }
                </tbody>
            </table>

        )

    }
}
const mapStateToProps = (state, props) => ({
    // cutoffs: state.cutoffs
});
const mapDispatchToProps = (dispatch, props) => ({
    // startGetCutOff: () => dispatch(startGetCutOff()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CutOff);