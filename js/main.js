(function(){
  'user strict';

// indexでid をつけたものを、全てここで定義する。
  var price = document.getElementById('price');
  var num = document.getElementById('num');
  var unit = document.getElementById('unit');
  var btn = document.getElementById('btn');
  var result = document.getElementById('result');
  var reset = document.getElementById('reset');

  function checkInput(){
    if(
      price.value.match(/^[1-9][0-9]*$/) !== null &&
      num.value.match(/^[1-9][0-9]*$/) !== null
      // 数字の正規表現に当てはまってるか確認する。
    ){
      btn.classList.remove('disabled');
      // 数字以外の文字が入力された場合、計算の文字が押せないようにする。
    } else{
      btn.classList.add('disabled');
    }
  }

// テキストボックスの中で使う定数をここで定義
  btn.addEventListener('click', function() {
    var payLess;
    var short;
    var payMore;
    var over;
    var str;
    if (this.classList.contains('disabled') === true) {
      return;
    }

// 最初、実際の数字を入れて書くと分かり易い。後で文字に置き換える。
    payLess = Math.floor( price.value / num.value / unit.value) * unit.value; //300
    short = price.value - (payLess * num.value); //100
    payMore = Math.ceil(price.value / num.value / unit.value) * unit.value; // 400
    over = Math.abs(price.value - (payMore * num.value)); // abs で絶対値を表示。-200だから。
    if (over === 0 && short === 0){
      str = '一人' + (price.value / num.value) + '円ちょうどです！';
    } else {
      str =
      '一人' + payLess + '円だと' + short + '円足りません。' +
      '一人' + payMore + '円だと' + over + '円余ります。';
    }
    result.textContent = str;
    reset.classList.remove('hidden');
    // 1回計算をした後は表示するため。
  });

  price.addEventListener('keyup', checkInput);
  num.addEventListener('keyup', checkInput);
  // 2つが空でないことを確認する。

  reset.addEventListener('click', function(){
    result.textContent = 'ここに結果を表示します';
    price.value = '';
    num.value = '';
    unit.value = 100; //defaultの値

  });
})();
