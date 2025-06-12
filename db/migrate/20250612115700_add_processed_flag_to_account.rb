class AddProcessedFlagToAccount < ActiveRecord::Migration[8.0]
  def self.up
    add_column :accounts, :change_processed, :boolean, default: false, null: false
  end

  def self.down
    remove_column :accounts, :change_processed
  end
end
