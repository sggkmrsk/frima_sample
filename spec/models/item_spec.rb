require 'rails_helper'

RSpec.describe Item, type: :model do
  describe '#create' do
    let(:item) {build(:item)}
    context 'can save' do
      it "is valid with a title" do
        expect(item).to be_valid
      end
    end
    context 'can not save' do
      it "is valid without a title" do
        item.title = ""
        expect(item).to be_invalid
      end
    end
  end
end
