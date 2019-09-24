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
		category: "Knetminer",
		queries: [
			{
				shortname: "Find genes involved in oxygenic photosynthesis pathway",
				description: "Selects genes that encode enzymes affecting reactions in the pathway at issue.",
				namedgraph: "",
				query: 
					"SELECT DISTINCT ?geneName" +
					"WHERE {\n" + 
			  	"  ?path a bk:Path.\n" + 
			  	"  ?react bk:part_of ?path.\n" + 
			  	"  ?react a bk:Reaction.\n" + 
			  	"  ?react bk:ca_by|bk:in_by ?enzyme.\n" + 
			  	"  ?protein bk:is_a ?enzyme.\n" + 
			  	"  ?gene bk:enc ?protein.\n" + 
			  	"  \n" + 
			  	"  ?gene bk:prefName ?geneName.\n" + 
			  	"  ?path bk:prefName ?pathName.\n" + 
			  	"  \n" + 
			  	"  FILTER ( REGEX ( ?pathName, 'oxygenic photosynthesis', 'i' ) )\n" + 
			  	"}\n" + 
			  	"ORDER BY ?geneName\n"
			},
			{
				shortname: "Find genes mentioned by known articles",
				namedgraph: "",
				description: 
					"Starts from looking up publications based on PMED IDs. " + 
					"Shows the use of Knetminer/Ondex attributes (bka:xxx).",
				query:
					"SELECT DISTINCT ?pmedId ?title ?authorsList ?year ?geneName \n" + 
					"WHERE {\n" + 
					"  ?pubAcc a bk:Accession;\n" + 
					"	dcterms:identifier ?pmedId;\n" + 
					"	bk:dataSource bk:NLM.\n" + 
					"  \n" + 
					"  FILTER ( \n" + 
					"   ?pmedId IN ( '21710462', '24373199', '26863009', \n" + 
					"			   '14564046', '23970082' ) \n" + 
					"  )\n" + 
					"  \n" + 
					"  ?pub a bk:Publication;\n" + 
					"	dc:identifier ?pubAcc;\n" + 
					"	bka:AbstractHeader ?title;\n" + 
					"	bka:AUTHORS ?authorsList.\n" + 
					"  \n" + 
					"  OPTIONAL { ?pub bka:YEAR ?year }\n" + 
					"\n" + 
					"  ?gene bk:occ_in ?pub.\n" + 
					"  ?gene bk:prefName ?geneName.  \n" + 
					"}\n" + 
					"ORDER BY DESC ( ?year ) ?pmedId\n"
			}
		] // KnetMiner Queries
	}, // KnetMiner
	
	// ----------
	{
		category: "AgriSchemas",
		queries: [
			{
				shortname: "Gene Expression about given genes",
				description: "Shows expression levels from GXA from a given list of (Knetminer) genes",
				namedgraph: "",
				query: 
					"SELECT ?gene ?geneAcc ?condLabel ?studyTitle ?study ?condTerm \n" + 
					"{\n" + 
					"?gene a bk:Gene;\n" + 
					"  dcterms:identifier ?geneAcc.\n" + 
					"\n" + 
					"FILTER ( UCASE (?geneAcc) IN ( \n" + 
					"  'TRAESCS2D02G242700','TRAESCSU02G073600','TRAESCS7D02G050400',\n" + 
					"  'TRAESCS6D02G393900','TRAESCS7D02G503700','TRAESCS7D02G431500',\n" + 
					"  'TRAESCS1D02G090100','TRAESCS1D02G156000','TRAESCS2B02G046700',\n" + 
					"  'TRAESCS4A02G318000','TRAESCS1A02G443400','TRAESCS7D02G241300',\n" + 
					"  'TRAESCS6D02G107700','TRAESCS5D02G247200'\n" + 
					"))  \n" + 
					"\n" + 
					"?gene bioschema:expressedIn ?condition.\n" + 
					"  \n" + 
					"?expStatement a rdfs:Statement;\n" + 
					"  rdf:subject ?gene;\n" + 
					"  rdf:predicate bioschema:expressedIn;\n" + 
					"  rdf:object ?condition;\n" + 
					"  agri:score ?score;\n" + 
					"  agri:evidence ?study.\n" + 
					"                \n" + 
					"?condition schema:prefName ?condLabel.\n" + 
					"OPTIONAL { ?condition schema:additionalType ?condTerm. }\n" + 
					"  \n" + 
					"?study \n" + 
					"  dc:title ?studyTitle;\n" + 
					"}\n" + 
					"ORDER BY ?study ?gene\n"
			},
			{
				shortname: "Gene Expression and publications",
				description: "Select gene expression (from GXA) and gene-mentioning publications (from Knetminer).",
				namedgraph: "",
				query: 
					"SELECT ?gene ?geneAcc ?condLabel ?studyTitle ?study ?pub ?pubTitle ?pubYear ?condTerm \n" + 
					"{\n" + 
					"	?gene a bk:Gene;\n" + 
					"		dcterms:identifier ?geneAcc.\n" + 
					"		\n" + 
					"	?gene bioschema:expressedIn ?condition.\n" + 
					"		\n" + 
					"	?expStatement a rdfs:Statement;\n" + 
					"		rdf:subject ?gene;\n" + 
					"		rdf:predicate bioschema:expressedIn;\n" + 
					"		rdf:object ?condition;\n" + 
					"		agri:score ?score;\n" + 
					"		agri:evidence ?study.\n" + 
					"\n" + 
					"	?gene bk:occ_in ?pub.\n" + 
					"		\n" + 
					"	?pub a bk:Publication;\n" + 
					"		bka:AbstractHeader ?pubTitle.\n" + 
					"	OPTIONAL { ?pub bka:YEAR ?pubYear }\n" + 
					"			\n" + 
					"	?condition schema:prefName ?condLabel.\n" + 
					"	OPTIONAL { ?condition schema:additionalType ?condTerm. }\n" + 
					"		\n" + 
					"	?study \n" + 
					"		dc:title ?studyTitle;\n" + 
					"}\n" + 
					"ORDER BY ?study ?gene\n"
			}			
		] // AgriSchemas queries
	} // AgriSchemas
]