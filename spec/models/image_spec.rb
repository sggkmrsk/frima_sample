require 'rails_helper'

RSpec.describe Image, type: :model do
  describe '#create' do
    let(:image) {build_stubbed(:image)}
    context 'can save' do
      it "is valid with a image,item_id" do
        expect(image).to be_valid
      end
    end
    context 'can not save' do
      it "is valid without a image" do
        image.image = ""
        expect(image).to be_invalid
      end
      it "is valid without a item_id" do
        image.item_id = ""
        expect(image).to be_invalid
      end
    end
  end
end