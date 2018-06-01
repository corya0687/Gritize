class CreateActivities < ActiveRecord::Migration[5.1]
  def change
    create_table :activities do |t|
      t.string :event_id
      t.integer :grade
      t.datetime :started
      t.datetime :completed

      t.timestamps
    end
  end
end
