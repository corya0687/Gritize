class AddCalendarIdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :calendar_id, :string
  end
end
