class AddDefaultValuesToActivityStatus < ActiveRecord::Migration[5.1]
  def change
    change_column :activities, :status, :integer, default: 0
  end
end
