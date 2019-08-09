/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var project;
var logo = document.getElementById("logo");    
var name = document.getElementById("name");

function scaleLogo( logo ) {
	
    var factor = 1;
    var maxHeight = Math.round( window.screen.availHeight/2 );
    
    var scaledHeight = logo.naturalHeight;
    var scaledWidth = logo.naturalWidth;
    // console.log( "natural width read "+scaledWidth+" and natural height read
	// "+scaledHeight );
    if (scaledWidth > window.screen.availWidth) {
        factor = window.screen.availWidth/logo.naturalWidth;
        scaledWidth = window.screen.availWidth;
        scaledHeight = Math.round( logo.naturalHeight * factor );
        // console.log( "scaling width to "+scaledWidth+" and height to
		// "+scaledHeight );
    }
    
    if (scaledHeight > maxHeight) {
        factor = maxHeight/scaledHeight;
        scaledHeight = maxHeight;
        scaledWidth = Math.round( scaledWidth * factor );
        // console.log( "scaling height to "+scaledHeight+" and width to
		// "+scaledWidth );
    }

    logo.height = scaledHeight ;
    logo.width = scaledWidth;
    
    // console.log( "maxHeight: "+maxHeight+" window:
	// "+window.screen.availWidth+"x"+window.screen.availHeight+" logo:
	// "+logo.width+"x"+logo.height)
     
}

function updateInfo( img ) {
	
	scaleLogo( img )
	var established = document.getElementById("established");
	var description = document.getElementById("description");
	var website = document.getElementById("website");

	name.innerHTML = project.name;
    if (project.podling)
    {
        name.innerHTML = project.name+" (Incubating)";
    }
    established.innerHTML = "Established "+project.established;
    description.innerHTML = project.description;
    website.href=project.website;
    website.innerHTML=project.website;
    
}

async function displayProjects( projects ) {
	var logo = document.getElementById("logo");
    while (true) {
    	for (var key in projects) {
            project = projects[key];
            if (project.has_default) {
            	// console.log( "project: "+key )
                logo.src="res/"+ key+".png";                 
                await sleep(15000);
            }
        }
    }
}

function setup( projects ) {
    displayProjects( projects )
}
