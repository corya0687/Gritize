# create_table "activities", force: :cascade do |t|
#   t.string "event_id"
#   t.integer "grade"
#   t.datetime "started"
#   t.datetime "completed"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.integer "user_id"
#   t.datetime "begin"
#   t.datetime "end"
#   t.integer "status"
# end


class Activity < ApplicationRecord
  belongs_to :user

  enum status: [:unconfirmed, :confirmed, :cancelled]

  LOCKED_FIELDS = ['begin', 'end', 'description']
  include Grader

  validate :not_confirmed
  #validate, can only cancel if not confirmed
  #check if older than 30 mins.

  after_find do |activity|
    activity.status = 1 if activity.created_at > Time.now + 1800
  end

  def not_confirmed
    return unless confirmed? && changed & LOCKED_FIELDS
    errors.add(:status, 'cannot modify confirmed activities')
  end

  def score(activity)
    diff = activity.end - activity.completed
  end

  def self.from_google_calendar(event)
    
  end
end
