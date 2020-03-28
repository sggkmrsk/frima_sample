class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      # references
      t.references :item,     null: false, foreign_key: true
      # values
      t.string     :image,    null: false
      t.timestamps
    end
  end
end
