# Revision History

*This file was last reviewed on 2023-08-30.* **Please, keep this note updated.**

## 3.0.1-SNAPSHOT
Current snapshot

## 3.0-KNM

Visual overhaul to Index, Explorer and Resource description pages. Details below.

### Home page & general
* Updated README to include 'Testing Locally' section for developers
* Added new banners to all pages
* Updated fonts throughout to use Nexa, the KnetMiner standard
* Added navbar to all main HTML pages
* Updated license terms
* Updated all URLs on index
* Modernised scrollbars
* Improved tab/page titles
* Added Favicon to all major HTML pages

### Explorer page
* Widened Explorer's Query box (reducing sample query space)
* Lengthened Explorer's Query box by 50px
* Reduced width of Results per page selector - moved it in line with Output dropdown
* Added 200 & 500 to Results per page selector
* Modernised buttons, added color
* Added increased padding around page

### Resource Description page
* Widened About paragraph to have wider maxwidth
* Updated H2 color to be KnetMiner green
* Improved padding on outer edges


## 2.0.1-KNM
* Minor improvements to the splash page text and layout.

## 2.0-KNM
* The *-KNM versions are the Knetminer fork, with Knetminer-specific customisations, done to support our [data access endpoint][10].

[10]: https://knetminer.com/data


## Other versions

This was copied from the [original repo](https://github.com/EBISPOT/lodestar).

**1.3**  15th October 2014
* Fixed potential race condition in explorer when using a small number of connection pools
* Javascript fix to support next/prev links preserving inference option
* IE 11 rendering issue fixed
* Added no JNDI implementation for virtuoso connection pooling

**1.2**  21st August 2014
* Updated to Jena 2.12
* Exposed JSON-LD support from Jena in UI 
* Moved virtuoso to separate module, only builds in "virtuoso" profile
* Removed dependencies on virtuoso inferencing rules
* SPARQL endpoint now support application/sparql-query POST requests 
* Fixed some browser rendering bugs 

**1.1** 27th November 2013	
* Updated to Jena 2.11
* Fixed query limit bug (RDF-10)
* Added config for query timeouts (RDF-15)
* Configurable hide RDFS button (RDF-7)
* Added servlet status monitor
* javascript cleanup

**1.0.2** 29th August 2013	
* Updated to Jena 2.10
* VirtJena JDBC 4 (includes support for SPARQL bind queries). Requires virtuoso 6.1.7.2
* Added CSV and TSV sparql results export
* Fixed sparql results offset caching from previous query
* Fixed virtuoso describe query not returning all triples from all graphs

**1.0.1** 5th August 2013
* First release
