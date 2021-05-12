import { React,  Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';

// For my solution I used setInterval periodic function. 
// This function wont be able to access the updated state if I will use functional component, so thats why I used class component instead.

export default class Home extends Component {

    constructor(){
        super()
        const audio1 = new Audio ("/audio/120_future_funk_beats_25.mp3")
        const audio2 = new Audio ("/audio/120_stutter_breakbeats_16.mp3")
        const audio3 = new Audio ("/audio/Bass Warwick heavy funk groove on E 120 BPM.mp3")
        const audio4 = new Audio ("/audio/electric guitar coutry slide 120bpm - B.mp3")
        const audio5 = new Audio ("/audio/FUD_120_StompySlosh.mp3")
        const audio6 = new Audio ("/audio/GrooveB_120bpm_Tanggu.mp3")
        const audio7 = new Audio ("/audio/MazePolitics_120_Perc.mp3")
        const audio8 = new Audio ("/audio/PAS3GROOVE1.03B.mp3")
        const audio9 = new Audio ("/audio/SilentStar_120_Em_OrganSynth.mp3")
       
        this.state={
            tracks:[],
            allTracks:[audio1,audio2,audio3,audio4,audio5,audio6,audio7,audio8,audio9],
            trackNames:["Future Funk Beats","Stutter Break beats","Bass Warwick","Electric Guitar","Stompy Slosh","GrooveB","Maze Politics","Pase Groove","Silent Star"]
        }
    }
    
    // This function will triger after clicking the play button, and it will start the loop.
    play(){
        console.log(this.state.tracks)
        this.state.tracks.map(track=>track.track.play())
        if(this.state.tracks[0]){
            this.setState({playing:true})
            this.timer = setInterval(() => {
            console.log(this.state.tracks)
            console.log("loop")
            this.state.tracks.map(track=>track.track.play())
           }, 8200);
        }
    }

    // This function will triger after clicking the stop button, and it will stop the loop.
    stop(){
        this.setState({playing:false})
        console.log("Stop All")
        clearInterval(this.timer)
        this.state.tracks.map(track=>track.track.load())
    }

    // This function will triger after clicking one of the track buttons, and will add or remove the track from the playing loop.
    addOrRemove=(a,num)=>{
        const index = this.state.tracks.findIndex(item => item.track.src === a.src)
        if (index < 0) {
            console.log("Added to play list")
            this.setState(prevState=>({tracks:[{track:a,name:num},...prevState.tracks]}))
          }
        else{
            console.log("Removed from play list")
            this.state.tracks[index].track.load()
            const newList = this.state.tracks.filter((item) => item.track.src !== a.src);
            this.setState({tracks:newList})
          }
    }


    render() {
        return (
            <div className="mainContainer">

                <div className="trackButtons" style={{width:"50%"}}>
                    <Grid container spacing={5}>
                        {this.state.allTracks.map((track,index)=>{
                            return (
                                <Grid key={index} justify="center" container item xs={4} >
                                    <div style={{background:`${this.state.tracks.findIndex(item => item.track.src === track.src)>=0?"#aeaeae":"White"}`}} onClick={()=>this.addOrRemove(track,index+1)} className="card">
                                        <div><h4>{this.state.trackNames[index]}</h4></div>
                                    </div>
                                </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            

                <div className="controlButtons" style={{textAlign:"center",marginTop:"50px"}}>
                    <Button
                        style={{marginRight:"50px",width:"200px",height:"50px"}}
                        onClick={()=>this.play()}
                        variant="contained"
                        color="primary"
                        disabled={this.state.playing}
                        endIcon={<PlayCircleOutlineIcon/>}
                    >
                        Play
                    </Button>

                    <Button
                        style={{width:"200px",height:"50px"}}
                        variant="contained"
                        color="secondary"
                        onClick={()=>this.stop()}
                        endIcon={<StopIcon/>}
                    >
                        Stop
                    </Button>
                </div>

        </div>
        )
    }
}
