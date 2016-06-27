module DayHikesHelper

  def formatted_length(length)
    case length
    when 'short'
      '1-3 Hours'
    when 'medium'
      '4-6 Hours'
    when 'long'
      '6-9 Hours'
    when 'very_long'
      '10-12 Hours'
    end
  end

end
