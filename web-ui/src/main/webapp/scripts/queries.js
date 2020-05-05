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
					"SELECT DISTINCT ?geneName\n" +
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
	}, // AgriSchemas
	
	// ----------
	{
		category: "CoViD 19",
		queries: [
			{
				shortname: "Drugs occurring in known publications",
				description: "",
				namedgraph: "",
				query: 
				"SELECT ?pubYear ?pubTitle ?pubAcc ?drugName ?pub ?drug\n" +
				"FROM bkg:human-covid19\n" +
				"{\n" +
				"  ?pub a bk:Publication;\n" +
				"    dc:identifier/dcterms:identifier ?pubAcc;\n" +
				"    bka:AbstractHeader ?pubTitle;\n" +
				"    bka:YEAR ?pubYear.\n" +
				"  \n" +
				"  ?drug a bk:Drug;\n" +
				"    bk:occ_in ?pub;\n" +
				"    bk:prefName ?drugName.\n" +
				"\n" +
				"  VALUES ?pubAcc { '32226295'\n" +
				"    '111B9A6E91C938696FCDB4CB128B8AE739DBE11C'\n" +
				"    '7852AAFDFB9E59E6AF78A47AF796325434F8922A'\n" +
				"    '6CF87A546884756094DA0D300E85A061C2CC43EA'\n" +
				"    'F863247DC84916A96448088399BADEFD09D54FB8' }\n" +
				"}\n" +
				"ORDER BY DESC ( ?pubYear ) ?pubAcc ?drugName"
			},
			{
				shortname: "Proteins and genes related to known drugs",
				description: "",
				namedgraph: "",
				query: 
					"SELECT DISTINCT ?drugName ?protName ?geneAcc ?xrefName ?gene ?protein ?xref\n" + 
					"FROM bkg:human-covid19\n" + 
					"{  \n" + 
					"  ?drug a bk:Drug;\n" + 
					"    bk:prefName ?drugName;\n" + 
					"    bk:has_target ?protein.\n" + 
					"  \n" + 
					"  ?protein a bk:Protein;\n" + 
					"    bk:prefName ?protName.\n" + 
					"  \n" + 
					"  ?gene a bk:Gene;\n" + 
					"    dc:identifier/dcterms:identifier ?geneAcc.\n" + 
					"\n" + 
					"  ?gene bk:enc ?xref.\n" + 
					"  ?xref a bk:Protein;\n" + 
					"    bk:prefName ?xrefName.\n" + 
					"  ?xref bk:xref|^bk:xref ?protein.\n" + 
					"\n" + 
					"  FILTER ( LCASE (?drugName) IN (\n" + 
					"    'opril',\n" + 
					"    'minoxidil',\n" + 
					"    'benzoyl peroxide',\n" + 
					"    'isotretinoin',\n" + 
					"    'trifluoperazine'\n" + 
					"  ))\n" + 
					"}\n" + 
					"ORDER BY ?drugName ?protName ?geneAcc"		
			},
			{
				shortname: "Distribution biomolecular entity citations and associated diseases",
				description: "An example of how to get stats. Counts citations of genes/proteins associated to diseases " +
					"and reports the frequency distribution of citations per diseases.",
				namedgraph: "",
				query: 
					"SELECT ?maxPub (COUNT (?disease) AS ?diseaseNo)\n" +
					"FROM bkg:human-covid19\n" +
					"{  \n" +
					"  {\n" +
					"    SELECT (COUNT (DISTINCT ?pub) AS ?pubNo) ?disease\n" +
					"    {\n" +
					"      ?disease a bk:Disease.\n" +
					"      ?bioel bk:inv_in ?disease.\n" +
					"      { ?bioel a bk:Gene } UNION { ?bioel a bk:Protein }\n" +
					"      ?bioel bk:occ_in ?pub.\n" +
					"    } GROUP BY ?disease\n" +
					"  }\n" +
					"\n" +
					"  FILTER ( ?pubNo < ?maxPub )\n" +
					"\n" +
					"  VALUES ?maxPub {\n" +
					"    5 10 30 50 100 1E9\n" +
					"  }\n" +
					"}\n" +
					"GROUP BY ?maxPub\n" +
					"ORDER BY ?maxPub"
			},
			{
				shortname: "Most common drug-related pathways cited in literature",
				description: "Selects the GO:BioProcs associated to proteins targeted by literature-cited " + 
				  "drugs. Counts the number of publications.",
				namedgraph: "",
				query: 
					"SELECT ?pathway (COUNT ( DISTINCT ?pub ) AS ?pubNo)\n" + 
					"FROM bkg:human-covid19\n" + 
					"{\n" + 
					"  ?prot a bk:Protein;\n" + 
					"    bk:participates_in ?bp;\n" + 
					"    ^bk:has_target ?drug.\n" + 
					"\n" + 
					"  ?bp a bk:BioProc;\n" + 
					"    bk:prefName ?pathway.\n" + 
					"\n" + 
					"  ?drug a bk:Drug;\n" + 
					"    bk:occ_in ?pub. \n" + 
					"\n" + 
					"  ?pub a bk:Publication\n" + 
					"}\n" + 
					"GROUP BY ?pathway\n" + 
					"ORDER BY DESC ( ?pubNo )\n" + 
					"LIMIT 10"
			}													
		] // covid19 queries							
  } // covid19 group
]; // All

