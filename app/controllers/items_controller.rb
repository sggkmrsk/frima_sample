class ItemsController < ApplicationController

  def new
    @item = Item.new
    @images = @item.images.build
  end

  def create
    @item = Item.new(item_params)
    @item.save
    redirect_to item_path(@item.id)
  end

  def edit
    @item = Item.find(params[:id])
  end

  def show
    @item = Item.find(params[:id])
  end
  def update
    binding.pry
    @item = Item.find(params[:id])
    @item.update(item_update_params)
  end

  private
  def item_params
    params.require(:item).permit(
      :title,
      [images_attributes: [:image]])
  end

  def item_update_params
    params.require(:item).permit(
      :title,
      [images_attributes: [:image, :_destroy, :id]])
  end
end
