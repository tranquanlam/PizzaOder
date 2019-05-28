import React, { Component } from 'react';
class product extends Component {
   
    render() {
        return (
            <div id={this.props.id} className="product row">
                <div className="col-6 product__info">
                    <p className="proName">{this.props.name}</p>
                    <p className="proPrice">{this.props.price}</p>
                </div>
                <div className="col-6 product__control">
                    <div className="btn btn-danger" onClick={this.props.bot}>
                        <p>-</p>
                    </div>
                    <div className="quality">{this.props.quatity}</div>
                    <div className="btn btn-success" onClick={this.props.them}>
                        <p>+</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default product;