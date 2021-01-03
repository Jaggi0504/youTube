import React from 'react';
import SearchBar from './components/SearchBar';
import VideoDetails from './components/VideoDetails'
import VideoList from './components/VideoList';
import {Grid} from '@material-ui/core';
import youtube from './api/youtube';

import YouTubeIcon from '@material-ui/icons/YouTube';

class App extends React.Component {
  state = {
    videos:[],
    selectedVideo:null
  }

  componentDidMount() {
    this.handleSubmit('sidhu moosewala');
  }
  
  onVideoSelect = (video)=> {
    this.setState({selectedVideo:video});
  }

  handleSubmit = async(searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        q:searchTerm,
        part: 'snippet',
        maxResults: 5,
        key: "AIzaSyD6kCzRNbZ99zrzk0Brp8PyywIqUWpm5Eo"
      }
    })
    console.log(response);
    this.setState({videos:response.data.items, selectedVideo:response.data.items[0]})
  }

  render() {
    return (
      <Grid container spacing = {10} style={{padding:"20px", width:"100%"}} >
        <h1 style={{marginLeft:"680px",
          fontFamily:'Caveat, cursive',
          color:"red", marginTop:"10px"}} id="h1"><YouTubeIcon name="youtube" style={{fontSize:"60px", marginTop:"10px"}}></YouTubeIcon>  YouTube Clone</h1> 
        <Grid item xs = {12}>
          <SearchBar onFormSubmit = {this.handleSubmit}/>
          </Grid>
          <Grid item xs = {8}>
          <VideoDetails video = {this.state.selectedVideo}/>
            </Grid>
            <Grid item xs = {4}>
             <VideoList videos = {this.state.videos} onVideoSelect={this.onVideoSelect} />
              </Grid>
        </Grid>
    )
  }
}


export default App;