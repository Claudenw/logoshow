'''
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
'''
 
import urllib2
import json
import os 


dirPath = os.path.dirname(os.path.realpath(__file__))

directory = dirPath+"/res/"
try :
    os.makedirs( directory )
except OSError, e:
    pass
        
print( "Retrieving projects..." )        
urlPfx = "http://apache.org/logos/res/"
contents = urllib2.urlopen( "http://apache.org/logos/res/logos.json").read()
localName = directory+"logos.json"
with open(localName, "wb") as code:
    code.write( "projects=")
    code.write(contents)
    
parsed = json.loads( contents )

for entry in parsed:
    print( "Project: "+entry )
    directory = dirPath+"/res/"+entry
    try:
        os.makedirs( directory )
    except OSError, e:
        pass

    project = parsed[entry]
    images = project["images"]
    for image in images:
        fileName = image['filename']
        localFname = dirPath+'/res/'+fileName
        url = urlPfx + fileName
        print( "  file: "+fileName )
        try:
            data = urllib2.urlopen(url).read()
            with open(localFname, "wb") as code:
                code.write( "projects = ")
                code.write(data)
        except urllib2.HTTPError, e:
            print e.code
            print e.msg
            print e.headers
            print e.fp.read()
        