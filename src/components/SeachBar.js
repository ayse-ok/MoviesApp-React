import React, { Component } from 'react'
import {Link } from 'react-router-dom';

export default class SeachBar extends Component {
    
    handleFormSubmit = (event) => {
        event.preventDefault();
    }


  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <div className="row mb-5">
                <div className="col-10">
                    <input type="text" 
                        onChange={this.props.searchMovieProp} 
                        className='form-control' 
                        placeholder='Search a movie'>
                    </input>
                </div>

                <div className="col-2">
                    <Link to = "/add"
                        type="button" 
                        className="btn btn-danger btn-md" 
                        style={{float:'right'}}
                        > Add Movie
                    </Link>
                </div>
            </div>
        </form>
      </div>
    )
  }
}
