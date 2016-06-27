class DayHike < ActiveRecord::Base
  DIFFICULTY_OPTIONS = %w(easy moderate strenuous extreme)
  SEASON_OPTIONS = %w(spring summer fall winter)
  LENGTH_OPTIONS = [
    ['short', '1-3 Hours'],
    ['medium', '4-6 Hours'],
    ['long', '6-9 Hours'],
    ['very_long', '10-12 Hours']
  ]

  mount_uploader :kml_file, KmlUploader
end
