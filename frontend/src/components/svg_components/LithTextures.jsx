import React, { Component } from 'react';

import SandGravel from './SandGravel';
import Sand from './Sand';
import SandySilt from './SandySilt';
import Silt from './Silt';
import SiltySand from './SiltySand';
import Clay from './Clay';
import ForamOoze from './ForamOoze';
import CoarseForamOoze from './CoarseForamOoze';

class LithTextures extends Component {
	render() {
		return (
			<svg height="0" width="0" position="absolute" display="block">				
				<defs className="lithology-patterns">
					<SandGravel id={"sand-gravel-pattern"} width={54.125} height={54.125}/>		
					<Sand id={"sand-pattern"} width={200} height={200}/>	
					<Sand id={"fine-sand-pattern"} width={100} height={100}/>					
					<SandySilt id={"sandy-silt-pattern"} width={53.584} height={53.584}/>
					<Silt id={"silt-pattern"} width={54.125} height={54.125}/>
					<Silt id={"clay-silt-pattern"} width={54.125} height={54.125}/>
					<SiltySand id={"silty-sand-pattern"} width={54.125} height={54.125}/>
					<Clay id={"clay-pattern"} width={53.584} height={53.584}/>
					<ForamOoze id={"foram-ooze-pattern"} width={30} height={30} scale={"scale(0.5)"}/>
					<ForamOoze id={"coarse-foram-ooze-pattern"} width={35} height={35} scale={"scale(0.8)"}/>				
				</defs>
			</svg>
		);
	}
}

export default LithTextures;