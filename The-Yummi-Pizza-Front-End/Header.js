import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';

export  default class Header extends React.Component { 
  render() {
      return (
           <div className="container">
           		<div className="row header">
                <span className="logo"> The Yummi Pizza </span>
	           		 <ul className="menu-bar">
	           		 	<li><a className="menu-list" href="http://localhost/laravel/lara-react/public/home"> Menu </a></li>
	           		 </ul>
           		</div>
           </div>
      );
  }
}
