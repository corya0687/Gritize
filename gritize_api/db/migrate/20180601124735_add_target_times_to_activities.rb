class AddTargetTimesToActivities < ActiveRecord::Migration[5.1]
  def change
    add_column :activities, :begin, :datetime
    add_column :activities, :end, :datetime
  end
end
