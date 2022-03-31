# NYCHA Flood Vulnerability
New York City's waterfront has seen rapid transformation in recent years, particularly as abandoned lots and industrial hubs were converted to luxury developments. Often tucked between or shadowed by these new developments is the City's original waterfront housing: NYCHA developments.

I created this map to illustrate the threats that NYCHA residents face resulting from climate change and its associated sea level rise and future storm surge. Climate change has the potential to displace some of our city's most vulnerable residents, and they must not be left out of the conversation as we plan for future resiliency. 

![screenshot of map](https://user-images.githubusercontent.com/98992038/160967282-64aa775e-f714-4811-b8c5-9fbba2467381.png)

## How to use this map
This map was created using public data published by the City of New York and the [Mapbox GL JS library](https://docs.mapbox.com/mapbox-gl-js/guides/). Zoom and pan the map to look around New York City. You can hover over a NYCHA development to learn more about it and use the controls in the upper right to toggle between different future floodplains and storm surge flooding events. Opening up the bottom accordion in the sidebar will display some basic statistics on the residents and developments impacted by the floodplain and flooding event you have selected. These statistics are updated as you make changes to the map.

<img src="https://user-images.githubusercontent.com/98992038/160969656-6798cb3c-b3f0-4882-a121-8323445b852c.gif" width="60%">

## Data Sources & Processing
* [100-year Floodplain](https://data.cityofnewyork.us/Environment/Sea-Level-Rise-Maps-2020s-100-year-Floodplain-/ezfn-5dsb)
* [500-year Floodplain](https://data.cityofnewyork.us/Environment/Sea-Level-Rise-Maps-2020s-500-year-Floodplain-/ajyu-7sgg)
* [NYC Stormwater Flood Map - Moderate Flood](https://data.cityofnewyork.us/City-Government/NYC-Stormwater-Flood-Map-Moderate-Flood/5rzh-cyqd)
* [NYC Stormwater Flood Map - Extreme Flood](https://data.cityofnewyork.us/City-Government/NYC-Stormwater-Flood-Map-Extreme-Flood/w8eg-8ha6)
* [NYC Recovery & Resiliency Projects Map](https://data.cityofnewyork.us/City-Government/NYC-Recovery-Resiliency-Projects-Map-Polygons/fpuh-f5mr)
* [Map of NYCHA Developments](https://data.cityofnewyork.us/Housing-Development/Map-of-NYCHA-Developments/i9rv-hdr5)

Note: Sea Level Rise Maps and Stormwater Flood Maps were processed in QGIS to fix and simplify geometries and dissolved to remove overlapping polygons. Floodplain maps were also clipped to [NYC Borough Boundaries](https://data.cityofnewyork.us/City-Government/Borough-Boundaries/tqmj-j8zm).

<hr>

This project was completed for an [interactive webmapping course](https://wagner.nyu.edu/education/courses/advanced-gis-interactive-web-mapping-and-spatial-data-visualization) at NYU Wagner. Special thanks to [Chris Whong](https://github.com/chriswhong) for his expertise and support. If you're interested in seeing more of my work, please check out my [website](https://joann-lee.com/) and [blog](https://medium.com/@joannlee_nyc). 
