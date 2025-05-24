library(tidyverse)
library(jsonlite)
library(leaflet)

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

# Create combined dataset

routeshapes <-
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
  routeshapes,
  file = './route-map/routeshapes.csv',
  row.names = FALSE
)

# To test our data - let's visualize it

map <- leaflet()

# Add each shape as a polyline
for (id in unique(combined$shape_id)) {
  shape_data <- combined %>%
    filter(shape_id == id)
  
  map <- map %>%
    addPolylines(lng = shape_data$shape_pt_lon,
                 lat = shape_data$shape_pt_lat,
                 label = paste("Shape ID:", id),
                 weight = 3, color = "blue", opacity = 0.7)
}

# Show the map
map