class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :isbn
      t.string :publisher
      t.integer :published_year
      t.integer :total_copies
      t.integer :available_copies
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
