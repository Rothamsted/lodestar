# Linked Data Browser at Knetminer/Data

*This branch is to manage a LODEStar version of [Knetminer Data Site](https://knetminer.org/data). You find more explanations on that web site. The original LODEStar text follows below.*

## Lodestar

Lodestar is a Linked Data Browser and SPARQL endpoint. Lodestar is a Java based web app that can wrap any existing SPARQL endpoint to provide a set of additional SPARQL and Linked Data services. Lodestar was developed to provide a consistent set of SPARQL and Linked Data services across the European Bioinformatics Institute (EBI). Some of the service provided by Lodestar:

- Javascript based SPARQL endpoint with configurable example queries and paginated results table
- Read only SPARQL endpoint for protection from write operations
- A single SPARQL endpoint that provides a UI, the service and a SPARQL 1.1 service description
- SPARQL syntax highlighting provided by CodeMirror
- Works with any SPARQL endpoint (Includes Virtuoso JDBC connection option)
- Linked data browser for navigating data from a SPARQL endpoint
- Configurable resource description/linked data pages:
  - Renders resources by label where possible
  - Grouping of related resource by type
  - Set top facts to display, such as labels and descriptions
  - Configurable limits for how many related resources to render in the browser
- Renders depictions of resources
- Handles content negotiation for both SPARQL queries and linked data pages
- CORS enabled for cross domain scripting
- Basic REST API for accessing data in simplified JSON format

To see a demonstration of the Lodestar linked data browser please see the [Expression Atlas RDF website](http://www.ebi.ac.uk/rdf/services/atlas/sparql). Lodestar has been primarily developed as an internal tool for EBI services deploying RDF, however, the application should be sufficiently generic that others can use it. I can't guarantee any support for the software at this time, but please feel free to use it or adapt for your own purposes and let me know how you get on.

Documentation and stable release at [http://ebispot.github.io/lodestar/](http://ebispot.github.io/lodestar/).

## Release Notes

See the [revision history file](revision-history.md).

## Testing Locally

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

**Note:** For the describe endpoint, you'll need to be viewing a specific resource. For example:

- http://localhost:8080/describe?uri=http%3A%2F%2Fknetminer.org%2Fdata%2Frdf%2Fresources%2Fpublication_23105158