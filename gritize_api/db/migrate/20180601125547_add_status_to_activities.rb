class AddStatusToActivities < ActiveRecord::Migration[5.1]
  def change
    add_column :activities, :status, :integer
  end
end
