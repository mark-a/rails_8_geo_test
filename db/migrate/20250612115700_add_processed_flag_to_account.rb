class AddProcessedFlagToAccount < ActiveRecord::Migration[8.0]
  def self.up
     add_column :accounts, :change_processed, :boolean, default: false, null: false
     add_column :accounts, :address_details, :json, default: nil
  end

  def self.down
    remove_column :accounts, :change_processed
    remove_column :accounts, :address_details
  end
end
