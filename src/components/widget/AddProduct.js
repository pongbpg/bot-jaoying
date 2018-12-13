import React from 'react';
import { connect } from 'react-redux';
import { startAddProduct } from '../../actions/widget/product';
export class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: 0
        }
    }
    onNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    onAmountChange = (e) => {
        const amount = e.target.value.replace(/\D/g, '');
        if (!isNaN(amount)) {
            this.setState({
                amount: Number(amount)
            })
        }
    }
    onAddClick = (e) => {
        this.props.startAddProduct({
            name: this.state.name,
            amount: this.state.amount
        }).then(() => {
            this.setState({ name: '', amount: 0 })
        })
    }
    render() {
        return (
            <section className="hero">
                <div className="hero-head">
                    <div className="container">
                        <h2 className="title">เพิ่มสินค้า</h2>
                    </div>
                </div>
                <div className="hero-body">
                    <div className="field is-grouped">
                        <p className="control is-expanded">
                            <input className="input is-large" type="text" placeholder="ชื่อสินค้า"
                                value={this.state.name}
                                onChange={this.onNameChange} />

                        </p>
                        <p>
                            <input className="input is-large" type="text" placeholder="จำนวน"
                                value={this.state.amount}
                                onChange={this.onAmountChange} />
                        </p>
                        <p className="control">
                            <button className={`button is-success is-large is-rounded ${this.state.isLoading ? 'is-loading' : ''}`}
                                onClick={this.onAddClick}>
                                เพิ่ม</button>
                        </p>
                    </div>
                </div>
            </section >
        )
    }
}
const mapStateToProps = (state, props) => ({
});
const mapDispatchToProps = (dispatch, props) => ({
    startAddProduct: (product) => dispatch(startAddProduct(product)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);