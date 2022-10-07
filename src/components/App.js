import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchBar from "./SeachBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";


class App extends React.Component {
    state = {
        movies : [],
        searchQuery: ""
    }

// fetch kullanımı  iki asama ile aldık verileri json olarak
    // async componentDidMount(){
    //     const baseUrl = "http://localhost:3001/movies";
    //     const response = await fetch(baseUrl);
    //     const data = await response.json();
    //     this.setState({movies:data});
    // }

 // axios kullanımı - tek seferde verileri json olarak aldıyoruz http istekleri yapmak icin kullanılan promise tabanlı kütüphane 
    async componentDidMount(){
        this.getMovies();
    }


    async getMovies(){
        const response = await axios.get("http://localhost:3001/movies");
        this.setState({movies:response.data});
    }

//fetch api ile    
    // deleteMovie = async (movie) => {
    //     const baseUrl = `http://localhost:3001/movies/${movie.id}`;

    //     await fetch(baseUrl,{
    //         method: "DELETE"
    //     })

    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== movie.id
    //     );

    //     // en başta movies listemiz boş olsaydı bu doğruydu
    //     // this.setState({
    //     //     movies : newMovieList
    //     // })

    //     // varolan state in önceki durumu üzerinden güncelleme yapar
    //     this.setState(state => ({
    //         movies : newMovieList
    //     }))
    // }


// DELETE MOVIE axios ile
    deleteMovie = async (movie) => {
        axios.delete(`http://localhost:3001/movies/${movie.id}`);

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        // en başta movies listemiz boş olsaydı bu doğruydu
        // this.setState({
        //     movies : newMovieList
        // })

        // varolan state in önceki durumu üzerinden güncelleme yapar
        this.setState(state => ({
            movies : newMovieList
        }))
    }

 // SEARCH MOVIE
    searchMovie = (event) => {
      this.setState({searchQuery: event.target.value})
    }

 // ADD MOVIE axios ile   
    addMovie = async (movie) => {
        await axios.post(`http://localhost:3001/movies/`, movie);
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
        this.getMovies();
    }

//EDIT MOVIE
    editMovie = async (id,updatedMovie) => {
        await axios.put(`http://localhost:3001/movies/${id}`, updatedMovie);
        this.getMovies();        
    }  


    render(){
        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a,b) =>{
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0       // filmleri id si buyuk olan basa gelsin siralamasi
        });

        return(
            <Router>
                <div className="container">
                    <Switch>                        
                        <Route path="/" exact render = {() => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie}/>
                                    </div>
                                </div>
                                <MovieList
                                    movies = {filteredMovies}
                                    deleteMovieProp = {this.deleteMovie}/>
                            </React.Fragment>
                        )}></Route> 

                        <Route path="/add" render = {({history}) => (
                            <AddMovie
                                onAddMovie = {(movie) => {
                                    this.addMovie(movie)
                                    history.push("/");
                                }}
                            />
                         )}></Route>   

                        <Route path="/edit/:id" render = {(props) => (
                            <EditMovie
                                {...props}
                                onEditMovie = {(id,movie) => {
                                    this.editMovie(id,movie)                                    
                                }}
                            />
                         )}></Route>                                     
                    </Switch>                                             
                </div>
            </Router>
        )
    }
}

export default App;