import s from './demo.scss';
import DemoComponent from './demo-component';

new DemoComponent({
  typeName: 'Age',
  unit: 'year',
  maxValue: 2018,
  minValue: 1938,
  currentValue: 1996
});

new DemoComponent({
  typeName: 'Height',
  unit: 'cm',
  maxValue: 230,
  minValue: 100,
  currentValue: 180
});

new DemoComponent({
  typeName: 'Weight',
  unit: 'kg',
  maxValue: 200,
  minValue: 30,
  currentValue: 73.1,
  precision: 0.1
});

!function(x) {
  let t = x.document;
  function phoneTest() {
    const tipsBox = document.createElement('div');
    console.log(x.hasOwnProperty('ontouchstart'));
    if (!x.hasOwnProperty('ontouchstart')) {
      tipsBox.className = s.tipsBox;
      tipsBox.innerHTML = `<div class='${s.content}'>
                            <p class='${s.tipsWorld}'>请将Chrome切换成手机模式或扫码查看</p>
                            <img class='${s.qrcode}' src='https://qr.api.cli.im/qr?data=https%253A%252F%252Fsimbawus.github.io%252Fslide-ruler&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=92204c1a3fe5e2ad56f1c24b6db4952c' alt=''>
                            <div class="${s.githubButtons}">
                              <iframe src="https://ghbtns.com/github-btn.html?user=simbawus&type=follow&count=true&size=large" frameborder="0" scrolling="0" width="190px" height="30px"></iframe>
                              <iframe src="https://ghbtns.com/github-btn.html?user=simbawus&repo=slide-ruler&type=star&count=true&size=large" frameborder="0" scrolling="0" width="130px" height="30px"></iframe>
                            </div>
                          </div>`;
      document.body.appendChild(tipsBox);
    } else {

    }
  };
  x.addEventListener('resize', function() {
    clearTimeout(t);
    t = setTimeout(() => {
      window.location.href = window.location.href;
      phoneTest();
    }, 50);
  }, !1);
  phoneTest();
}(window);
