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
 
import urllib.request
import urllib.error
import json
import os 


# get the directory path on the file system
dirPath = os.path.dirname(os.path.realpath(__file__))

directory = dirPath+"/res/"
try :
    os.makedirs( directory )
except OSError:
    pass
        
# read the logos.json file from apache.org and save it with 'projects=' before it.        
print( "Retrieving projects..." )        
urlPfx = "http://apache.org/logos/res/"
contents = urllib.request.urlopen( "http://apache.org/logos/res/logos.json").read()
localName = directory+"logos.json"
with open(localName, "wb") as code:
    code.write( str.encode("projects=") )
    code.write(contents)

# parse the contents and iterate over each entry    
parsed = json.loads( contents )

for entry in parsed:
    
    directory = dirPath+"/res/"+entry
    try:
        os.makedirs( directory )
    except OSError:
        pass

    project = parsed[entry]
    if project['has_default'] == True :
        url = "{}{}/default_hr.png".format( urlPfx, entry )
        localFname = "{}/res/{}.png".format( dirPath, entry )
        print( "{} has logo".format( entry ) )
        try:
            data = urllib.request.urlopen(url).read()
            with open(localFname, "wb") as code:
                code.write(data)
        except urllib.error.HTTPError as e:
            print( e.code )
            print( e.msg )
            print( e.headers )
            print( e.fp.read() )
    else :
        print( "{} does not have logo".format( entry ))    
