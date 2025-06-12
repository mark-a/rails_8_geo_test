class AddAddressToAccount < ActiveRecord::Migration[8.0]
  def self.up
    add_column :accounts, :address, :string, null: false
    add_column :accounts, :address_lng, :decimal, precision: 8, scale: 5, default: nil
    add_column :accounts, :address_lat, :decimal, precision: 8, scale: 5, default: nil
    add_column :accounts, :located, :boolean, default: false, null: false
  end

  def self.down
    remove_column :accounts, :address
    remove_column :accounts, :address_lng
    remove_column :accounts, :address_lat
    remove_column :accounts, :located
  end
end
