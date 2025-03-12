library(tidyverse)
library(jsonlite)

routes <- read.csv('./raw/routes.txt')
stops <- read.csv('./raw/stops.txt')
stop_times <- read.csv('./raw/stop_times.txt')
trips <- read.csv('./raw/trips.txt')

# route_id_details.json
# Map from route ID to route details: short name and description

route_id_details_df <- routes %>% 
  select(route_id, route_short_name, route_desc)

route_id_details_map <- route_id_details_df %>%
  group_by(route_id) %>%
  nest() %>% 
  deframe() %>%
  toJSON(auto_unbox = TRUE, pretty = TRUE)

write(route_id_details_map, './processed/route_id_details.json')

# trip_id_details.json
# Map from trip ID to route ID and direction ID

trip_id_details_df <- stop_times %>%
  inner_join(trips, by = "trip_id") %>%
  inner_join(routes, by = "route_id") %>% 
  select(trip_id, route_id, direction_id) %>% 
  distinct() %>% 
  rename(rid = route_id, did = direction_id)

trip_id_details_map <- trip_id_details_df %>%
  group_by(trip_id) %>%
  nest() %>% 
  deframe() %>%
  toJSON(auto_unbox = TRUE)

write(trip_id_details_map, './processed/trip_id_details.json')

# trip_id_headboard.json
# Map from trip ID to headboard

trip_id_headboard_df <- stop_times %>%
  inner_join(trips, by = "trip_id") %>%
  inner_join(routes, by = "route_id") %>%
  select(trip_id, trip_headsign) %>%
  unique() %>% 
  rename(ths = trip_headsign)

trip_id_headboard_map <- trip_id_headboard_df %>%
  group_by(trip_id) %>%
  nest() %>%
  deframe() %>%
  toJSON(auto_unbox = TRUE)

write(trip_id_headboard_map, './processed/trip_id_headboards.json')

# trip_id_headboard_df <- stop_times %>%
#   inner_join(trips, by = "trip_id") %>%
#   inner_join(routes, by = "route_id") %>% 
#   select(trip_id, trip_headsign) %>% 
#   unique()
# 
# headboard_factors_df <- trip_id_headboard_df %>%
#   distinct(trip_headsign) %>%
#   mutate(headboard_factor = row_number())
# 
# trip_id_headboard_factors_df <- trip_id_headboard_df %>%
#   left_join(headboard_factors_df, by = "trip_headsign") %>%
#   select(trip_id, headboard_factor)
# 
# headboard_factors_value <- headboard_factors_df %>% 
#   select(trip_id, headboard_factor) %>% 
#   group_by(trip_id) %>%
#   nest() %>% 
#   deframe() %>%
#   toJSON(auto_unbox = TRUE, pretty = TRUE)
# 
# trip_id_headboard_factors_map <- trip_id_headboard_factors_df %>%
#   group_by(trip_id) %>%
#   nest() %>% 
#   deframe() %>%
#   toJSON(auto_unbox = TRUE, pretty = TRUE)
# 
# write(headboard_factors_value, './processed/headboard_factors_value.json')
# 
# write(trip_id_headboard_factors_map, './processed/trip_id_headboard_factors.json')
