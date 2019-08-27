/*
 * Copyright (c) 2013 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

var activateQueryHistory=false;

var exampleQueries = [
    {
        category: "Knetminer Examples",
        queries:[
            {
                shortname : "Example Query 1",
                description: "Select a Knetminer Protein",
                namedgraph: "",
                query: "SELECT ?prot ?name ?description\n" + 
                		"{\n" + 
                		"  ?prot a bk:Protein.\n" + 
                		"  \n" + 
                		"  OPTIONAL { ?prot bk:prefName ?name }\n" + 
                		"  OPTIONAL { ?prot dcterms:description ?description }\n" + 
                		"}\n" + 
                		"LIMIT 100"
            }
        ]

    }

]