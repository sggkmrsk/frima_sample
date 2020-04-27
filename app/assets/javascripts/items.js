$(document).on('turbolinks:load', function(){
    //共通の定数を定義
    const prevContent = $('.label-content').prev();
    //プレビューのhtmlを定義
    function buildHTML(count,image) {
      var html = `<div class="preview-box">
                    <div class="image-box">
                      <img src=${image} alt="preview">
                    </div>
                    <div class="delete-btn" data-delete-id= ${count}>
                      <span>削除</span>
                    </div>
                  </div>`
      return html;
    }
    // 投稿編集時
    //items/:i/editページへリンクした際のアクション=======================================
    if (window.location.href.match(/\/items\/\d+\/edit/)){
      //登録済み画像のプレビュー表示欄の要素を取得する
      var count = $('.preview-box').length;
      //プレビューが5あるときは、投稿ボックスを消しておく
      if (count == 5) {
        $('.label-content').hide();
      } else {
        //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
        labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
        $('.label-content').css('width', labelWidth);
      }
    }
    //ラベルのwidth・id・forの値を変更==================================================
    function setLabel(count) {
      //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
      if(count < 5){
        $('.label-box').attr({for: `item_images_attributes_${count}_image`});
      }
    }

    //プレビューの追加=================================================================
    $(document).on('change', '.hidden-field', function() {
      //hidden-fieldのidの数値のみ取得
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      var reader = new FileReader();
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file);
      //読み込み時に発火するイベント
      reader.onload = function() {
        var image = this.result;
        //htmlを作成
        var html = buildHTML(id,image);
        //ラベルの直前のプレビュー群にプレビューを追加
        $(prevContent).append(html);
        var count = $('.preview-box').length;
        //プレビューが5個あったらラベルを隠す 
        if (count == 5) { 
          $('.label-content').hide();
        }
        //プレビュー削除したフィールドにチェックボックスがあった場合、チェックを外す=============
        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        //ラベルのwidth・id・forの値を変更
        setLabel(count);
      }
    });
    // 画像の削除
    $(document).on('click', '.delete-btn', function() {
      var id = $(this).attr('data-delete-id')
      $(this).parent().remove();

      //削除用チェックボックスがある場合はチェックボックスにチェックを入れる
      if ($(`#item_images_attributes_${id}__destroy`).length) {
        $(`#item_images_attributes_${id}__destroy`).prop('checked',true);
      }
      //フォームの中身を削除 
      $(`#item_images_attributes_${id}_image`).val("");
      var count = $('.preview-box').length;
      //5個目の画像が削除されたらラベルを表示
      if (count == 4) {
        $('.label-content').show();
      }
      //ラベルのwidth・id・forの値を変更
      setLabel(count);
    });
  });