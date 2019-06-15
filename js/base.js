/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scaleLogo( logo ) {
    var factor = 1;
    var maxHeight = Math.round( window.screen.availHeight/2 );
    if (logo.width > window.screen.availWidth) {
        factor = window.screen.availWidth/logo.width;
        logo.width = window.screen.availWidth;
        logo.height = Math.round( logo.height * factor );
    }
    
    if (logo.height > maxHeight) {
        factor = maxHeight/logo.height;
        logo.height = maxHeight;
        logo.width = Math.round( logo.width * factor );
    }    
     
}

async function displayProjects( projects ) {
    
    var logo = document.getElementById("logo");
    var name = document.getElementById("name");
    var established = document.getElementById("established");
    var description = document.getElementById("description");
    var website = document.getElementById("website");
    
     while (true) {
        for (var key in projects) {
            if (projects.hasOwnProperty(key)) {
                var project = projects[key];
                if (project.images.length) {
                    var image = project.images[0];
                    if (image.filename) 
                    {
                        logo.src="res/"+ image.filename;                
                        logo.height = image.height;
                        logo.width = image.width;
                        scaleLogo( logo );
                        name.innerHTML = project.name;
                        if (project.podling)
                        {
                            name.innerHTML = project.name+" (Incubating)";
                        }
                        established.innerHTML = "Established "+project.established;
                        description.innerHTML = project.description;
                        website.href=project.website;
                        website.innerHTML=project.website;
                        await sleep(15000);
                    }
                }
            }
        }
    }
}

function setup( projects ) {
    displayProjects( projects )
}
