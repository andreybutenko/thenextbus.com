library(tidyverse)
library(jsonlite)
library(leaflet)
library(geojsonio)
library(sf)

# Routes describe scheduled bus routes
# We'll use it to display route names to customers
# https://gtfs.org/documentation/schedule/reference/#routestxt
routes <- read.csv('./raw/routes.txt')

# Shapes are the actual paths taken by a bus
# We'll use it to plot routes on a map
# https://gtfs.org/documentation/schedule/reference/#shapestxt
shapes <- read.csv('./raw/shapes.txt')

# Trips describe each trip taken by each route
# We only need it to combine each route with its associated shape
# https://gtfs.org/documentation/schedule/reference/#tripstxt
trips <- read.csv('./raw/trips.txt')

# Create combined dataset (CSV)

routeshapes_csv <-
  # Start with routes dataset
  routes %>% 
  
  # Join with trips dataset, they both have "route_id" column in common
  left_join(trips, by = "route_id") %>%
  
  # Now we have a lot more columns from the trips dataset, but we aren't interested in all of them
  # Just select the columns that we want: columns from the routes dataset, and the "shape_id" column
  select(colnames(routes), shape_id) %>% 
  
  # There are many trips with each route, but we only want to graph each trip once
  # De-duplicate rows by keeping keeping only one row per unique "route_id"
  distinct(route_id, .keep_all = TRUE) %>% 
  
  # Finally, join with "shapes" dataset
  left_join(shapes, by = "shape_id")

# Save combined dataset
write.csv(
  routeshapes_csv,
  file = './route-map/routeshapes.csv',
  row.names = FALSE
)

# Visualize combined dataset (GeoJSON)

map_csv <- leaflet()

# Add each shape as a polyline
for (id in unique(routeshapes_csv$shape_id)) {
  shape_data <- routeshapes_csv %>%
    filter(shape_id == id)
  
  map_csv <- map_csv %>%
    addPolylines(lng = routeshapes_csv$shape_pt_lon,
                 lat = routeshapes_csv$shape_pt_lat,
                 label = paste("Shape ID:", id),
                 weight = 3, color = "blue", opacity = 0.7)
}

map_csv

# Transform to GeoJSON

# Group by route_id and route_long_name to make one line per route
routeshapes_geojson <- routeshapes_csv %>%
  arrange(route_id, shape_pt_sequence) %>%
  group_by(route_id, route_short_name, route_desc) %>%
  nest() %>%
  mutate(geometry = purrr::map(
    data,
    ~ st_linestring(as.matrix(select(.x, shape_pt_lon, shape_pt_lat)))
  )) %>%
  select(route_id, route_short_name, route_desc, geometry) %>%
  st_sf(crs = 4326)

geojson_write(routeshapes_geojson, file = "./route-map/routeshapes.geojson")
