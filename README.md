# Linked Data Browser at Knetminer/Data

*This branch is to manage a LODEStar version of [Knetminer Data Site](https://knetminer.org/data). You find more explanations on that web site. The original LODEStar text follows below.*

# Lodestar

Lodestar is a Linked Data Browser and SPARQL endpoint. Lodestar is a Java based web app that can wrap any existing SPARQL endpoint to provide a set of additional SPARQL and Linked Data services. Lodestar was developed to provide a consistent set of SPARQL and Linked Data services across the European Bioinformatics Institute (EBI). Some of the service provided by Lodestar:

* Javascript based SPARQL endpoint with configurable example queries and paginated results table
* Read only SPARQL endpoint for protection from write operations
* A single SPARQL endpoint that provides a UI, the service and a SPARQL 1.1 service description
* SPARQL syntax highlighting provided by CodeMirror
* Works with any SPARQL endpoint (Includes Virtuoso JDBC connection option)
* Linked data browser for navigating data from a SPARQL endpoint
* Configurable resource description/linked data pages:
  * Renders resources by label where possible
  * Grouping of related resource by type
  * Set top facts to display, such as labels and descriptions
  * Configurable limits for how many related resources to render in the browser
* Renders depictions of resources
* Handles content negotiation for both SPARQL queries and linked data pages
* CORS enabled for cross domain scripting
* Basic REST API for accessing data in simplified JSON format

To see a demonstration of the Lodestar linked data browser please see the [Expression Atlas RDF website](http://www.ebi.ac.uk/rdf/services/atlas/sparql). Lodestar has been primarily developed as an internal tool for EBI services deploying RDF, however, the application should be sufficiently generic that others can use it. I can't guarantee any support for the software at this time, but please feel free to use it or adapt for your own purposes and let me know how you get on.

Documentation and stable release at [http://ebispot.github.io/lodestar/](http://ebispot.github.io/lodestar/).

## Release Notes

See the [revision history file](revision-history.md).

## Testing the Knetminer branch locally

To test locally, ensure you are on the `knetminer-httpsparql` branch. Follow the steps below:

1. Clone the repository (or checkout knetminer-httpsparql):
    `git clone -b knetminer-httpsparql https://github.com/Rothamsted/knetminer-lodestar`
2. Navigate to the test-utils directory:
    `cd knetminer-lodestar/test-utils`
3. Run the build script:
    `./build-n-run-test.sh`

After the build is successful, you can access the application at localhost:8080. Here are the sites to check:

- http://localhost:8080/
- http://localhost:8080/sparql
- http://localhost:8080/describe

As it is common, the describe endpoint shows a subject-centric description of a resource, given its URI. For example:

- http://localhost:8080/describe?uri=http%3A%2F%2Fknetminer.org%2Fdata%2Frdf%2Fresources%2Fpublication_23105158

Links like this are created in the SPARQL query results, when your query returns a URI.
For instance, try [one of the GXA examples][GXA-EX-1], and then click links under the 'gene' or 'study' column.

[GXA-EX-1]: http://localhost:8080/sparql?query=PREFIX+bk%3A+%3Chttp%3A%2F%2Fknetminer.org%2Fdata%2Frdf%2Fterms%2Fbiokno%2F%3E%09PREFIX+bkr%3A+%3Chttp%3A%2F%2Fknetminer.org%2Fdata%2Frdf%2Fresources%2F%3E%0D%0APREFIX+bka%3A+%3Chttp%3A%2F%2Fknetminer.org%2Fdata%2Frdf%2Fterms%2Fbiokno%2Fattributes%2F%3E%09PREFIX+bkg%3A+%3Chttp%3A%2F%2Fknetminer.org%2Fdata%2Frdf%2Fresources%2Fgraphs%2F%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%09PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+owl%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%09PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0D%0APREFIX+dcterms%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%09PREFIX+agri%3A+%3Chttp%3A%2F%2Fagrischemas.org%2F%3E%0D%0APREFIX+bioschema%3A+%3Chttp%3A%2F%2Fbioschemas.org%2F%3E%09PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0D%0A%0D%0A%0D%0ASELECT+%3Fgene+%3FgeneAcc+%3FcondLabel+%3FstudyTitle+%3Fstudy+%3Fpub+%3FpubTitle+%3FpubYear+%3FcondTerm+%0D%0A%7B%0D%0A%09%3Fgene+a+bk%3AGene%3B%0D%0A%09%09dcterms%3Aidentifier+%3FgeneAcc.%0D%0A%09%09%0D%0A%09%3Fgene+bioschema%3AexpressedIn+%3Fcondition.%0D%0A%09%09%0D%0A%09%3FexpStatement+a+rdfs%3AStatement%3B%0D%0A%09%09rdf%3Asubject+%3Fgene%3B%0D%0A%09%09rdf%3Apredicate+bioschema%3AexpressedIn%3B%0D%0A%09%09rdf%3Aobject+%3Fcondition%3B%0D%0A%09%09agri%3Aevidence+%3Fstudy.%0D%0A%0D%0A%09%3Fgene+bk%3Aocc_in+%3Fpub.%0D%0A%09%09%0D%0A%09%3Fpub+a+bk%3APublication%3B%0D%0A%09%09bka%3AAbstractHeader+%3FpubTitle.%0D%0A%09OPTIONAL+%7B+%3Fpub+bka%3AYEAR+%3FpubYear+%7D%0D%0A%09%09%09%0D%0A%09%3Fcondition+schema%3Aname+%3FcondLabel.%0D%0A%09OPTIONAL+%7B+%3Fcondition+dc%3Atype+%3FcondTerm.+%7D%0D%0A%09%09%0D%0A%09%3Fstudy+%0D%0A%09%09dc%3Atitle+%3FstudyTitle%3B%0D%0A%7D%0D%0AORDER+BY+%3Fstudy+%3Fgene%0D%0A&render=HTML&limit=25&offset=0#loadstar-results-section
