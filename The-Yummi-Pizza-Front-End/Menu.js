import React from 'react';
import ReactDOM from 'react-dom';
import Header  from './Header.js';
import Footer  from './Footer.js';
import axios from 'axios';

export  default class Menu extends React.Component { 

constructor(){
    super();
    this.state = {
        menuList: [],
        itemAdded: '',
        qty:'',
        id:''
     }
        this.qty = this.qty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
   }

qty(id,e){
    //console.log(id);
    this.setState({qty:e.target.value, id:id})
}

handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost/laravel/lara-react/public/add', {
        qty:this.state.qty,
        id:this.state.id
    })
    .then( responce =>{
        this.setState({itemAdded:responce.data});
    }).catch(errors => {
        console.log(errors);
    })

}
componentDidMount(){
    axios.get('pizza').then( responce =>{
        this.setState({menuList:responce.data});
    }).catch(errors => {
        console.log(errors);
    })
}

render() {
    return (
        <div className="container">
            <Header/>
            <div className="row justify-content-center">
                <div className="col-md-12">
                <form onSubmit={this.handleSubmit}>
                <div className="row">   
                {this.state.menuList.map((item, index) => (
                   <div className="card col-md-4" key={index}>
                        <div className="card-header">menuList-{item.id}</div>                            
                            <div className="card-body">                      
                                <div><span className="icon-box"><img src={`${item.image_path}${item.image_name}`} alt="pepper-barbecue-onion" title="" className="img-responsive" /></span></div>
                                <h3>{item.name}</h3>                           
                                <p><span>{item.description}</span></p>    
                               <label>  Quantity : </label> <span><input type="number" min="1" max="10" onChange={(e) => this.qty(item.id, e)} /> </span>
                               <p> <label> Price : </label> <span> &#8364;{item.price}</span></p>
                            </div>
                      <div className="card-header">
                        <button type="submit" className="btn btn-block btn-info"> Order Now </button>
                      </div> 
                       </div> 
                    ))}                               
               </div>
             </form>
            </div>
          </div>
        </div>
    );
}
    
}
//export default Example;

if (document.getElementById('menu')) {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
}
