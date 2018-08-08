module Grader

  def complete?(activity)
    return 0 if activity.cancelled
    return 0 if activity.started > activity.begin + 2
  end


end
