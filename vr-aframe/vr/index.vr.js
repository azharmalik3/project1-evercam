import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Image
} from 'react-vr';
const VrButton = require('VrButton');

export default class testTour extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			source: '360/build.jpg',
			icon: 'icons/logo.png',
			x: -3.5,
			y: 0.5,
			z: -3,
			rotate: 45,
		};
	}
	
	render() {
		
		return (
			<View>
				<Pano
					style={{
						position: 'absolute',
					}}
					source={asset(this.state.source)}
				/>
				<View style={{
					flex: 1,
					flexDirection: 'column',
					width: 2,
					alignItems: 'center',
					justifyContent: 'center',
					width: 0.7,
					transform: [
						{translate: [this.state.x, this.state.y, this.state.z]},
						{rotateY : this.state.rotate},
					]
				}}>
					<VrButton
						onClick={()=>{
							if(this.state.source.toString() == '360/waxie1.jpg'){
								this.setState({
									source: '360/build.jpg',
									x: -3.5,
									y: 0.5,
									z: -3,
									rotate: 45
								})
							} else {
								this.setState({
									source: '360/waxie1.jpg',
									x: -4,
									y: 0.5,
									z: 4,
									rotate: -45
								})
							}
					}}>
						<Image style={{width:1.5, height:1.5}}
							source={asset(this.state.icon)}
							inset={[0.2,0.2,0.2,0.2]}
							insetSize={[0.05,0.45,0.55,0.15]} >
						</Image>
					</VrButton>
				</View>
			</View>
		);
	}
};

AppRegistry.registerComponent('testTour', () => testTour);
