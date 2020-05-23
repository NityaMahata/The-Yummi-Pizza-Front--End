import React from 'react';  
import ReactDOM from 'react-dom';
import Header  from './Header.js';
import Footer  from './Footer.js';
import axios from 'axios';

export  default class Orders extends React.Component { 

constructor(){
    super();
     this.state = {
        orderList: [
                     {
                        "id":2,
                        "name":"CHEESE N CORN",
                        "price":100,
                        "quantity":4,
                        "attributes":[

                        ],
                        "conditions":[

                        ]
                     },
                     {
                        "id":1,
                        "name":"Double Cheese Margherita",
                        "price":50,
                        "quantity":"1",
                        "attributes":[

                        ],
                        "conditions":[

                        ]
                     }
                  ],
        totals: '',
        quantities:'',
        cartData:[]      
     }  
   }

  componentDidMount(){
      axios.get('cart').then( responce =>{
          this.setState({cartData:responce.data});
      }).catch(errors => {
          console.log(errors);
      })

      axios.get('http://localhost/laravel/lara-react/public/total').then( responce =>{
            this.setState({totals:responce.data});
          }).catch(errors => {
              console.log(errors);
          })

      axios.get('http://localhost/laravel/lara-react/public/quantity').then( responce =>{
              this.setState({quantities:responce.data});
          }).catch(errors => {
              console.log(errors);
          })
    }
 
render() {
    return (
        <div className="container">
            <Header/>
            <div className="row">
             <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>                    
                  </tr>
                </thead>
                <tbody>
                 {Object.keys(this.state.cartData).map((item, index) => {
                  return <tr key={index}>                  
                    <td>{this.state.cartData[item].id}</td>
                    <td>{this.state.cartData[item].name}</td>
                    <td>{this.state.cartData[item].price}</td>
                    <td>{this.state.cartData[item].quantity}</td>                     
                  </tr>    
                  })}             
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total Price : </td>
                    <td>&#8364;{this.state.totals}</td>
                    <td>Total Quantity</td>
                    <td>{this.state.quantities}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="card-header">
                 <button type="submit" className="btn btn-block btn-info"> Place Order </button>
              </div> 
          </div>          
        </div>
    );
 }
    
}

if (document.getElementById('orders')) {
    ReactDOM.render(<Orders />, document.getElementById('orders'));
}
