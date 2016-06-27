json.array!(@day_hikes) do |day_hike|
  json.extract! day_hike, *DayHike.column_names
end
