# Project-2
Project 2 - Georgia Tech Data Science and Analytics



test web output here https://key12pat34.github.io/Project_2/Project/v2.3/templates/homepage.html
----------

## Project Description/ Outline:
* We will create a map with Leaflet that shows houses for sale and schools in the area. This will be useful for teachers looking to move for a new position to see what schools have the best metrics and then compare those to houses for sale in the same area. They will be able to filter by housing criteria (price, beds/baths, etc.), school criteria (rankings, funding, school system, etc.), and county. This map could also be used for families considering a move to see what the best schooling and real estate options are in a given area.

## Research Questions to Answer:
* What are the best housing options near the school a teacher is hired at?
* What are the best schools for the real estate options a user is considering?
* Where can a user get the most value in their home purchase (price vs. size)?
* What counties have the best schools and real estate options?

----------

# Datasets to Use:
  ## School: 
    * Great Schools API: https://www.greatschools.org/api/docs/school-search/
    * Schools in the State of Georgia 2019: https://opendata.atlantaregional.com/datasets/schools-in-the-state-of-georgia-2019/geoservice?geometry=-85.993%2C32.434%2C-80.824%2C34.042

  ## Real Estate: 
    * Zillow API: https://rapidapi.com/dimashirokov/api/Zillow/endpoints
    * Realtor API: https://rapidapi.com/apidojo/api/realtor?endpoint=apiendpoint_e259775d-d98e-479f-8440-206d6d4fa892
    * US County Map GeoJSON (State: 13): https://eric.clst.org/tech/usgeojson/
  
  ## Tasks:
    * Get, Analyze, and Filter data
      * use PostgresAdmin to sure CSV data
 
    * Build a base layer map for targeted data
    
    * Start building multiple layers:  
      * Real Estate Property(Markers):
        * filter by beads, baths, value, age of property
      
      * School(Markers:
        * filter by grade level, school system, number of students, number of teachers, avg age of teacher experience
      
      * County Identifiers (Overlay Map (Polygons identifying county boundaries))
