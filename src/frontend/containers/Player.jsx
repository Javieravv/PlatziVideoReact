import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
// import { Redirect } from 'react-router-dom';
import '../assets/styles/components/Player.scss';
import NotFound from '../containers/NotFound';

const Player = props => {
    // obtenemos el id que se recibe por parámetro 
    // props.match.paramos lo envìa router cuando se genera la ruta. Llegan en match. 
    // usamos actions, reducers, para lograr bucar el video, con id como referen
    const { id } = props.match.params;

    // Validamos si hay video o si existe el elemento o un error
    const hasPlaying = Object.keys(props.playing).length > 0;
    // usamos useEffect para poder manejar el efecto que encontrará el id y lo transmite al action y reduer
    // para el flujo e la iformación.

    useEffect(()=>{
        props.getVideoSource(id); // para que vaya al reducer y haga el filtro para obtener el video
    }, []);

    return hasPlaying ? (
        <div className="player">
            <video controls autoplay>
                <source src={props.playing.source} type="video/mp4" />
            </video>
            <div className="Player-back">
                <button type="button" onClick={()=>props.history.goBack()}>
                    Regresar
                </button>
            </div>
        </div>
    ) 
    :
    <NotFound />;
};

const mapStateToProps = state => {
    return {
        playing: state.playing,
    };
};

const mapDispatchToProps = {
    getVideoSource,
};

export default connect (mapStateToProps, mapDispatchToProps)(Player);
